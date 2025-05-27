
import Comment from '../models/comments.js'

export const postComment = async (req, res) => {
    try {
      console.log("hi");
      console.log(req.body.text);
      console.log(req.params.videoId);
      const comment = new Comment({
        video: req.params.videoId,
        user: req.user.id,
        text: req.body.text,
      });
      await comment.save();
      return res.status(201).json({ message: 'Comment added' });
    } catch {
      return res.status(500).json({ message: 'Failed to post comment' });
    }
}

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ video: req.params.videoId })
      .populate('user') // includes only username from the user
      .sort({ createdAt: -1 });     // sort by newest first

    return res.status(200).json({ comments });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch comments' });
  }
}