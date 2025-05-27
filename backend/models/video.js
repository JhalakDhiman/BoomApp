import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type:String
  },
  description:{
    type:String
  },
  videoType: {
    type: String, 
    enum: ['short', 'long'], 
    required: true 
    },
  videoPath: {
    type:String
  },
  videoURL: {
    type:String
  },
  price: { 
    type: Number, 
    default: 0 
    },
  creator: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
    },
  createdAt: {
     type: Date, 
     default: Date.now 
    },
});

const video = mongoose.model('Video', videoSchema);
export default video;