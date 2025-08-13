# Changelog

All notable changes to this project will be documented in this file.

## [3.0.5] - 2025-08-16 - PRODUCTION READY 🚀

### 🎯 Production Ready Release
This version marks the library as production-ready with comprehensive testing, robust error handling, and enterprise-grade reliability.

### ✨ Added
- **Comprehensive Test Suite**: Added 20+ test cases covering all functionality
- **Edge Case Testing**: Tests for invalid inputs, network errors, and data validation
- **Performance Testing**: Concurrent request handling and memory management validation
- **Data Integrity Validation**: Comprehensive structure and type checking

### 🛡️ Enhanced
- **Error Handling**: Robust error handling for all failure scenarios
- **Test Organization**: Clean, organized test structure with emoji headings
- **Documentation**: Complete README overhaul with usage examples and best practices

### 🔧 Fixed
- **HTML Structure Compatibility**: Updated selectors to work with Billboard's new HTML layout (August 2025)
- **Chart Data Extraction**: Fixed title and artist extraction with cleaner text parsing
- **Improved Chart Discovery**: Enhanced `listCharts()` function to find 288+ available charts
- **Test Reliability**: Updated tests to handle minor data variations and external changes

### 🧪 Testing
- **Core Functionality**: Tests for Hot 100, Latin Songs, Artist 100, and historical charts
- **Error Scenarios**: Invalid chart names, dates, callbacks, and network failures
- **Data Validation**: Chart structure, song data, and URL format validation
- **Performance**: Concurrent requests, memory management, and timeout handling

### 📚 Documentation
- **Usage Examples**: Comprehensive examples for all major use cases
- **API Reference**: Clear data structure documentation
- **Error Handling Guide**: Best practices for production use
- **Development Setup**: Complete development and testing instructions

### Technical Details
- Replaced fragile DOM traversal with robust CSS selectors
- Implemented direct text node extraction for clean song titles
- Added intelligent artist name filtering to avoid chart metadata
- Enhanced chart discovery with multiple fallback approaches
- Updated test assertions to be more flexible with external data

## [3.0.4] - 2025-01-27

### Fixed
- **Complete dependency cleanup**: All deprecated packages removed
- **Native fetch implementation**: Uses Node.js 18+ native fetch for better performance
- **Regenerated package-lock.json**: Synced with updated dependencies
- **Clean npm installs**: No more deprecated warnings when installing

## [3.0.3] - 2025-01-27

### Fixed
- npm token configuration for automatic publishing
- CI/CD workflow verification with proper authentication
- **Removed deprecated dependencies**: Eliminated `node-fetch`, `har-validator`, `uuid@3.4.0`, and `request@2.88.2`
- **Updated to native fetch**: Now uses Node.js 18+ native `fetch` instead of `node-fetch`
- **Updated all dependencies**: Upgraded to latest stable versions

## [3.0.2] - 2025-01-27

### Fixed
- Final CI/CD workflow fixes and version bump

## [3.0.1] - 2025-01-27

### Fixed
- Fixed CI/CD workflow to use Node.js 18 instead of 16
- Resolved npm publish workflow Node.js version mismatch

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

---

## 🚀 What's New in 3.0.5

**Production Ready**: This version transforms the library from a basic chart fetcher into a production-ready, enterprise-grade solution with:

- **20+ Comprehensive Tests**: Covering all functionality, edge cases, and error scenarios
- **Robust Error Handling**: Graceful degradation for all failure modes
- **Performance Validation**: Memory management and concurrent request testing
- **Data Integrity**: Complete structure and type validation
- **Professional Documentation**: Clear examples, best practices, and troubleshooting guides

**Ready for Production Use**: The library now meets enterprise standards for reliability, testing, and error handling, making it suitable for production applications and critical business use cases. 