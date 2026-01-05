# MyBlockchain

A blockchain i made to visualize how a blockchain work in js.

## Features

- **Transactions**: Sign and verify transactions using elliptic curve cryptography (secp256k1)
- **Digital Signatures**: Each transaction is signed with a private key and verified with a public key
- **Proof of Work**: Mines blocks with configurable difficulty
- **Chain Validation**: Verifies blockchain integrity and transaction validity
- **Balance Tracking**: Calculates wallet balances from the transaction history

## How It Works

1. Create transactions with a sender, receiver, and amount
2. Sign transactions with your private key
3. Mine blocks containing pending transactions
4. Receive mining rewards (10 coins per block)
5. Validate the entire chain to ensure it hasn't been tampered with

## Usage

### Generate Keys

```bash
node keyGen.js
```

### Run the Demo

```bash
node main.js
```

## Project Files

- **blockchain.js** - Core classes: `Transaction`, `Block`, and `Blockchain`
- **keyGen.js** - Generate public/private key pairs
- **main.js** - Demo implementation with examples

## Example

```javascript
import { Blockchain, Transaction } from "./blockchain.js";

const blockchain = new Blockchain();

// Create and sign a transaction
const tx = new Transaction(senderAddress, receiverAddress, 100);
tx.signTransaction(senderPrivateKey);

// Add to blockchain
blockchain.addTransaction(tx);
blockchain.mineTransaction(minerAddress);

// Check balance
console.log(blockchain.calculateBalance(minerAddress));
```

## Tech Stack

- **Node.js** with ES Modules
- **crypto-js** for SHA-256 hashing
- **elliptic** for elliptic curve cryptography

This is an educational project. Not for production use.
