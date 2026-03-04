const tlds = require('../data.json');

function getAllTlds() {
    return tlds.map(entry => entry.tld);
}

function isTld(tld) {
    return tlds.some(entry => entry.tld.toLowerCase() === tld.toLowerCase());
}

function getPunycode(tld) {
    const entry = tlds.find(entry => entry.tld.toLowerCase() === tld.toLowerCase());
    return entry ? entry.punycode : null;
}

function searchTlds(search) {
    const searchLower = search.toLowerCase();
    return tlds.filter(entry => entry.tld.toLowerCase().includes(searchLower));
}

module.exports = { tlds, getAllTlds, isTld, getPunycode, searchTlds };
