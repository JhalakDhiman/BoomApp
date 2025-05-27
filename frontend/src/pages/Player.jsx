import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getVideoWithComments } from '../services/operations/videoApis';
import { AuthContext } from '../context/AuthContext';
import { postComment, fetchComments, createGift } from '../services/operations/additionalApis';

const Player = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [hasAccess, setHasAccess] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [giftAmount, setGiftAmount] = useState('');

  const { token, user } = useContext(AuthContext)

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const res = await getVideoWithComments(videoId, token);
        setVideo(res.data.video);
        setComments(res.data.comments);
        setHasAccess(res.data.hasAccess);
      } catch (err) {
        alert('Failed to load video');
      }
    };
    loadVideo();
  }, [videoId]);

  if (!video) return <div>Loading...</div>;

  const getEmbedURL = (url) => {
    const regExp = /^.*(?:youtu.be\/|youtube.com\/(?:watch\?v=|embed\/))([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[1] ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const longUrl = video.videoType === 'short' ? "" : getEmbedURL(video.videoURL);

  const handleCommentSubmit = async () => {
    if (!newComment) return;
    try {
      await postComment(videoId, newComment, token);
      const res = await fetchComments(videoId, token);
      setComments(res.data.comments);
      setNewComment('');
    } catch (err) {
      alert('Failed to post comment');
    }
  };

  const handleGift = async () => {
    const amount = parseInt(giftAmount);
    if (!amount || amount <= 0) {
      toast.error('invalid amount');
      return;
    };
    try {
      const res = await createGift(videoId, amount, token);
      if(res.data.success){
        toast.success(res.data.message);
      }
      else{
        toast.error(res.data.message);
      }
      setGiftAmount('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gift failed');
    }
  };

  return (
    <div className='flex flex-col p-7'>
      <h2 className='text-3xl text-center text-richblack-300'>{video.title}</h2>
      <p className='text-blue-100 text-center italic'>By {video.creator.email}</p>
      <div className='text-richblack-5 flex' >

        <div className=' flex flex-col gap-3 p-3 items-center w-1/2'>
          {hasAccess ? (
            video.videoType === 'short' ? (
              <video className='shadow-[10px_-5px_50px_-5px] mt-6 shadow-blue-200' src={`http://localhost:4000/${video.videoPath}`} controls autoPlay width="600" />
            ) : (
              <iframe
                src={longUrl}
                title={video.title}
                width="600"
                height="340"
                className='shadow-[10px_-5px_50px_-5px] shadow-blue-200 mt-6'
                frameBorder="0"
                allowFullScreen
              ></iframe>
            )
          ) : (
            <p>You have not purchased access to this video.</p>
          )}
        </div>

        <div className='w-1/2 flex flex-col justify-center'>
          <div className='w-full max-w-xl mt-10'>
            <h3 className='text-lg font-semibold text-richblack-100'>Gift the Creator</h3>
            <div className='flex gap-2 mt-2'>
              <input
                type='number'
                placeholder='Amount (₹)'
                className='p-2 rounded bg-richblack-700 text-white w-32'
                value={giftAmount}
                onChange={(e) => setGiftAmount(e.target.value)}
              />
              <button onClick={handleGift} className='px-4 py-2 bg-yellow-100 rounded text-black font-bold'>
                Gift
              </button>
            </div>
          </div>

          <div className='w-full max-w-xl mt-10'>
            <h3 className='text-lg font-semibold text-richblack-100'>Comments</h3>
            <div className='flex gap-2 mt-2'>
              <input
                type='text'
                placeholder='Add a comment...'
                className='flex-grow p-2 rounded bg-richblack-700 text-white'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button onClick={handleCommentSubmit} className='px-4 py-2 bg-yellow-100 rounded text-black font-bold'>
                Post
              </button>
            </div>
            <div className='mt-4'>
              {comments.map((c) => (
                <div key={c._id} className='border-b border-richblack-600 py-2'>
                  <p><strong>{c.user.email} </strong>: {c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Player;