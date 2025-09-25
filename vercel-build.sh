#!/bin/bash
echo "Building XAUUSD Trading Platform..."

# Build frontend
npm run build

# Create necessary directories
mkdir -p api

echo "Build completed successfully!"