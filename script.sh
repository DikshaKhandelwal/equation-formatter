#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Setting up the Equation Formatter project..."

# Initialize a Vite React project
echo "Initializing Vite React project..."
npm create vite@latest . -- --template react

# Create required directories
echo "Creating project directories..."
mkdir -p public/assets src/components src/styles src/utils

# Create necessary files
echo "Creating project files..."
touch public/index.html public/favicon.ico public/assets/math-bg.jpg
touch src/components/EquationInput.jsx src/components/EquationPreview.jsx
touch src/components/ThemeSelector.jsx src/components/EquationHistory.jsx
touch src/components/Header.jsx
touch src/styles/App.css src/styles/index.css
touch src/utils/mathHelpers.js
touch README.md

# Update Vite config file
echo "Configuring Vite..."
touch vite.config.js

# Install dependencies
echo "Installing dependencies..."
npm install

echo "Project setup completed successfully!"
