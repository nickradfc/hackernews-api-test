# HackerNews API Test

API testing for HackerNews Public API using TypeScript and Playwright. Tests run in parallel with 16 workers by default (can be changed). Tests results available in HTML dashboard with `npm run report` or access json file test results in the `test-results/`. RUnning tests with Docker option provides a consistent test environment across different machines and CI/CD pipelines.

**Author**: Nick Radililovsky

## Features

- **Sanity tests**: Core functionality validation
- **Regression tests**: Edge cases and error handling
- **Playwright default html dashboard**: Test results visualization
- **Postman collection**: Manual API exploration

## Quick Start

### Setup and run locally
```bash
./setup.sh local
npm test
npm run report
```

### Docker Setup

```bash
./setup.sh docker
docker-compose up
```

## Run test suites via cmd line

- `npm run test:sanity` - Run sanity tests only
- `npm run test:regression` - Run regression tests only

## Manual testing

Postman collection is included in `postman_collection/` directory for manual API running. 

## API Endpoints Tested

### Sanity
- `GET /topstories.json` - Retrieve all top stories
- `GET /item/{id}.json` - Retrieve specific story by ID
- `GET /item/{id}.json` - Retrieve specific comment by ID
- `GET /item/{id}.json` - Retrieve current top story
- `GET /item/{id}.json` - Retrieve first comment from top story

### Regression
- `GET /topstories.json` - Validate top stories array structure
- `GET /item/{id}.json` - Validate story data structure
- `GET /item/{id}.json` - Validate comment data structure
- `GET /item/{id}.json` - Handle non-existent item IDs
- `GET /item/{id}.json` - Handle invalid item ID formats
- `GET /item/{id}.json` - Handle negative item IDs
- `GET /item/{id}.json` - Handle deleted and dead items
- `GET /invalidendpoint.json` - Handle invalid endpoints
- `POST /topstories.json` - Handle wrong HTTP methods