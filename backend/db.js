
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://admin:OHp5uOrmqP7acYNo@cluster0.d9l2cqe.mongodb.net/url-1")

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
});

const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    url:{
        type:Array,
        required:true
    }
})

const User = mongoose.model("User",userSchema);
const Account = mongoose.model("Account",accountSchema);

module.exports= {
    User,
    Account
}