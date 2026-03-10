const mongoose = require("mongoose");
const TransactionSchema = new mongoose.Schema({
sender:{
 type:mongoose.Schema.Types.ObjectId,
 ref:"User"
},
receiver:{
 type:mongoose.Schema.Types.ObjectId,
 ref:"User"
},
amount:Number,
status:String,
type:String,
createdAt:{
 type:Date,
 default:Date.now
}
});
module.exports = mongoose.model("Transaction",TransactionSchema);
