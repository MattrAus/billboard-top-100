import { getChart, listCharts } from '../billboard-top-100.js';

console.log('🧪 Running Comprehensive Library Tests');
console.log('=====================================\n');

// Test 1: Basic getChart functionality
console.log('1. Testing getChart with current Hot 100...');
getChart('hot-100', (err, chart) => {
  if (err) {
    console.error('❌ Error:', err);
    return;
  }
  console.log('✅ Hot 100 test passed');
  console.log(`   - Week: ${chart.week}`);
  console.log(`   - Songs count: ${chart.songs.length}`);
  console.log(`   - #1 song: ${chart.songs[0].title} by ${chart.songs[0].artist}`);
});

// Test 2: Historical chart test
console.log('\n2. Testing getChart with historical data...');
getChart('hot-100', '2023-12-30', (err, chart) => {
  if (err) {
    console.error('❌ Error:', err);
    return;
  }
  console.log('✅ Historical chart test passed');
  console.log(`   - Week: ${chart.week}`);
  console.log(`   - Songs count: ${chart.songs.length}`);
  console.log(`   - #1 song: ${chart.songs[0].title} by ${chart.songs[0].artist}`);
});

// Test 3: Different chart type
console.log('\n3. Testing getChart with Latin Songs...');
getChart('latin-songs', (err, chart) => {
  if (err) {
    console.error('❌ Error:', err);
    return;
  }
  console.log('✅ Latin Songs test passed');
  console.log(`   - Week: ${chart.week}`);
  console.log(`   - Songs count: ${chart.songs.length}`);
  console.log(`   - #1 song: ${chart.songs[0].title} by ${chart.songs[0].artist}`);
});

// Test 4: Artist chart
console.log('\n4. Testing getChart with Artist 100...');
getChart('artist-100', (err, chart) => {
  if (err) {
    console.error('❌ Error:', err);
    return;
  }
  console.log('✅ Artist 100 test passed');
  console.log(`   - Week: ${chart.week}`);
  console.log(`   - Artists count: ${chart.songs.length}`);
  console.log(`   - #1 artist: ${chart.songs[0].artist}`);
});

// Test 5: List all charts
console.log('\n5. Testing listCharts...');
listCharts((err, charts) => {
  if (err) {
    console.error('❌ Error:', err);
    return;
  }
  console.log('✅ List charts test passed');
  console.log(`   - Total charts: ${charts.length}`);
  console.log(`   - Sample charts: ${charts.slice(0, 3).map(c => c.name).join(', ')}`);
});

// Test 6: Error handling
console.log('\n6. Testing error handling...');
getChart('non-existent-chart', (err, chart) => {
  if (err) {
    console.log('✅ Error handling test passed - correctly caught error');
    console.log(`   - Error message: ${err}`);
  } else {
    console.log('❌ Error handling test failed - should have caught error');
  }
});

// Test 7: Data structure validation
console.log('\n7. Testing data structure...');
getChart('hot-100', (err, chart) => {
  if (err) {
    console.error('❌ Error:', err);
    return;
  }
  
  // Validate chart structure
  const hasWeek = typeof chart.week === 'string';
  const hasPreviousWeek = chart.previousWeek && typeof chart.previousWeek.date === 'string';
  const hasNextWeek = chart.nextWeek && typeof chart.nextWeek.date === 'string';
  const hasSongs = Array.isArray(chart.songs) && chart.songs.length > 0;
  
  if (hasWeek && hasPreviousWeek && hasNextWeek && hasSongs) {
    console.log('✅ Data structure validation passed');
    console.log('   - All required fields present');
    console.log('   - Songs array is valid');
  } else {
    console.log('❌ Data structure validation failed');
  }
});

// Test 8: Song data validation
console.log('\n8. Testing song data structure...');
getChart('hot-100', (err, chart) => {
  if (err) {
    console.error('❌ Error:', err);
    return;
  }
  
  const firstSong = chart.songs[0];
  const hasRank = typeof firstSong.rank === 'number';
  const hasTitle = typeof firstSong.title === 'string';
  const hasArtist = typeof firstSong.artist === 'string';
  const hasCover = typeof firstSong.cover === 'string';
  const hasPosition = firstSong.position && typeof firstSong.position.peakPosition === 'number';
  
  if (hasRank && hasTitle && hasArtist && hasCover && hasPosition) {
    console.log('✅ Song data structure validation passed');
    console.log('   - All song fields present and correct types');
  } else {
    console.log('❌ Song data structure validation failed');
  }
});

// Test 9: Random charts from different decades
console.log('\n9. Testing random charts from different decades...');

// 1970s - Disco era
console.log('\n   1970s Test (1979-07-07)...');
getChart('hot-100', '1979-07-07', (err, chart) => {
  if (err) {
    console.error('❌ 1970s test failed:', err);
    return;
  }
  console.log('✅ 1970s test passed');
  console.log(`   - Week: ${chart.week}`);
  console.log(`   - Songs count: ${chart.songs.length}`);
  console.log(`   - #1 song: ${chart.songs[0].title} by ${chart.songs[0].artist}`);
});

// 1980s - MTV era
console.log('\n   1980s Test (1985-06-15)...');
getChart('hot-100', '1985-06-15', (err, chart) => {
  if (err) {
    console.error('❌ 1980s test failed:', err);
    return;
  }
  console.log('✅ 1980s test passed');
  console.log(`   - Week: ${chart.week}`);
  console.log(`   - Songs count: ${chart.songs.length}`);
  console.log(`   - #1 song: ${chart.songs[0].title} by ${chart.songs[0].artist}`);
});

// 1990s - Grunge/Alternative era
console.log('\n   1990s Test (1994-09-10)...');
getChart('hot-100', '1994-09-10', (err, chart) => {
  if (err) {
    console.error('❌ 1990s test failed:', err);
    return;
  }
  console.log('✅ 1990s test passed');
  console.log(`   - Week: ${chart.week}`);
  console.log(`   - Songs count: ${chart.songs.length}`);
  console.log(`   - #1 song: ${chart.songs[0].title} by ${chart.songs[0].artist}`);
});

// 2000s - Pop/Rock era
console.log('\n   2000s Test (2003-03-15)...');
getChart('hot-100', '2003-03-15', (err, chart) => {
  if (err) {
    console.error('❌ 2000s test failed:', err);
    return;
  }
  console.log('✅ 2000s test passed');
  console.log(`   - Week: ${chart.week}`);
  console.log(`   - Songs count: ${chart.songs.length}`);
  console.log(`   - #1 song: ${chart.songs[0].title} by ${chart.songs[0].artist}`);
});

// 2010s - Digital era
console.log('\n   2010s Test (2015-08-22)...');
getChart('hot-100', '2015-08-22', (err, chart) => {
  if (err) {
    console.error('❌ 2010s test failed:', err);
    return;
  }
  console.log('✅ 2010s test passed');
  console.log(`   - Week: ${chart.week}`);
  console.log(`   - Songs count: ${chart.songs.length}`);
  console.log(`   - #1 song: ${chart.songs[0].title} by ${chart.songs[0].artist}`);
});

// Test 10: Different chart types from different eras
console.log('\n10. Testing different chart types from different eras...');

// 1980s Rock chart
console.log('\n   1980s Rock Chart (1987-05-16)...');
getChart('rock-songs', '1987-05-16', (err, chart) => {
  if (err) {
    console.error('❌ 1980s Rock test failed:', err);
    return;
  }
  console.log('✅ 1980s Rock test passed');
  console.log(`   - Week: ${chart.week}`);
  console.log(`   - Songs count: ${chart.songs.length}`);
  console.log(`   - #1 song: ${chart.songs[0].title} by ${chart.songs[0].artist}`);
});

// 1990s R&B chart
console.log('\n   1990s R&B Chart (1996-11-30)...');
getChart('r-and-b-songs', '1996-11-30', (err, chart) => {
  if (err) {
    console.error('❌ 1990s R&B test failed:', err);
    return;
  }
  console.log('✅ 1990s R&B test passed');
  console.log(`   - Week: ${chart.week}`);
  console.log(`   - Songs count: ${chart.songs.length}`);
  console.log(`   - #1 song: ${chart.songs[0].title} by ${chart.songs[0].artist}`);
});

// 2000s Country chart
console.log('\n   2000s Country Chart (2008-04-19)...');
getChart('country-songs', '2008-04-19', (err, chart) => {
  if (err) {
    console.error('❌ 2000s Country test failed:', err);
    return;
  }
  console.log('✅ 2000s Country test passed');
  console.log(`   - Week: ${chart.week}`);
  console.log(`   - Songs count: ${chart.songs.length}`);
  console.log(`   - #1 song: ${chart.songs[0].title} by ${chart.songs[0].artist}`);
});

// 2010s Pop chart
console.log('\n   2010s Pop Chart (2017-06-24)...');
getChart('pop-songs', '2017-06-24', (err, chart) => {
  if (err) {
    console.error('❌ 2010s Pop test failed:', err);
    return;
  }
  console.log('✅ 2010s Pop test passed');
  console.log(`   - Week: ${chart.week}`);
  console.log(`   - Songs count: ${chart.songs.length}`);
  console.log(`   - #1 song: ${chart.songs[0].title} by ${chart.songs[0].artist}`);
});

// 2020s Dance chart
console.log('\n   2020s Dance Chart (2022-09-17)...');
getChart('dance-electronic-songs', '2022-09-17', (err, chart) => {
  if (err) {
    console.error('❌ 2020s Dance test failed:', err);
    return;
  }
  console.log('✅ 2020s Dance test passed');
  console.log(`   - Week: ${chart.week}`);
  console.log(`   - Songs count: ${chart.songs.length}`);
  console.log(`   - #1 song: ${chart.songs[0].title} by ${chart.songs[0].artist}`);
});

console.log('\n🎯 All comprehensive tests completed! Check results above.'); 