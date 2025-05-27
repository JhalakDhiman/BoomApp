import React, { useContext, useState } from 'react'
import Logo from '../../assets/Images/boomlogo.svg'
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { NavbarLinks } from '../../data/navbar-links';
import People from '../../assets/Images/people.png'

const Navbar = () => {

  const { user } = useContext(AuthContext);
  const [clickedTab, setClickedTab] = useState("Home");

  return (
    <div className='w-full h-16 flex justify-between p-4 px-5 items-center bg-richblack-900 border-b-[1px] border-richblack-700'>

      <div className='h-12 flex items-center'>
        <img className='w-12 h-12' src={Logo}/>
      </div>

      <div>
        <ul className='flex gap-10'>
          {
            NavbarLinks.map((link, index) => (
              <li key={index}
                onClick={()=>{
                  setClickedTab(link.title);
                }}
               className={`text-richblack-25 cursor-pointer hover:text-yellow-50 ${clickedTab==link.title?"text-yellow-50":""}`} >
                <Link to={link.path}>
                  {link.title}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>

      <div>
        {
        !user ? 
        (
          <div className='flex gap-5'>
          <Link to='/login'>
            <button className='text-richblack-5 bg-richblack-800 border-richblack-500 border-[1px] p-2 rounded-md hover:bg-richblack-700'>
              Login
            </button>
          </Link>
          <Link to='/signup'>
            <button className='text-richblack-5 bg-richblack-800 border-richblack-500 border-[1px] p-2 rounded-md hover:bg-richblack-700'>
              Signup
            </button>
          </Link>
        </div>
        ):(
          <div>
                    <img
                        src={People}
                        className="aspect-square w-[40px] rounded-full object-cover"
                    />
          </div>
        )
        }
      </div>

    </div>
  )
}

export default Navbar
