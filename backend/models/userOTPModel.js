const mongoose=require("mongoose");

const userOTPSchema=new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      otp:String,
      createdAt:Date,
      expiredAt:Date
})
const UserOTP = mongoose.model("UserOTP", userOTPSchema);
module.exports = UserOTP;
