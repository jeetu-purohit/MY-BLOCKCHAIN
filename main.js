import { Blockchain , Transaction } from "./blockchain.js";
import pkg from 'elliptic';
const { ec: EC} = pkg;

const ec = new EC('secp256k1')

const mykey = ec.keyFromPrivate("bcf89d96f9cd8d4c14a7afe62745b768c8093fce5bcb5ca4fc3b9e3606a359ca")
const myWalletKey = mykey.getPublic('hex');

let jeetuCoin = new Blockchain();

export function getchain(){
    return jeetuCoin.chain
}
export function createTransaction(to , amount ){
    const mykey = ec.keyFromPrivate("bcf89d96f9cd8d4c14a7afe62745b768c8093fce5bcb5ca4fc3b9e3606a359ca");
    const from = mykey.getPublic('hex')
    const tx = new Transaction(from,to , amount);
    tx.signTransaction(mykey);
    jeetuCoin.addTransaction(tx);

    return tx;
}

export function mine(myWalletKey){
    jeetuCoin.mineTransaction(myWalletKey);
    return jeetuCoin.getLatestBlock();
}

export function getbalance(address){
    return jeetuCoin.calculateBalance(address);

}

export function isvalid(){
    return jeetuCoin.isChainValid()
}