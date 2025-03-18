#!/usr/bin/env node

/**
 * This script sorts the TLDs in data.json by punycode and checks for duplicates.
 * It then writes the sorted data back to data.json.
 */

const fs = require('fs');
const path = require('path');

// Path to data.json
const dataPath = path.join(__dirname, '..', 'data.json');

// Read the data
console.log('Reading data.json...');
let tlds;
try {
    const data = fs.readFileSync(dataPath, 'utf8');
    tlds = JSON.parse(data);
} catch (error) {
    console.error('Error reading data.json:', error.message);
    process.exit(1);
}

// Check for duplicates before sorting
console.log('Checking for duplicates...');
const displayTldCounts = new Map();
const punycodeTldCounts = new Map();
const duplicateDisplayTlds = [];
const duplicatePunycodeTlds = [];

// Count occurrences of each TLD
tlds.forEach(entry => {
    // Count display form TLDs
    const displayCount = displayTldCounts.get(entry.tld) || 0;
    displayTldCounts.set(entry.tld, displayCount + 1);
    if (displayCount === 1) {
        duplicateDisplayTlds.push(entry.tld);
    }

    // Count punycode TLDs
    const punycodeCount = punycodeTldCounts.get(entry.punycode) || 0;
    punycodeTldCounts.set(entry.punycode, punycodeCount + 1);
    if (punycodeCount === 1) {
        duplicatePunycodeTlds.push(entry.punycode);
    }
});

// Report duplicates if found
if (duplicateDisplayTlds.length > 0) {
    console.warn(`Found ${duplicateDisplayTlds.length} duplicate display TLDs:`, duplicateDisplayTlds);
}

if (duplicatePunycodeTlds.length > 0) {
    console.warn(`Found ${duplicatePunycodeTlds.length} duplicate punycode TLDs:`, duplicatePunycodeTlds);
}

// Sort the TLDs by punycode
console.log('Sorting TLDs by punycode...');
const sortedTlds = [...tlds].sort((a, b) => a.punycode.localeCompare(b.punycode));

// Write the sorted data back to the file
console.log('Writing sorted data back to data.json...');
try {
    fs.writeFileSync(dataPath, JSON.stringify(sortedTlds, null, 2));
    console.log('Success! TLDs are now sorted by punycode.');
} catch (error) {
    console.error('Error writing to data.json:', error.message);
    process.exit(1);
}
