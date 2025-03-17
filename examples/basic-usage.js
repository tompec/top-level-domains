// This example demonstrates basic usage of the top-level-domains package
const { tlds, getAllTlds, isTld, getPunycode, searchTlds } = require('../dist');

// Get the total number of TLDs
console.log(`Total TLDs: ${tlds.length}`);

// Check if some strings are valid TLDs
console.log(`Is 'com' a valid TLD? ${isTld('com')}`);
console.log(`Is 'example' a valid TLD? ${isTld('example')}`);

// Get punycode for an internationalized TLD
console.log(`Punycode for '台灣': ${getPunycode('台灣')}`);

// Search for TLDs containing 'app'
const appTlds = searchTlds('app');
console.log(`Found ${appTlds.length} TLDs containing 'app':`);
appTlds.slice(0, 5).forEach(tld => {
    console.log(`- ${tld.tld} (${tld.punycode})`);
});
if (appTlds.length > 5) {
    console.log(`... and ${appTlds.length - 5} more`);
}

// Get all TLDs as strings
const allTlds = getAllTlds();
console.log(`First 5 TLDs: ${allTlds.slice(0, 5).join(', ')}`);
