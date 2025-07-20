import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import moment from 'moment';

const BILLBOARD_BASE_URL = 'http://www.billboard.com';
const BILLBOARD_CHARTS_URL = `${BILLBOARD_BASE_URL}/charts/`;
const BILLBOARD_CHART_CATEGORY_URL_PREFIX = `${BILLBOARD_BASE_URL}/pmc-ajax/charts-fetch-all-chart/selected_category-`;
const BILLBOARD_CHART_CATEGORY_URL_SUFFIX = '/chart_type-weekly/';

async function fetchHTML(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    throw new Error(`Failed to fetch ${url}: ${error.message}`);
  }
}

function getChart(name, date, cb) {
  let chartName = name;
  let chartDate = date;
  let callback = cb;

  if (typeof name === 'function') {
    // if name not specified, default to hot-100 chart for current week,
    // and set callback method accordingly
    callback = name;
    chartName = 'hot-100';
    chartDate = '';
  }

  if (typeof date === 'function') {
    // if date not specified, default to specified chart for current week,
    // and set callback method accordingly
    callback = date;
    chartDate = '';
  }

  const chart = {};
  chart.songs = [];

  const requestURL = `${BILLBOARD_CHARTS_URL}${chartName}/${chartDate}`;

  fetchHTML(requestURL)
    .then((html) => {
      const $ = cheerio.load(html);

      let d = null;
      for (let i = 0; i < $('.c-heading').length; i += 1) {
        if ($('.c-heading')[i].children[0].data.includes('Week of ')) {
          d = moment(new Date($('.c-heading')[i].children[0].data.trim().slice('Week of '.length)));
          break;
        }
      }

      chart.week = d.format('YYYY-MM-DD');

      const prevWeek = d.subtract(7, 'days').format('YYYY-MM-DD');
      chart.previousWeek = {
        date: prevWeek,
        url: `${BILLBOARD_CHARTS_URL}${chartName}/${prevWeek}`,
      };

      const nextWeek = d.add(14, 'days').format('YYYY-MM-DD');
      chart.nextWeek = {
        date: nextWeek,
        url: `${BILLBOARD_CHARTS_URL}${chartName}/${nextWeek}`,
      };

      const chartItems = $('.o-chart-results-list-row-container');
      for (let i = 0; i < chartItems.length; i += 1) {
        const infoContainer = chartItems[i].children[1];
        const titleAndArtistContainer = infoContainer.children[7].children[1].children[1];
        const posInfo = infoContainer.children[7].children[1];

        const rank = parseInt(infoContainer.children[1].children[1].children[0].data.trim(), 10);
        const title = titleAndArtistContainer.children[1].children[0].data.trim();
        const artist = titleAndArtistContainer.children[3]
          ? titleAndArtistContainer.children[3].children[0].data.trim() : undefined;
        const cover = infoContainer.children[3].children[1].children[1].children[1].attribs['data-lazy-src'];
        const position = {
          positionLastWeek: parseInt(posInfo.children[7].children[1].children[0].data.trim(), 10),
          peakPosition: parseInt(posInfo.children[9].children[1].children[0].data.trim(), 10),
          weeksOnChart: parseInt(posInfo.children[11].children[1].children[0].data.trim(), 10),
        };

        if (artist) {
          chart.songs.push({
            rank,
            title,
            artist,
            cover,
            position,
          });
        } else {
          chart.songs.push({
            rank,
            artist: title,
            cover,
            position,
          });
        }
      }

      if (chart.songs.length > 1) {
        callback(null, chart);
      } else {
        callback('Songs not found.', null);
      }
    })
    .catch((error) => {
      callback(error, null);
    });
}

const getChartsFromCategories = async (categoryURLs, cb) => {
  const charts = [];

  const promises = categoryURLs.map(async (categoryURL) => {
    try {
      const html = await fetchHTML(categoryURL);
      const $ = cheerio.load(JSON.parse(html).html);

      const chartLinks = $('a.lrv-u-flex.lrv-u-flex-direction-column');
      for (let i = 0; i < chartLinks.length; i += 1) {
        if (chartLinks[i].attribs.href.startsWith('/charts/')) {
          charts.push({
            name: chartLinks[i].children[1].children[1].children[0].data.trim(),
            url: `${BILLBOARD_BASE_URL}${chartLinks[i].attribs.href}`,
          });
        }
      }
    } catch (error) {
      // Silently handle errors for individual category requests
      // console.warn(`Failed to fetch category ${categoryURL}: ${error.message}`);
    }
  });

  await Promise.all(promises);
  cb(charts);
};

function listCharts(cb) {
  if (typeof cb !== 'function') {
    cb('Specified callback is not a function.', null);
    return;
  }

  fetchHTML(BILLBOARD_CHARTS_URL)
    .then((html) => {
      const $ = cheerio.load(html);

      const categoryElements = $('.o-nav__list-item.lrv-u-color-grey-medium-dark');
      const categoryURLs = [];
      for (let i = 0; i < categoryElements.length; i += 1) {
        if (categoryElements[i].children && categoryElements[i].children[1].attribs.href === '#') {
          const categoryName = encodeURIComponent(categoryElements[i].children[1].attribs.rel);
          categoryURLs.push(`${BILLBOARD_CHART_CATEGORY_URL_PREFIX}${categoryName}${BILLBOARD_CHART_CATEGORY_URL_SUFFIX}`);
        }
      }

      getChartsFromCategories(categoryURLs, (charts) => {
        if (charts.length > 0) {
          cb(null, charts);
        } else {
          cb('No charts found.', null);
        }
      });
    })
    .catch((error) => {
      cb(error, null);
    });
}

export {
  getChart,
  listCharts,
};
