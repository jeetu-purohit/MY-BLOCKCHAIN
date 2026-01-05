# MyBlockchain

A blockchain implementation project built during bootcamp to understand the fundamentals of distributed ledger technology.

## Overview

This project demonstrates the core concepts of blockchain technology, including:
- Block creation and validation
- Chain integrity and cryptographic hashing
- Proof of Work mechanisms
- Consensus algorithms

## Features

- **Block Management**: Create and manage blocks in the chain
- **Cryptographic Hashing**: Uses SHA-256 for secure block identification
- **Chain Validation**: Validates the integrity of the entire blockchain
- **Transaction Support**: Records transactions in blocks

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Project

To run the blockchain implementation:

```bash
node main.js
```

## Project Structure

```
myblockchain/
├── main.js          # Main blockchain implementation
├── README.md        # Project documentation
└── package.json     # Project dependencies (optional)
```

## How It Works

The blockchain works by:

1. **Creating Blocks**: Each block contains transaction data, a timestamp, and a hash
2. **Linking Blocks**: Each block references the previous block's hash, creating an immutable chain
3. **Validation**: The chain can be validated by recalculating hashes and comparing them
4. **Security**: Any attempt to modify past blocks would break the chain's integrity

## Example Usage

```javascript
// Refer to main.js for implementation details
```

## Learning Outcomes

This project helps understand:
- How blocks are created and hashed
- The importance of immutability in blockchain
- How the chain validates itself
- Basic cryptographic principles

## Future Enhancements

- Implement Proof of Work
- Add transaction signing and verification
- Implement a simple consensus mechanism
- Add a peer-to-peer network
- Create a REST API interface

## Resources

- [Bitcoin Whitepaper](https://bitcoin.org/bitcoin.pdf)
- [Blockchain Fundamentals](https://www.investopedia.com/terms/b/blockchain.asp)

## Author

Created as part of bootcamp training

## License

MIT License

---

**Note**: This is an educational project designed to demonstrate blockchain concepts. It should not be used for production purposes.
