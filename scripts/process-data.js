#!/usr/bin/env node

/**
 * Removes duplicate TLDs from data.json, then sorts by punycode.
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data.json');

let tlds;
try {
    tlds = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
} catch (error) {
    console.error('Error reading data.json:', error.message);
    process.exit(1);
}

const originalCount = tlds.length;

// Deduplicate by display TLD, then by punycode
const seenTlds = new Set();
const seenPunycodes = new Set();
const unique = [];

for (const entry of tlds) {
    if (seenTlds.has(entry.tld) || seenPunycodes.has(entry.punycode)) continue;
    seenTlds.add(entry.tld);
    seenPunycodes.add(entry.punycode);
    unique.push(entry);
}

// Sort by punycode
unique.sort((a, b) => a.punycode.localeCompare(b.punycode));

const removed = originalCount - unique.length;
if (removed > 0) {
    console.log(`Removed ${removed} duplicate(s)`);
}

fs.writeFileSync(dataPath, JSON.stringify(unique, null, 2) + '\n');
console.log(`${unique.length} TLDs — sorted and deduplicated`);
