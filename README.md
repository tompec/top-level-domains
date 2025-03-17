# TLD List

This repository contains a list of all existing [Top-Level Domains](https://en.wikipedia.org/wiki/Top-level_domain) (TLDs) that can be registered.

This includes:  
- gTLD: [Generic top-level domain](https://en.wikipedia.org/wiki/Generic_top-level_domain)
- grTLD: Generic restricted top-level domain
- sTLD: [Sponsored top-level domain](https://en.wikipedia.org/wiki/Sponsored_top-level_domain)
- ccTLD: [Country code top-level domain](https://en.wikipedia.org/wiki/Country_code_top-level_domain)

## Installation

```bash
npm install top-level-domains
# or
yarn add top-level-domains
```

## Usage

```javascript
// ESM
import { tlds, isTld, getPunycode, searchTlds } from 'top-level-domains';

// CommonJS
const { tlds, isTld, getPunycode, searchTlds } = require('top-level-domains');

// Check if a string is a valid TLD
console.log(isTld('com')); // true
console.log(isTld('notarealtld')); // false

// Get the punycode representation of a TLD
console.log(getPunycode('台灣')); // 'xn--kpry57d'

// Search for TLDs containing a string
const results = searchTlds('com');
console.log(results); // Returns all TLDs containing 'com'

// Get all TLDs as an array of strings
const allTlds = getAllTlds();
```

## Structure

Each TLD entry in the `data.json` file is structured as follows:

```json
{
  "tld": "example",
  "punycode": "example"
}
```

For internationalized domain names (IDNs), the punycode representation is different:

```json
{
  "tld": "台灣",
  "punycode": "xn--kpry57d"
}
```

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bugfix
3. Make your changes
4. Submit a pull request

## License

MIT
