# Changelog

All notable changes to this project will be documented in this file.

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