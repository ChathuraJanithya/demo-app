#!/bin/bash

echo "🎭 Running Playwright E2E Tests for Loan Dashboard"
echo "=================================================="

echo "📦 Installing Playwright browsers (if needed)..."
npx playwright install

echo "🚀 Starting development server..."
pnpm run dev &
DEV_PID=$!

echo "⏳ Waiting for server to start..."
sleep 10

echo "🧪 Running E2E tests..."
npx playwright test

echo "🛑 Stopping development server..."
kill $DEV_PID

echo "✅ Tests completed!"
