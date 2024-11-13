import jwt from "jsonwebtoken"

import User from "../models/user.model.js"


const auth = async (req,res,next)=>{

    //Check if the request headers contains the key authorization
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({error:"Authorized token not found"})
    }

    //Grab the token from the headers (taking the "bearer" string away) always let a space in split function
    const token = authorization.split(" ")[1];


    try {
        //Decode and extract the user id from the token
        const {_id} = jwt.verify(token , process.env.SECRET)

        //save the user in request , user is a column of the database where I want to check the data
        req.user = await User.findById(_id).select("_id");
        next()
    } catch (error) {
        res.status(401).json({error:"unauthorized"});
    }
}

export default auth ;