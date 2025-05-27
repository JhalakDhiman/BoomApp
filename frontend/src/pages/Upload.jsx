import React, { useContext, useState } from 'react';
import { uploadVideo } from '../services/operations/videoApis';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Upload = () => {
  const [formData, setFormData] = useState({
    title: '', description: '', videoType: 'short', videoURL: '', price: 0,
  });
  const [videoFile, setVideoFile] = useState(null);
  const { token } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (typeof value === 'object' && value !== null && !(value instanceof File)) {
        data.append(key, JSON.stringify(value));
      } else {
        data.append(key, value);
      }
    });

    if (formData.videoType === 'short' && videoFile) {
      data.append('videoFile', videoFile);
    }

    try {
      const res = await uploadVideo(data, token);
      toast.success(res?.data?.message || 'Upload successful');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div className='flex justify-center'>
      <form onSubmit={handleSubmit} className="flex flex-col w-[40%] gap-y-4 mt-6 text-white">

        {/* Title */}
        <label className="w-full">
          <p className="text-[0.875rem] leading-[1.375rem] mb-2 opacity-70">
            Title <sup className="text-red-500">*</sup>
          </p>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            required
            className="bg-[#161d29] text-white w-full p-[12px] rounded-md border-b border-gray-300"
          />
        </label>

        {/* Description */}
        <label className="w-full">
          <p className="text-[0.875rem] leading-[1.375rem] mb-2 opacity-70">
            Description <sup className="text-red-500">*</sup>
          </p>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            required
            className="bg-[#161d29] text-white w-full p-[12px] rounded-md border-b border-gray-300"
          />
        </label>

        {/* Video Type */}
        <label className="w-full">
          <p className="text-[0.875rem] leading-[1.375rem] mb-2 opacity-70">
            Video Type <sup className="text-red-500">*</sup>
          </p>
          <select
            name="videoType"
            value={formData.videoType}
            onChange={handleChange}
            required
            className="bg-[#161d29] text-white w-full p-[12px] rounded-md border-b border-gray-300"
          >
            <option value="short">Short-Form</option>
            <option value="long">Long-Form</option>
          </select>
        </label>

        {/* Short-form Video Upload */}
        {formData.videoType === 'short' && (
          <label className="w-full">
            <p className="text-[0.875rem] leading-[1.375rem] mb-2 opacity-70">
              Upload Video <sup className="text-red-500">*</sup>
            </p>
            <input
              type="file"
              accept="video/mp4"
              onChange={(e) => setVideoFile(e.target.files[0])}
              required
              className="bg-[#161d29] text-white w-full p-[12px] rounded-md border-b border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-200 file:text-black"
            />
          </label>
        )}

        {/* Long-form Video URL and Price */}
        {formData.videoType === 'long' && (
          <>
            <label className="w-full">
              <p className="text-[0.875rem] leading-[1.375rem] mb-2 opacity-70">
                Video URL <sup className="text-red-500">*</sup>
              </p>
              <input
                name="videoURL"
                value={formData.videoURL}
                onChange={handleChange}
                placeholder="Enter YouTube/Vimeo link"
                required
                className="bg-[#161d29] text-white w-full p-[12px] rounded-md border-b border-gray-300"
              />
            </label>

            <label className="w-full">
              <p className="text-[0.875rem] leading-[1.375rem] mb-2 opacity-70">
                Price (₹)
              </p>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="bg-[#161d29] text-white w-full p-[12px] rounded-md border-b border-gray-300"
              />
            </label>
          </>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-yellow-200 rounded-md mt-6 font-medium text-[#000814] px-[12px] py-[10px] w-full"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;
