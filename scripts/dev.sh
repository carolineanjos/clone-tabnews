#!/bin/bash

# Function to stop the containers when exiting
cleanup() {
    echo "Stopping Docker containers..."
    docker compose -f ./infra/compose.yaml stop
    exit 0
}

# Capture interrupt signals to call the cleanup function
trap cleanup INT TERM EXIT

# Run Next.js
npx next dev

# Wait for the main process to prevent the script from terminating early
wait