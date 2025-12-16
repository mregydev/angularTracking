#!/usr/bin/env node

const { execSync } = require('child_process');

const vercelEnv = process.env.VERCEL_ENV || 'development';
const isProduction = vercelEnv === 'production';

const buildCommand = isProduction
  ? 'ng build --configuration production'
  : 'ng build --configuration debug';

console.log(`Building for Vercel environment: ${vercelEnv}`);
console.log(`Using configuration: ${isProduction ? 'production' : 'debug'}`);

try {
  execSync(buildCommand, { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}

