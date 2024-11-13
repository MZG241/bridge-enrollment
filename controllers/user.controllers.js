import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//CREATE JWT TOKEN
const createToken = (_id) =>{
 return jwt.sign({_id}, process.env.SECRET,{expiresIn:"1h"});
}

//Register Users
const registerUser = async(req,res)=>{

const {username , email ,password, phone , location} = req.body;

if(!username || !email || !password ){
    return res.status(404).json({error:" username , email and password fields are required."});
}


// Check if email already exist
const exist = await User.findOne({ email });
if (exist) {
  return res.status(400).json({ error: "Email is already taken" });
}

//Harsh password
const salt  = await bcrypt.genSalt();
const Hashed = await bcrypt.hash(password,salt);

try {
    const userData = await User.create({username,password:Hashed,email,phone,location});
    //Create JsonWebToken
    const token = createToken(userData._id);
    //Sending the response
    res.status(201).json({email,token})
} catch (error) {
    res.status(500).json({message:"Error Internal Server"});
}


}


//Login user
const loginUser = async(req,res)=>{
const {email,password} = req.body;

if(!email || !password){
    return res.status(404).json({error:"email and password are required"})
}

const emailChecking = await User.findOne({email}) ;
if(!emailChecking){
return res.status(404).json({error:"This email does not exist, create an account first"});
}

const match = await bcrypt.compare(password, emailChecking.password);

if(!match){
 return res.status(404).json({error:"Incorrect password"});
}

try {
    //Create JsonWebToken
    const token = createToken(emailChecking._id);
    res.status(200).json({email,token});

} catch (error) {
  res.status(500).json({error:"Error Internal Server"});
}
}



export {registerUser , loginUser}