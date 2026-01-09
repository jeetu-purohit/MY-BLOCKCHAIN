// my blockchain project 
import cryptoJS from "crypto-js"
import pkg from 'elliptic';
const { ec: EC} = pkg;

const ec = new EC('secp256k1')

export class Transaction{
    constructor(fromAddress , toAddress , amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount; 
    }

    calculateHash(){
        return cryptoJS.SHA256(
        this.fromAddress +
        this.toAddress +
        this.amount
    ).toString();
    }

    signTransaction(signingKey){ 
        if(signingKey.getPublic('hex') !== this.fromAddress){
            throw new Error("you cannot sign this transaction")
        }

        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx , 'hex');
        this.signature = sig.toDER('hex')
    }

    isValid(){
        if(this.fromAddress === null) return true;

        if(!this.signature || this.signature.length === 0){
            throw new Error("no signature available");
        }
        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(),this.signature)
    }
}
class Block{
    constructor(timestamp, transaction , previousHash = ""){
        this.transaction = transaction;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = this.generateHash();
        this.nonce = 0;
    }

    generateHash(){
        return cryptoJS.SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transaction) + this.nonce).toString(cryptoJS.enc.Base64);

    }

    mine(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash = this.generateHash();
        }

        console.log("block generated", this.hash)
    }

    hasValidTransaction(){
        for(const tx of this.transaction){
            if(!tx.isValid()){
                return false;
            }
        }

        return true;
    }
}


export class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;//my laptop can't handle more than 4
        this.pendingTransaction = [];
        this.miningReward = 10;
    }

    createGenesisBlock(){
        return new Block(Date.now(), [] , "0")
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    mineTransaction(miningRewardAddress){
        let block = new Block(Date.now(),this.pendingTransaction , this.getLatestBlock().hash)//we can also create a funtion to add only the pending transaction that are profitable to the miner the most
        block.mine(this.difficulty);
        this.chain.push(block);

        this.pendingTransaction = [
            new Transaction(null , miningRewardAddress , this.miningReward)
        ]
    }

    addTransaction(transaction){

        if(!transaction.fromAddress || !transaction.toAddress){
            throw new Error("transaction must include from and to address")
        }

        if(!transaction.isValid()){
            throw new Error("invalid transaction")
        }
        this.pendingTransaction.push(transaction);
    }

    calculateBalance(address){
        let balance = 0;
        for(const block of this.chain){
            for(const trans of block.transaction){
                if(trans.fromAddress == address){
                    balance-= trans.amount;
                }
                if(trans.toAddress == address){
                    balance+= trans.amount;
                }
            }
        }
        return balance;
    }

    isChainValid(){
        for(let i = 1;i<this.chain.length;i++){
            let currentBlock = this.chain[i];
            let previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.generateHash()){
                return false;
            }

            if(!currentBlock.hasValidTransaction()){
                return false;
            }

            if(previousBlock.hash !== currentBlock.previousHash){
                return false;
            }
        }

        return true;
    }

    
}

