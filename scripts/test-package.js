#!/usr/bin/env node

/**
 * This script tests that the package can be properly imported as it would be by a consumer.
 * It should be run after building the package.
 */

try {
    // Import the package from the path specified in package.json's "main" field
    const packageExports = require('../dist/src/index.js');

    // Verify that essential exports are available
    const requiredExports = ['tlds', 'getAllTlds', 'isTld', 'getPunycode', 'searchTlds'];

    const missingExports = requiredExports.filter(exp => !(exp in packageExports));

    if (missingExports.length > 0) {
        console.error(`Error: Missing exports: ${missingExports.join(', ')}`);
        process.exit(1);
    }

    console.log('✅ Package integration test passed! The package can be properly imported and all required exports are available.');
} catch (error) {
    console.error('❌ Package integration test failed!');
    console.error(error);
    process.exit(1);
}
