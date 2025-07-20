import { getChart, listCharts } from './billboard-top-100/billboard-top-100.js';

console.log('Testing Billboard Top 100 Library as Dependency');
console.log('==============================================');

// Test 1: Get current Hot 100
getChart('hot-100', (err, chart) => {
  if (err) {
    console.error('❌ Error:', err);
    return;
  }
  
  console.log('✅ Successfully fetched current Hot 100 chart');
  console.log(`   Week: ${chart.week}`);
  console.log(`   Number 1: ${chart.songs[0].title} by ${chart.songs[0].artist}`);
  console.log(`   Total songs: ${chart.songs.length}`);
});

// Test 2: List available charts
listCharts((err, charts) => {
  if (err) {
    console.error('❌ Error:', err);
    return;
  }
  
  console.log('✅ Successfully listed available charts');
  console.log(`   Found ${charts.length} charts`);
  console.log(`   First chart: ${charts[0].name}`);
});

console.log('\nLibrary is ready to be used as a dependency! 🎉'); 