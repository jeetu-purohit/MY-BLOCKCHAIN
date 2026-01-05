// my blockchain project 
import cryptoJS from "crypto-js"
import { connect } from "http2";
class Block{
    constructor(index,timestamp, data , previousHash = ""){
        this.index = index;
        this.data = data ;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = this.generateHash();
        this.nonce = 0;
    }

    generateHash(){
        return cryptoJS.SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString(cryptoJS.enc.Base64);

    }

    mine(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash = this.generateHash();
        }

        console.log("block generated", this.hash)
    }
}


class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;//my laptop can't handle more than 4
    }

    createGenesisBlock(){
        return new Block(0 , "1/1/2026", "genisis block" , "0")
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mine(this.difficulty)
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1;i<this.chain.length;i++){
            let currentBlock = this.chain[i];
            let previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.generateHash()){
                return false;
            }

            if(previousBlock.hash !== currentBlock.previousHash){
                return false;
            }
        }

        return true;
    }

    
}

let jeetuCoin = new Blockchain();
console.log("mining 1...")
jeetuCoin.addBlock(new Block(1 , "1/1/2026" , "first block"))
console.log("mining 2...")
jeetuCoin.addBlock(new Block(2 , "1/1/2026" , "second block"))
console.log("mining 3...")
jeetuCoin.addBlock(new Block(3 , "1/1/2026" , "thid block"))


//to check if the chain is tampered or not
// jeetuCoin.chain[1].data = {amount : 100}; //i am rich MOTHERFUCKER
// jeetuCoin.chain[1].hash = jeetuCoin.chain[1].generateHash();
// console.log("is blockchain valid?", jeetuCoin.isChainValid()===true? "YES , jeetu chain is vlid": "NO ,jeetu chain is not valid");


//to log the chain
// console.log(JSON.stringify(jeetuCoin, null ,1));