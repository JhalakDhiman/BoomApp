import React from 'react'
import Template from '../components/core/Auth/Template'
import login from '../assets/Images/login.webp'

const Login = () => {
  return (
    <div className="w-full">
      <Template
        heading="Login Now"
        description1=""
        description2="Welcome back"
        image={login}
        formType="login"
      />
    </div>
  )
}

export default Login
