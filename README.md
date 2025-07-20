# Billboard Top 100

A modern Node.js library for fetching Billboard chart data. This is a fork of the original [billboard-top-100](https://github.com/darthbatman/billboard-top-100) library, updated to use modern dependencies and ES modules.

## Features

- ✅ **Modern Dependencies**: Uses `node-fetch` instead of deprecated `request` package
- ✅ **ES Modules**: Full ES module support with `import`/`export`
- ✅ **Security Updates**: Updated all dependencies to latest secure versions
- ✅ **No Deprecation Warnings**: All deprecated packages have been replaced
- ✅ **TypeScript Ready**: Can be easily used in TypeScript projects

## Installation

```bash
npm install billboard-top-100
```

## Usage

### ES Modules (Recommended)

```javascript
import { getChart, listCharts } from 'billboard-top-100';

// Get current Hot 100 chart
getChart('hot-100', (err, chart) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  
  console.log('Week of:', chart.week);
  console.log('Number 1 song:', chart.songs[0]);
});

// Get a specific week's chart
getChart('hot-100', '2023-12-30', (err, chart) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  
  console.log('Chart for week of:', chart.week);
  console.log('Previous week:', chart.previousWeek);
  console.log('Next week:', chart.nextWeek);
});

// List all available charts
listCharts((err, charts) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  
  console.log('Available charts:', charts);
});
```

### CommonJS (Legacy)

```javascript
const { getChart, listCharts } = require('billboard-top-100');

// Same usage as above
```

## API Reference

### `getChart(chartName, date, callback)`

Fetches a specific Billboard chart.

**Parameters:**
- `chartName` (string): The name of the chart (e.g., 'hot-100', 'latin-songs', 'artist-100')
- `date` (string, optional): The date in YYYY-MM-DD format. If omitted, gets the current week's chart
- `callback` (function): Callback function with signature `(error, chart)`

**Returns:**
- `chart` object with the following structure:
  ```javascript
  {
    week: '2023-12-30',
    previousWeek: {
      date: '2023-12-23',
      url: 'http://www.billboard.com/charts/hot-100/2023-12-23'
    },
    nextWeek: {
      date: '2024-01-06',
      url: 'http://www.billboard.com/charts/hot-100/2024-01-06'
    },
    songs: [
      {
        rank: 1,
        title: 'Song Title',
        artist: 'Artist Name',
        cover: 'https://charts-static.billboard.com/img/...',
        position: {
          positionLastWeek: 1,
          peakPosition: 1,
          weeksOnChart: 14
        }
      }
      // ... more songs
    ]
  }
  ```

### `listCharts(callback)`

Lists all available Billboard charts.

**Parameters:**
- `callback` (function): Callback function with signature `(error, charts)`

**Returns:**
- `charts` array with objects containing:
  ```javascript
  [
    {
      name: 'Hot 100',
      url: 'http://www.billboard.com/charts/hot-100'
    }
    // ... more charts
  ]
  ```

## Available Charts

- `hot-100` - Billboard Hot 100
- `latin-songs` - Hot Latin Songs
- `artist-100` - Artist 100
- And many more! Use `listCharts()` to see all available charts.

## Error Handling

The library uses callback-style error handling:

```javascript
getChart('hot-100', (err, chart) => {
  if (err) {
    console.error('Error fetching chart:', err);
    return;
  }
  
  // Use chart data
  console.log(chart);
});
```

## Development

### Prerequisites

- Node.js 18.0.0 or higher
- npm

### Setup

```bash
git clone https://github.com/aribradshaw/billboard-top-100.git
cd billboard-top-100
npm install
```

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

## Changes from Original

This fork includes the following improvements over the original library:

1. **Modern Dependencies**:
   - Replaced deprecated `request` package with `node-fetch`
   - Updated all dependencies to latest versions
   - Removed security vulnerabilities

2. **ES Module Support**:
   - Full ES module support with `import`/`export`
   - Compatible with modern Node.js applications
   - TypeScript-friendly

3. **Better Error Handling**:
   - Improved error messages
   - More robust HTTP request handling

4. **Code Quality**:
   - Updated ESLint configuration
   - Better code formatting
   - Removed deprecated code patterns

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Disclaimer

This library scrapes Billboard's website. Please be respectful of their servers and use this library responsibly. Billboard's terms of service should be reviewed before using this library in production applications.
