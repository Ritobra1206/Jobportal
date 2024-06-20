const mongoose=require("mongoose");
const validator=require("validator");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Provide your name"],
        minLength:[3,"Name must contain at least 3 characters!"],
        maxLength:[30,"Name cannot exceed 30 characters"],
    },
    email:{
        type:String,
        required:[true,"Please Provide your email"],
        validate:[validator.isEmail,"Please provide a valid email!"],
    },
    
    phone:{
        type:String,
        required:[true,"Please Provide your phone number"],
    },
    password:{
        type:String,
        required:[true,"Please Provide password"],
        minLength:[8,"Password must contain at least 8 characters!"],
        

    },
     role:{
        type:Number,
        default:0,
   }
},{timestamps:true})

module.exports=mongoose.model("User",userSchema);