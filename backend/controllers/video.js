import Video from '../models/video.js'
import User from '../models/user.js'
import Comment from '../models/comments.js'

export const uploadVideo = async (req, res) => {
  console.log(req.body);
  const { title, description, videoType, videoURL, price } = req.body;
  const userId = req.user.id;
  try {
    console.log("hi here is the request")
    const newVideo = new Video({
      title,
      description,
      videoType,
      videoPath: videoType === 'short' ? req.file.path : null,
      videoURL: videoType === 'long' ? videoURL : null,
      price: videoType === 'long' ? price : 0,
      creator: userId,
    });
    await newVideo.save();
    return res.status(201).json({ message: 'Video uploaded successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Upload failed' });
  }
}

export const getFeed = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const videos = await Video.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('creator');

    return res.status(200).json(videos);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch feed' });
  }
}

export const purchaseVideo =  async (req, res) => {
  const userId = req.user.id;
  const videoId = req.params.videoId;

  try {
    const user = await User.findById(userId);
    const video = await Video.findById(videoId);

    if (!user || !video) return res.status(404).json({ message: 'User or Video not found' });
    if (video.videoType !== 'long' || video.price <= 0) return res.status(400).json({ message: 'Invalid video for purchase' });

    if (user.wallet < video.price) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Check if already purchased
    if (user.purchasedVideos.includes(videoId)) {
      return res.status(400).json({ message: 'Already purchased' });
    }

    user.wallet -= video.price;
    user.purchasedVideos.push(videoId);
    await user.save();

    return res.status(200).json({ message: 'Purchase successful' });
  } catch (err) {
    return res.status(500).json({ message: 'Purchase failed' });
  }
}


export const getVideo =  async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId).populate('creator');
    const comments = await Comment.find({ video: video._id }).populate('user').sort({ createdAt: -1 });
    const user = await User.findById(req.user.id);
    const hasAccess = video.videoType === 'short' || video.price === 0 || user.purchasedVideos.includes(video._id);
    res.status(200).json({ video, comments, hasAccess });
  } catch (err) {
    res.status(500).json({ message: 'Error loading video page' });
  }
}
