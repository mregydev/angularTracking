#!/usr/bin/env node

const { execSync } = require('child_process');

const vercelEnv = process.env.VERCEL_ENV || 'development';
// Force debug build for Angular DevTools support
// Change to false if you want optimized production builds
const FORCE_DEBUG_MODE = true;

const isProduction = vercelEnv === 'production' && !FORCE_DEBUG_MODE;

const buildCommand = isProduction
  ? 'ng build --configuration production'
  : 'ng build --configuration debug';

console.log(`Building for Vercel environment: ${vercelEnv}`);
console.log(`Using configuration: ${isProduction ? 'production' : 'debug'}`);
if (FORCE_DEBUG_MODE) {
  console.log('⚠️  Debug mode enabled - Angular DevTools will work, but bundle will be larger');
}

try {
  execSync(buildCommand, { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}

