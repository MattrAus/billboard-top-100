import { getChart, listCharts } from './billboard-top-100.js';

// Example 1: Get current Hot 100 chart
console.log('=== Current Hot 100 Chart ===');
getChart('hot-100', (err, chart) => {
  if (err) {
    console.error('Error fetching current chart:', err);
    return;
  }
  
  console.log(`Week of: ${chart.week}`);
  console.log(`Number 1 song: ${chart.songs[0].title} by ${chart.songs[0].artist}`);
  console.log(`Previous week: ${chart.previousWeek.date}`);
  console.log(`Next week: ${chart.nextWeek.date}`);
  console.log(`Total songs: ${chart.songs.length}`);
});

// Example 2: Get a specific week's chart
console.log('\n=== Specific Week Chart ===');
getChart('hot-100', '2023-12-30', (err, chart) => {
  if (err) {
    console.error('Error fetching specific week chart:', err);
    return;
  }
  
  console.log(`Chart for week of: ${chart.week}`);
  console.log('Top 5 songs:');
  chart.songs.slice(0, 5).forEach((song, index) => {
    console.log(`${index + 1}. ${song.title} by ${song.artist} (Rank: ${song.rank})`);
  });
});

// Example 3: List all available charts
console.log('\n=== Available Charts ===');
listCharts((err, charts) => {
  if (err) {
    console.error('Error listing charts:', err);
    return;
  }
  
  console.log(`Found ${charts.length} available charts:`);
  charts.slice(0, 10).forEach((chart, index) => {
    console.log(`${index + 1}. ${chart.name}`);
  });
  
  if (charts.length > 10) {
    console.log(`... and ${charts.length - 10} more charts`);
  }
});

// Example 4: Get Latin Songs chart
console.log('\n=== Latin Songs Chart ===');
getChart('latin-songs', (err, chart) => {
  if (err) {
    console.error('Error fetching Latin songs chart:', err);
    return;
  }
  
  console.log(`Latin Songs chart for week of: ${chart.week}`);
  console.log(`Number 1 song: ${chart.songs[0].title} by ${chart.songs[0].artist}`);
  console.log(`Total songs: ${chart.songs.length}`);
}); 