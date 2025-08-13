// Using native fetch (available in Node.js 18+)
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
      // Look for week heading - try multiple approaches
      const weekHeading = $('.c-heading, h1, h2').filter((i, el) => {
        const text = $(el).text().trim();
        return text.includes('Week of ');
      });

      if (weekHeading.length > 0) {
        const weekText = weekHeading.first().text().trim();
        const weekMatch = weekText.match(/Week of (.+)/);
        if (weekMatch) {
          d = moment(new Date(weekMatch[1]));
        }
      }

      // If no week heading found, use current date
      if (!d) {
        d = moment();
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
        const container = $(chartItems[i]);
        
        // Find rank - first li with c-label class
        const rankElement = container.find('li:first-child .c-label');
        if (rankElement.length === 0) {
          // eslint-disable-next-line no-continue
          continue;
        }
        const rank = parseInt(rankElement.text().trim(), 10);
        if (Number.isNaN(rank)) {
          // eslint-disable-next-line no-continue
          continue;
        }
        
        // Find title - h3 with c-title class, get only the direct text content
        const titleElement = container.find('h3.c-title');
        if (titleElement.length === 0) {
          // eslint-disable-next-line no-continue
          continue;
        }
        // Get only the direct text content, not from nested elements
        let title = '';
        const titleNode = titleElement[0];
        if (titleNode.children && titleNode.children.length > 0) {
          // Look for direct text nodes
          for (let k = 0; k < titleNode.children.length; k += 1) {
            const child = titleNode.children[k];
            if (child.type === 'text') {
              title += child.data;
            }
          }
        } else {
          title = titleElement.text().trim();
        }
        title = title.trim();
        
        // Find artist - look for the artist span that contains the actual artist name
        let artist = undefined;
        const allLabels = container.find('span.c-label');
        for (let j = 0; j < allLabels.length; j += 1) {
          const label = $(allLabels[j]);
          const text = label.text().trim();
          // Skip if it's the rank or empty
          if (text === rank.toString() || text.length === 0) {
            continue;
          }
          // Skip if it contains common chart-related text
          if (text.includes('LW') || text.includes('PEAK') || text.includes('WEEKS') || 
              text.includes('Debut') || text.includes('Peak') || text.includes('Share') || 
              text.includes('Credits') || text.includes('Songwriter') || text.includes('Producer') || 
              text.includes('Imprint') || text.includes('Label')) {
            continue;
          }
          // This should be the artist
          artist = text;
          break;
        }
        
        // Find cover image
        const coverElement = container.find('img[data-lazy-src]');
        const cover = coverElement.length > 0 ? coverElement.attr('data-lazy-src') : undefined;
        
        // Find position data
        let positionLastWeek = 0;
        let peakPosition = 0;
        let weeksOnChart = 0;
        
        // Look for LW (Last Week)
        const lwElement = container.find('span:contains("LW")').next().find('.c-label');
        if (lwElement.length > 0) {
          positionLastWeek = parseInt(lwElement.text().trim(), 10) || 0;
        }
        
        // Look for PEAK
        const peakElement = container.find('span:contains("PEAK")').next().find('.c-label');
        if (peakElement.length > 0) {
          peakPosition = parseInt(peakElement.text().trim(), 10) || 0;
        }
        
        // Look for WEEKS
        const weeksElement = container.find('span:contains("WEEKS")').next().find('.c-label');
        if (weeksElement.length > 0) {
          weeksOnChart = parseInt(weeksElement.text().trim(), 10) || 0;
        }
        
        const position = {
          positionLastWeek,
          peakPosition,
          weeksOnChart,
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

      // Look for chart links with more flexible selectors
      const chartLinks = $('a[href^="/charts/"]');
      for (let i = 0; i < chartLinks.length; i += 1) {
        const link = $(chartLinks[i]);
        const href = link.attr('href');
        if (href && href.startsWith('/charts/')) {
          // Try to find the chart name from various possible locations
          let name = '';
          const nameElement = link.find('.c-title, h3, h4, .c-label').first();
          if (nameElement.length > 0) {
            name = nameElement.text().trim();
          } else {
            // Fallback: extract name from URL
            name = href.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          }
          
          // Clean up the name - remove common prefixes and suffixes
          name = name.replace(/^Billboard\s+/i, '').replace(/\s*™$/, '').replace(/^Charts?$/i, '');
          
          if (name && name.length > 0) {
            charts.push({
              name,
              url: `${BILLBOARD_BASE_URL}${href}`,
            });
          }
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
    return;
  }

  fetchHTML(BILLBOARD_CHARTS_URL)
    .then((html) => {
      const $ = cheerio.load(html);

      // Try multiple approaches to find chart categories
      let categoryURLs = [];
      
      // Approach 1: Look for the old category structure
      const categoryElements = $('.o-nav__list-item.lrv-u-color-grey-medium-dark');
      for (let i = 0; i < categoryElements.length; i += 1) {
        const element = $(categoryElements[i]);
        const href = element.find('a[href="#"]').attr('href');
        const rel = element.find('a[href="#"]').attr('rel');
        if (href === '#' && rel) {
          const categoryName = encodeURIComponent(rel);
          categoryURLs.push(`${BILLBOARD_CHART_CATEGORY_URL_PREFIX}${categoryName}${BILLBOARD_CHART_CATEGORY_URL_SUFFIX}`);
        }
      }
      
      // Approach 2: If no categories found, try to find charts directly on the page
      if (categoryURLs.length === 0) {
        const chartLinks = $('a[href^="/charts/"]');
        if (chartLinks.length > 0) {
          // Found direct chart links, create a simple response
          const charts = [];
          chartLinks.each((i, link) => {
            const $link = $(link);
            const href = $link.attr('href');
            if (href && href.startsWith('/charts/')) {
              let name = $link.text().trim() || href.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            // Clean up the name - remove common prefixes and suffixes
            name = name.replace(/^Billboard\s+/i, '').replace(/\s*™$/, '').replace(/^Charts?$/i, '');
              if (name && name.length > 0) {
                charts.push({
                  name,
                  url: `${BILLBOARD_BASE_URL}${href}`,
                });
              }
            }
          });
          
          if (charts.length > 0) {
            cb(null, charts);
            return;
          }
        }
      }

      // Use the category approach if we have URLs
      if (categoryURLs.length > 0) {
        getChartsFromCategories(categoryURLs, (charts) => {
          if (charts.length > 0) {
            cb(null, charts);
          } else {
            cb('No charts found.', null);
          }
        });
      } else {
        cb('No chart categories found.', null);
      }
    })
    .catch((error) => {
      cb(error, null);
    });
}

export {
  getChart,
  listCharts,
};
