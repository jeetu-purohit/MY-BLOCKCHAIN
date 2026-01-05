import { Blockchain , Transaction } from "./blockchain.js";
import pkg from 'elliptic';
const { ec: EC} = pkg;

const ec = new EC('secp256k1')

const mykey = ec.keyFromPrivate("bcf89d96f9cd8d4c14a7afe62745b768c8093fce5bcb5ca4fc3b9e3606a359ca")
const myWalletKey = mykey.getPublic('hex')


let jeetuCoin = new Blockchain();

const tx1 = new Transaction(myWalletKey , "someone else wallet address" , 100);
tx1.signTransaction(mykey);

jeetuCoin.addTransaction(tx1);

console.log("starting the mining.....");
jeetuCoin.mineTransaction(myWalletKey);

console.log("balance of jeetu is ", jeetuCoin.calculateBalance(myWalletKey));
console.log("starting the mining.....");
jeetuCoin.mineTransaction(myWalletKey);

console.log("balance of jeetu is ", jeetuCoin.calculateBalance(myWalletKey));












//random comment to ignore
//to check if the chain is tampered or not
// jeetuCoin.chain[1].data = {amount : 100}; //i am rich MOTHERFUCKER
// jeetuCoin.chain[1].hash = jeetuCoin.chain[1].generateHash();

// console.log("is blockchain valid?", jeetuCoin.isChainValid()===true? "YES , jeetu chain is vlid": "NO ,jeetu chain is not valid");

