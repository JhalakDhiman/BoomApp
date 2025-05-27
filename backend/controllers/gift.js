import User from '../models/user.js'
import Video from '../models/video.js'
import Gift from '../models/gift.js'

export const createGift = async (req, res) => {
    const amount = req.body.amount;
    try {
      const video = await Video.findById(req.params.videoId).populate('creator');
      const user = await User.findById(req.user.id);
  
      if (!video || !user) return res.status(404).json({ success:false,message: 'Invalid video or user' });
      if (user.wallet < amount) return res.status(400).json({ success:false,message: 'Insufficient balance' });
  
      user.wallet -= amount;
      await user.save();
  
      const gift = new Gift({ from: user._id, to: video.creator._id, video: video._id, amount });
      await gift.save();
  
      return res.status(200).json({ success:true,message: 'Gift sent!' });
    } catch {
      return res.status(500).json({success:false, message: 'Gift failed' });
    }
  }  