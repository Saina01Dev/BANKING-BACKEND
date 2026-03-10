

//check balance
const User = require("../models/User");
exports.getBalance = async(req,res)=>{
const user = await User.findById(req.user.id);
res.json({balance:user.balance});
};

//Transfer Money

const Transaction = require("../models/Transaction");
exports.transfer = async(req,res)=>{
try{
 const {receiverAccount,amount} = req.body;
 const sender = await User.findById(req.user.id);
 if(sender.balance < amount){
 return res.status(400).json({message:"Insufficient balance"});
 }
 const receiver = await
User.findOne({accountNumber:receiverAccount});
 if(!receiver){
 return res.status(404).json({message:"Receiver not found"});
 }
 sender.balance -= amount;
 receiver.balance += amount;
 await sender.save();
 await receiver.save();
 const transaction = await Transaction.create({
 sender:sender._id,
 receiver:receiver._id,
 amount,
 status:"success",
 type:"transfer"
 });
 res.json(transaction);
}catch(err){
 res.status(500).json({error:err.message});
}
};

//transaction history

exports.history = async(req,res)=>{
const transactions = await Transaction.find({
 $or:[
 {sender:req.user.id},
 {receiver:req.user.id}
 ]
});
res.json(transactions);
};

