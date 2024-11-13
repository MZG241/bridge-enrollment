import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
username:{
type:String,
required:true
}, 
email:{
    type:String,
    required:true,
    unique:true
    },
password:{
        type:String,
        required:true,
        },

phone:{
 type:String,
},
location:{
    type:String,
}
},{
timestamps:true
});

const User = mongoose.model("User",UserSchema);

export default User;