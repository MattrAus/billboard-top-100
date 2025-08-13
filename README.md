# Billboard Top 100

A Node.js library for fetching Billboard chart data. This library provides easy access to current and historical Billboard charts including Hot 100, Artist 100, Latin Songs, and many more.

## 🚀 Features

- **Current Charts**: Get the latest week's chart data
- **Historical Charts**: Access charts from any specific date
- **Multiple Chart Types**: Support for 288+ different Billboard charts
- **Robust Error Handling**: Graceful handling of edge cases and network issues
- **Production Ready**: Comprehensive test coverage and error handling
- **Modern Architecture**: Built with Node.js 18+ native fetch and ES modules

## 📋 Supported Charts

The library supports all major Billboard charts including:

- **Hot 100** - Top 100 songs
- **Artist 100** - Top 100 artists
- **Latin Songs** - Top 50 Latin songs
- **R&B/Hip-Hop Songs** - Top 50 R&B and hip-hop songs
- **Country Songs** - Top 60 country songs
- **Rock Songs** - Top 50 rock songs
- **Pop Songs** - Top 40 pop songs
- **Dance/Electronic Songs** - Top 50 dance and electronic songs
- And 280+ more charts!

## 🛠️ Installation

```bash
npm install @aribradshaw/billboard-top-100
```

**Requirements**: Node.js 18.0.0 or higher

## 📖 Usage

### Basic Usage

```javascript
import { getChart, listCharts } from '@aribradshaw/billboard-top-100';

// Get current Hot 100 chart
getChart('hot-100', (err, chart) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  
  console.log(`Week of: ${chart.week}`);
  console.log(`#1 Song: ${chart.songs[0].title} by ${chart.songs[0].artist}`);
  console.log(`Total Songs: ${chart.songs.length}`);
});
```

### Historical Charts

```javascript
// Get Hot 100 chart from a specific date
getChart('hot-100', '2023-12-30', (err, chart) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  
  console.log(`Week of: ${chart.week}`);
  console.log(`#1 Song: ${chart.songs[0].title} by ${chart.songs[0].artist}`);
});
```

### Different Chart Types

```javascript
// Get Latin Songs chart
getChart('latin-songs', (err, chart) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  
  console.log(`Latin Songs Chart - Week of: ${chart.week}`);
  chart.songs.forEach(song => {
    console.log(`${song.rank}. ${song.title} - ${song.artist}`);
  });
});

// Get Artist 100 chart
getChart('artist-100', (err, chart) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  
  console.log(`Artist 100 Chart - Week of: ${chart.week}`);
  chart.songs.forEach(artist => {
    console.log(`${artist.rank}. ${artist.artist}`);
  });
});
```

### Discover Available Charts

```javascript
// Get list of all available charts
listCharts((err, charts) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  
  console.log(`Found ${charts.length} charts:`);
  charts.forEach(chart => {
    console.log(`- ${chart.name}: ${chart.url}`);
  });
});
```

## 📊 Chart Data Structure

Each chart returns an object with the following structure:

```javascript
{
  week: '2025-08-16',
  previousWeek: {
    date: '2025-08-09',
    url: 'http://www.billboard.com/charts/hot-100/2025-08-09'
  },
  nextWeek: {
    date: '2025-08-23',
    url: 'http://www.billboard.com/charts/hot-100/2025-08-23'
  },
  songs: [
    {
      rank: 1,
      title: 'Golden',
      artist: 'HUNTR/X: EJAE, Audrey Nuna & REI AMI',
      cover: 'https://charts-static.billboard.com/img/...',
      position: {
        positionLastWeek: 1,
        peakPosition: 1,
        weeksOnChart: 8
      }
    }
    // ... more songs
  ]
}
```

## 🧪 Testing

The library includes comprehensive test coverage:

```bash
npm test
```

**Test Coverage Includes:**
- ✅ Core chart functionality (Hot 100, Latin Songs, Artist 100)
- ✅ Historical chart retrieval
- ✅ Error handling and edge cases
- ✅ Data structure validation
- ✅ Chart discovery functionality
- ✅ Performance and concurrent request handling
- ✅ Memory management validation

## 🔧 Development

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn

### Setup

```bash
git clone <repository-url>
cd billboard-top-100-1
npm install
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- test/test.js
```

## 🚨 Error Handling

The library handles various error scenarios gracefully:

- **Invalid chart names**: Returns descriptive error messages
- **Invalid dates**: Graceful fallback to current date or clear error
- **Network issues**: Proper HTTP error handling
- **Missing callbacks**: No crashes, graceful degradation
- **HTML structure changes**: Robust parsing with fallback mechanisms

## 📈 Performance

- **Efficient Parsing**: Uses Cheerio for fast HTML parsing
- **Memory Management**: No memory leaks during multiple requests
- **Concurrent Support**: Handles multiple simultaneous chart requests
- **Timeout Protection**: Configurable timeouts for network requests

## 🔄 Recent Updates

### Version 3.0.5 - Latest Release

- ✅ **HTML Structure Fix**: Updated selectors to work with Billboard's new HTML layout (August 2025)
- ✅ **Improved Chart Parsing**: Better title and artist extraction with cleaner text parsing
- ✅ **Production Ready**: Comprehensive test suite with edge case coverage
- ✅ **Enhanced Error Handling**: Robust error handling for all failure scenarios
- ✅ **Performance Optimizations**: Memory management and concurrent request handling

### Version 3.0.4

- ✅ **Complete dependency cleanup**: All deprecated packages removed
- ✅ **Native fetch implementation**: Uses Node.js 18+ native fetch for better performance
- ✅ **Regenerated package-lock.json**: Synced with updated dependencies
- ✅ **Clean npm installs**: No more deprecated warnings when installing

## 🤝 Contributing

Contributions are welcome! Please ensure:

1. All tests pass (`npm test`)
2. Code follows the existing style
3. New features include appropriate tests
4. Error handling is robust

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original library by [darthbatman](https://github.com/darthbatman)
- Updated and maintained for modern Node.js compatibility
- Enhanced with comprehensive testing and error handling

## 📞 Support

If you encounter any issues or have questions:

1. Check the [test suite](test/test.js) for usage examples
2. Review the [changelog](CHANGELOG.md) for recent updates
3. Open an issue with detailed error information

---

**Note**: This library is designed to be robust and production-ready, with comprehensive error handling and test coverage. It gracefully handles HTML structure changes from Billboard and provides reliable chart data access.
