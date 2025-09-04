#!/usr/bin/env node

const { execSync } = require('child_process');
const port = process.argv[2] || 3000;

function killPort(port) {
  try {
    if (process.platform === 'darwin') {
      // macOS
      try {
        execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: 'ignore' });
        console.log(`✓ Cleared port ${port}`);
      } catch (e) {
        console.log(`✓ Port ${port} is already free`);
      }
    } else if (process.platform === 'win32') {
      // Windows
      try {
        execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8' });
        execSync(`for /f "tokens=5" %a in ('netstat -ano ^| findstr :${port}') do taskkill /F /PID %a`, { stdio: 'ignore' });
        console.log(`✓ Cleared port ${port}`);
      } catch (e) {
        console.log(`✓ Port ${port} is already free`);
      }
    } else {
      // Linux
      try {
        execSync(`fuser -k ${port}/tcp`, { stdio: 'ignore' });
        console.log(`✓ Cleared port ${port}`);
      } catch (e) {
        console.log(`✓ Port ${port} is already free`);
      }
    }
  } catch (error) {
    console.log(`✓ Port ${port} is ready`);
  }
}

killPort(port);