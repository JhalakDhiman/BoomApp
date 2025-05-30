import React from 'react'
import SignupForm from './SignupForm';
import LoginForm from './LoginForm'
import frame from '../../../assets/Images/frame.png';

const Template = ({heading,description1,description2,image,formType}) => {

    console.log("in template")
  return (
    <div className="flex mt-20 items-center lg:flex-row md:flex-row flex-col max-w-[1160px] w-11/12 py-12 mx-auto gap-x-10 justify-between gap-y-0">

       {/* left container */}

       <div className="lg:w-[40%] w-full">
            <div>
             <h2 className="text-white font-semibold text-[1.875rem] leading-[2.375rem]">{heading}</h2>
            </div>

            <div className="text-[1.125rem] leading-[1.625rem] mt-4">
                <p className="text-blue-100">{description1}</p>
                <p className="text-blue-300 italic">{description2}</p>
            </div>

        
                {
                    formType==="signup"?
                    (<SignupForm/>):
                    (<LoginForm/>)
                }
       </div>

       {/* right container */}

       <div className="relative invisible md:visible lg:visible lg:w-[40%] w-full">
        <img src={image} width={558} height={490} className="absolute -top-4  right-4"></img>
        <img src={frame} width={558} height={504} ></img>
       </div>



      
    </div>
  )
}

export default Template

