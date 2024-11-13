import mongoose from "mongoose";



const ExamSchema = new mongoose.Schema({

user:{
type:mongoose.Types.ObjectId,
required:true,
ref:"User"
},
title:{
type:String,
required:true
},
description:{
    type:String,
    required:true
},
date:{
    type:Date,
    required:true
},
city:{
type:String,
required:true
},
location:{
    type:String,
    required:true
    }
},{
timestamps:true
})


const Exam = mongoose.model("Exam" , ExamSchema);


export default Exam ;



