import express from "express";
import cors from "cors";
import { createTransaction, getbalance, getchain, isvalid, mine } from "./main.js";

const app = express()
app.use(cors())
app.use(express.json())

app.get("/chain",(req,res)=>{
    res.json(getchain()); 
})

app.post("/transaction",(req,res)=>{
    const {from,to,amount} = req.body;
    const trans = createTransaction(to,amount)
    res.json(trans)
})

app.post("/mine",(req,res)=>{
    const {minerAddress} = req.body;
    res.json(mine(minerAddress));
})

app.get("/balance",(req,res) => {
    const {address} = req.query;
    res.json(getbalance(address));
})

app.get("/isvalid" , (req,res) =>{
    res.json({valid:isvalid()});
})

app.listen(3000 , ()=>{
    console.log("blockchain is running on the port 3000")
})