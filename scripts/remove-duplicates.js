#!/usr/bin/env node

/**
 * This script removes duplicate TLDs from data.json.
 * It keeps the first occurrence of each TLD and removes subsequent duplicates.
 * The script can remove duplicates based on either the display TLD or punycode.
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

console.log(`Original TLD count: ${tlds.length}`);

// Remove duplicates based on display TLD
console.log('Removing duplicates based on display TLD...');
const seenDisplayTlds = new Set();
const uniqueTlds = [];

let displayDuplicatesRemoved = 0;

tlds.forEach(entry => {
    if (!seenDisplayTlds.has(entry.tld)) {
        seenDisplayTlds.add(entry.tld);
        uniqueTlds.push(entry);
    } else {
        displayDuplicatesRemoved++;
    }
});

console.log(`Removed ${displayDuplicatesRemoved} duplicate display TLDs`);
console.log(`Remaining TLDs after display deduplication: ${uniqueTlds.length}`);

// Also check for punycode duplicates (in case there are any)
const seenPunycodeTlds = new Set();
const finalTlds = [];
let punycodeDuplicatesRemoved = 0;

uniqueTlds.forEach(entry => {
    if (!seenPunycodeTlds.has(entry.punycode)) {
        seenPunycodeTlds.add(entry.punycode);
        finalTlds.push(entry);
    } else {
        punycodeDuplicatesRemoved++;
    }
});

console.log(`Removed ${punycodeDuplicatesRemoved} duplicate punycode TLDs`);
console.log(`Final TLD count: ${finalTlds.length}`);

// Write the deduplicated data back to the file
console.log('Writing deduplicated data back to data.json...');
try {
    fs.writeFileSync(dataPath, JSON.stringify(finalTlds, null, 2));
    console.log('Success! Duplicate TLDs have been removed.');
    console.log(`Total duplicates removed: ${displayDuplicatesRemoved + punycodeDuplicatesRemoved}`);
} catch (error) {
    console.error('Error writing to data.json:', error.message);
    process.exit(1);
}
