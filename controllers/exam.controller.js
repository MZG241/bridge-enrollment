import Exam from "../models/exam.model.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";


const GetuserExams = async(req,res)=>{

    //Grab the user own the post of exam
    const user = await User.findById(req.user._id);
    try { 
     const examinations = await Exam.find({user:user._id}).sort({createdAt:"desc"});
         res.status(201).json({examinations});
            } catch (error) {
              res.status(404).json({error:"Not found"});  
         }
    };
    

//==============Controller Display All Exam===============
 const GetExams = async(req,res)=>{
        try { 
          const examinations = await Exam.find().sort({createdAt:"desc"});
          res.status(201).json({examinations});
        } catch (error) {
          res.status(404).json({error:"Not found"});  
     }
};

//===============Controller Add Exam===================
 const AddExams = async(req,res)=>{
    const {title , description, city ,location , date} = req.body;       
    if(!title || !description || !city || !location || !date){
    return res.status(400).json({error:"All fields are required "});
    }
    
//Grab the user own the post of exam
const user = await User.findById(req.user._id);

try {
     const examinations = await Exam.create({user:user._id,title,description,city,location,date});
     res.status(201).json({examinations,message:"Exam added successfuly"});
     
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Exam not added "});
    }
 };



 //============Controller Delete Exam=================
 const DeleteExam = async(req,res)=>{

    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({error:"Incorrect ID"});

 }

 //Check if the exam exist
 const exam = await Exam.findById(req.params.id);
if(!exam){
return  res.status(400).json({error:"Exam not found"}); ;
}


//Check the user own the posts before deleting
const user = await User.findById(req.user._id);

if(!exam.user.equals(user._id)){
return  res.status(401).json({error:"Not authorized"}); ;
}
try {
     await Exam.deleteOne();
    res.status(201).json({ user:user._id,  message:"Exam deleted successfuly"});
} catch (error) {
    console.error(error);
    res.status(500).json({error:"Exam not deleted "});   
}
}


 //=====================Controller Update Exam=======================
 const UpdateExam = async(req,res)=>{

//Grab data from the body
const {title , description, city ,location , date} = req.body;     

//Check if fields are empty
if(!title || !description || !city || !location || !date){
    return res.status(400).json({error:"All fields are required "});
}

//Check the Id is a valid Type
if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({error:"Incorrect ID"});
 }

 //Check if the exam exist
 const exam = await Exam.findById(req.params.id);
if(!exam){
return  res.status(400).json({error:"Exam not found"}); ;
}

//Check the user own the posts before updating
const user = await User.findById(req.user._id);
if(!exam.user.equals(user._id)){
return  res.status(401).json({error:"Not authorized"}); ;
}


try {
     await Exam.updateOne({user:user._id,title,description,city,location , date});
    res.status(201).json({message:"Exam updated successfuly"});
} catch (error) {
    console.error(error);
    res.status(500).json({error:"Exam not updated "});   
}
}




 




 export {GetExams , GetuserExams , AddExams , DeleteExam , UpdateExam } ;
