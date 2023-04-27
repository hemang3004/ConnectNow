const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserOTP=require("../models/userOtpModel")
// asyncHandler is used for handle any error that occurs in this controller
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic,re } = req.body;
  let resend=re-'0';
  
 
  if (!resend && (!name || !email || !password)) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  let userExist = await User.findOne({ email });
  
 
  if (userExist && !resend) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Generate a random verification code
  const verificationCode = Math.floor(100000 + Math.random() * 900000);
 
  // Create a new user object and set the verified field to false
  if(!resend || !userExist){
    const user = await User.create({
      name,
      email,
      password,
      pic,
      verified: false,
      timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone
      
    });
   userExist=user
  }
  


    // Send an email to the user with the verification code
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rahulpatelrahul1425@gmail.com",
        pass: "pjbpfpecjtglnimj",
      },
    });
    
    const mailOptions = {
      from: "youremail@gmail.com",
      to: userExist.email,
      subject: "Email Verification Code from ConnectNow",
      text: `Your verification code is: ${verificationCode}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        console.log(verificationCode)
      }
    });
    if(!resend){
      await UserOTP.create({
        userId:userExist._id,
        otp:verificationCode,
        createdAt:Date.now(),
        expiredAt:Date.now()+3600000
      })
    }else{
    var id=userExist._id;
 await UserOTP.findOneAndUpdate({'userId':id},{otp:verificationCode}).catch(err=>console.log(err))
    }
   
    res.status(201).json({
      _id: userExist._id,
      name:userExist.name,
      email: userExist.email,
      pic: userExist.pic,
      token: generateToken(userExist._id),
      message: "A verification code has been sent to your email"+`${verificationCode}`,
    });
  } 
);
const verifyEmail = asyncHandler(async (req, res) => {
  const { verifiedEmail, code } = req.body;
  let email=verifiedEmail
// console.log(code)
  const user = await User.findOne( {email:verifiedEmail} );
  console.log(user)
  var id=user._id;
  
  const otp=await UserOTP.findOne({userId:id})
  console.log(otp.otp)
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (user.verified) {
    res.status(400);
    throw new Error("Email already verified");
  }

  if (String(otp.otp) == String(code)) {
  // clear the verification code
  console.log("VErified")
  await User.findOneAndUpdate(id,{verified:true}).catch(err=>console.log(err))
    res.status(200).json({status:"verified"})
  
  }else{
    
    console.log(otp.otp,code)
    res.status(400);
    throw new Error("Invalid verification code");
  }

  // Update the user object to set verified to true
  
});
// user authentication
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // find email in database
  const user = await User.findOne({ email });
  if(!user.verified){
    res.status(401);
    throw new Error("Please Verify");
  }
  var notis=[];
  console.log(user.notification.length)
  user.notification.forEach(element => {
    if(element!==''){
    notis.push(JSON.parse(element))}
  });
  

  // if email found in db then match password and if both are same then return json data
  if (user && (await user.matchPassword(password))) {
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken.generateToken(user._id),
      verified:user.verified,
      timeZone:user.timeZone,
      notification:notis
    });
    User.findByIdAndUpdate(  user._id , { $set: { notification: [] } }, function(err, result) {
      if (err) {
        console.log(err);
      }})

  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  // query to find user that user search . query based on either email or name
  const keyword = req.query.search
    ? {
        
        $and:[
          {verified:true},
          {$or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ]}
        ]
      }
    : {};

  // user that logged in we don't want to find that user as he can't search him self
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

const sendMail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      res.status(401);
      throw new Error("User Not Exists!!");
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    const token = generateToken.generateTokenForPass(
      oldUser.email,
      oldUser._id,
      secret
    );
    const link = `http://localhost:3000/reset-password/${oldUser._id}/${token}`;
    console.log("link : ", link);

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rahulpatelrahul1425@gmail.com",
        pass: "pjbpfpecjtglnimj",
      },
    });

    var mailOptions = {
      from: "youremail@gmail.com",
      to: oldUser.email,
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    // to do
    res.status(200).json({ email: oldUser.email });
  } catch (error) {
    res.status(401);
    throw new Error("Email not sent!!");
  }
});

const resetUserPassWord = asyncHandler(async (req, res) => {
  // const { id, token } = req.params;
  const id = req.params.id;
  const token = req.params.token;
  const { password } = req.body;
  
  // console.log("id ", id);

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = process.env.JWT_SECRET + oldUser.password;

  try {
    const verify = jwt.verify(token, secret);
    // console.log(verify);
    // output
    //    id: '63eb8ee931e8fdeb32cd2b94',
    // email: 'kishantanakhiya@gmail.com',
    // iat: 1676383739,
    // exp: 1676384039

    if (verify) {
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);
      try {
        await User.updateOne(
          {
            _id: id,
          },
          {
            $set: {
              password: encryptedPassword,
            },
          }
        );
      } catch (error) {
    console.log("Wrong")

        res.status(401);
        throw new Error("Password not updated!!");
      }

      res.send("verfied & updated");
    }
  } catch (error) {
    // console.log(error);
   
    res.status(401);
    throw new Error("token is not verfied!!");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { name, pic, id } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }

  try {
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          name: name,
          pic: pic,
        },
      }
    );
    const newUser = await User.findOne({ _id: id });
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      pic: newUser.pic,
      token: generateToken.generateToken(newUser._id),
    });
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Not updated!!");
  }
});

const deleteProfilePicture = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }

  if (oldUser.pic) {
    try {
      await User.updateOne(
        {
          _id: id,
        },
        {
          $unset: {
            pic: "",
          },
        }
      );
      const newUser = await User.findOne({ _id: id });
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        // pic: newUser.pic,
        token: generateToken.generateToken(newUser._id),
      });
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Deleted!!");
    }
  } else {
    res.status(401);
    throw new Error("No Profile Picture!!");
  }
});

const getUser = asyncHandler(async (req, res) => {
  // const { id } = req.params.uId;
  const users = await User.findOne({ _id: req.params.uId });
  // console.log("xxid ", users);
  if (!users) {
    return res.json({ status: "User Not Exists!!" });
  } else {
    return res.send(users);
  }
});

const verifyPassword = asyncHandler(async (req, res) => {
  const { id, password } = req.params;
  const user = await User.findOne({ id });
  if (!(user && (await user.matchPassword(password)))) {
    // res.status(401);

    // throw new Error("Old Password is not correct!!");
    return res.send(false);
    // res.json({ status: "Old Password is not correct!!" });
  } else {
    return res.send(true);
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { id, newPassword } = req.body;
  console.log("pasword", newPassword);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(newPassword, salt);
  try {
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );
    res.send("verfied & updated");
  } catch (error) {
    res.status(401);
    throw new Error("Password not updated!!");
  }
});

const storeNotifiactions=(offUsers)=>{
  for (const key in offUsers) {
    User.findByIdAndUpdate(
      key,
      { $push: { notification: offUsers[key] } },
      { new: true }, // Return the updated document
      function (err, user) {
        if (err) {
          console.log(err);
        }
        // The user was successfully updated, do something if needed
      }
    );
  }
}

module.exports = {
  registerUser,
  authUser,
  allUsers,
  sendMail,
  resetUserPassWord,
  updateUser,
  getUser,
  deleteProfilePicture,
  verifyPassword,
  updatePassword,
  verifyEmail,
  storeNotifiactions
};
