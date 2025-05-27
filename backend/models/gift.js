import mongoose from 'mongoose';

const giftSchema = new mongoose.Schema({
    from:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    video:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Video', 
        required: true 
    },
    amount:{ 
        type: Number, 
        required: true 
    },
}, { timestamps: true });

export default mongoose.model('Gift', giftSchema);