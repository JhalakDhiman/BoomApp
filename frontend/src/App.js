import React, { useContext } from 'react';
import {Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
import { AuthContext } from './context/AuthContext';
import Signup from './pages/Signup';
import Login from './pages/Login'
import Upload from './pages/Upload'
import Feed from './pages/Feed';
import Player from './pages/Player';
import Navbar from './components/common/Navbar';
import PrivateRoute from './components/common/PrivateRoute';
// import Navbar from './components/common/Navbar';

function App() {

  return (
    <div className='bg-richblack-900 h-[100vh] w-[100vw] overflow-x-hidden'>
      <Navbar/>
      <Routes>
        
        <Route path="/" element={
          <PrivateRoute>
            <Feed />
          </PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/upload-video' element={
          <PrivateRoute>
            <Upload/>
          </PrivateRoute>
        }/>
        <Route path='/watch/:videoId' element={
          <PrivateRoute>
            <Player/>
          </PrivateRoute>
        }/>
      </Routes>
    </div>
  );
}

export default App;