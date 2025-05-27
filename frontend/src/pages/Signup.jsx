import React from 'react'
import Template from '../components/core/Auth/Template'
import signupImg from '../assets/Images/signup.webp'

const Signup = () => {
  return (
    <div className="w-full">
      <Template 
        heading = 'Signup Now!'
        description1 = ''
        description2 = 'you can register'
        formType = 'signup'
        image={signupImg}
        ></Template>
    </div>
  )
}

export default Signup
