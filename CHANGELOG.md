# Changelog

All notable changes to this project will be documented in this file.

## [3.0.0] - 2025-01-27

### Added
- Node.js 18+ support for better performance and modern features
- Improved test reliability with extended timeouts
- Updated CI/CD pipeline to test against Node.js 18 and 20

### Changed
- **BREAKING**: Minimum Node.js version changed from 16+ to 18+
- Updated all dependencies to latest stable versions
- Enhanced error handling and HTTP request reliability

### Fixed
- Resolved `ReadableStream is not defined` error that was breaking CI/CD
- Fixed timeout issues in `listCharts()` test
- Improved test stability across different environments

### Technical Details
- Updated `package.json` engines field to require Node.js >=18.0.0
- Modified GitHub Actions workflow to test against Node.js 18 and 20
- Updated dependencies including cheerio, node-fetch, and other packages
- Extended test timeout for `listCharts()` function from 10s to 30s

## [2.x.x] - Previous versions

This is a fork of the original [billboard-top-100](https://github.com/darthbatman/billboard-top-100) library with modern updates. 