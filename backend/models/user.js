import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    wallet:{
        type: Number, 
        default: 500 
    },
    purchasedVideos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    }]
})

export default mongoose.model("User",userSchema);