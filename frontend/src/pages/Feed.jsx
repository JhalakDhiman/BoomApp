import React, { useEffect, useState, useRef, useContext } from 'react';
import { getFeed, purchaseVideo } from '../services/operations/videoApis';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { TypeAnimation } from 'react-type-animation'
import Video from '../assets/Images/video.jpg'

const Feed = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  useEffect(() => {
    loadFeed(page);
  }, [page]);

  const loadFeed = async (pg) => {
    try {

      if (token) {
        const res = await getFeed(pg, token);
        if (res.data.length < 10) setHasMore(false);
        setVideos((prev) => [...prev, ...res.data]);
      }
    } catch {
      alert('Failed to load feed');
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (loader.current) observer.observe(loader.current);
    return () => loader.current && observer.unobserve(loader.current);
  }, [hasMore]);

  const handleWatch = (video) => {
    navigate(`/watch/${video._id}`);
  };

  const handlePurchase = async (video) => {
    try {
      const res = await purchaseVideo(video._id, token);
      alert(res.data.message);
      handleWatch(video);
    } catch (err) {
      alert(err.response?.data?.message || 'Purchase failed');
    }
  };

  return (
    <div>
      {
        token ? (
          <div>
          <div className='flex justify-center'>
          <TypeAnimation
              sequence={[
                'Boom Feed', 3000, ""
              ]}
              style={{ display: 'inline-block', fontSize: '30px' ,fontStyle:'italic'}}
              repeat={Infinity}
              omitDeletionAnimation={true}
              className='text-blue-50'
            />
          </div>
            {videos.map((video) => (
              <div key={video._id} className='m-3 p-3 border-b-[1px] border-richblack-500 rounded-lg flex' >
                <div className='w-1/2 flex justify-center'>
                  {video.videoType === 'short' ? (
                    <video src={`http://localhost:4000/${video.videoPath}`} controls muted autoPlay loop width="300" />
                  ) : (
                    <img src={Video} width="300" alt="Long Video" />
                  )}
                </div>
                <div className='w-1/2 flex flex-col justify-center gap-3'>
                  <h4 className='text-richblack-100 text-2xl'>Video Title : {video.title}</h4>
                  <p className='text-xl text-richblack-5'>By <span className='text-blue-100 italic'>{video.creator.email}</span></p>
                  {video.videoType === 'long' ? (
                    video.price > 0 ? (
                      <button
                        className='bg-blue-200 w-fit text-black
                                    px-4 py-3 rounded-md font-bold hover:scale-95 transition-all duration-300
                                    border-b-[1px] border-r-[1px] border-richblack-500'
                        onClick={() => handlePurchase(video)}>Buy for ₹{video.price}</button>
                    ) : (
                      <button
                        className='bg-blue-200 w-fit text-black
                                    px-4 py-3 rounded-md font-bold hover:scale-95 transition-all duration-300
                                    border-b-[1px] border-r-[1px] border-richblack-500'
                        onClick={() => handleWatch(video)}>Watch</button>
                    )
                  ) : (
                    <button
                      className='bg-blue-200 w-fit text-black
                                    px-4 py-3 rounded-md font-bold hover:scale-95 transition-all duration-300
                                    border-b-[1px] border-r-[1px] border-richblack-500' onClick={() => handleWatch(video)}>Watch</button>
                  )}
                </div>
              </div>
            ))}
            {hasMore && <div ref={loader}>Loading more...</div>}
          </div>
        ) : (
          <div className='text-3xl text-richblack-5 italic w-full h-[80vh] flex flex-col justify-center items-center'>
            <TypeAnimation
              sequence={[
                'Sorry , You are not logged in.', 3000, ""
              ]}
              style={{ display: 'inline-block', fontSize: '26px', fontStyle: "italic" }}
              repeat={Infinity}
              omitDeletionAnimation={true}
              className='text-yellow-50'
            />
            <div></div>
            <br></br>
            <p className='text-[26px] text-yellow-50'>We are not allowed to show data to unauthenticate users</p>
          </div>
        )
      }
    </div>
  );
};

export default Feed;