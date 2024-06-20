const express = require('express');
const router = express.Router();
const User=require("../Models/User");
const {hashPassword,comparePassword}=require("../middlewares/auth");
const JWT=require("jsonwebtoken");
const {requireSignIn,isAdmin}=require("../middlewares/protected");

//Register
router.post('/register',async(req,res)=>{
    try{
        const { name, email, phone, password } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!password) {
      return res.send({ error: "Password is Required" });
    }
    if (!phone) {
      return res.send({ error: "Phone no is Required" });
    }
    
    //check user
    const exisitingUser = await User.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: true,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new User({
      name,
      email,
      phone,
      
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });



    }catch(error){
        console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
    }
})
router.post('/login',async(req,res)=>{
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
          return res.status(404).send({
            success: false,
            message: "Invalid email or password",
          });
        }
        //check user
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).send({
            success: false,
            message: "Email is not registerd",
          });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
          return res.status(200).send({
            success: false,
            message: "Invalid Password",
          });
        }
        //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({
        success: true,
        message: "login successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in login",
        error,
      });
    }
  

})
router.get('/test',requireSignIn, isAdmin,(req,res)=>{
    try {
        res.send("Protected Routes");
      } catch (error) {
        console.log(error);
        res.send({ error });
      }
})


module.exports=router; 