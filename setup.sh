#!/bin/bash

echo "HackerNews API Test Setup"
echo "========================="

if [ "$1" = "docker" ]; then
    echo "Setting up with Docker..."
    docker-compose build
    echo "Run tests with: docker-compose up"
elif [ "$1" = "local" ]; then
    echo "Setting up locally..."
    npm install
    npx playwright install
    echo "Run tests with: npm test"
else
    echo "Usage: ./setup.sh [local|docker]"
    echo "  local  - Setup for local development"
    echo "  docker - Setup with Docker"
    exit 1
fi

echo "Setup complete!" 