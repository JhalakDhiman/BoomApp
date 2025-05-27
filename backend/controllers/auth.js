import User from '../models/user.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("Email and password are:", email, password);
  
     if (!email || !password ) {
        return res.status(403).json({
          success: false,
          message: "All fields are required (email, password, OTP)",
        });
      }
  
       const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User is not registered. Please sign up first.",
        });
      }
  
    
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Incorrect password",
        });
      }

      const payload = {
        email: user.email,
        id: user._id,
        accountType:user.accountType,
      };
  
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "365d",
      });
  
      user.token = token;
      user.password = undefined; 
      
      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      });
  
      return res.status(200).json({
        success: true,
        token,
        user,
        message: "User logged in successfully",
      });
  
    } catch (error) {
      console.error("Error occurred while logging in:", error);
      return res.status(500).json({
        success: false,
        message: "Login failed. Please try again later.",
      });
    }
  };


  export const signup = async (req,res)=>{
    try{

        const{
            email,
            password,
            confirmPassword,
        } = req.body;

       if(!email || !password || !confirmPassword){
            return res.status(403).json({
                success:false,
                message:"Please fill all the fields",
            })
        }

        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"passwords doesn't match",
            })
        }

        const userPresent = await User.findOne({email});
        if(userPresent){
            return res.status(400).json({
                success:false,
                message:"user already exists, please login ",
            });
        }

        const hashedPassword =await bcrypt.hash(password,10);

        const userData = await User.create({
            email,
            password:hashedPassword,
        });

        return res.status(200).json({
            success:true,
            userData,
            message:"user registered successfully",
        })

    } catch(error){
        console.log("Error while signup : ",error);
        return res.status(500).json({
            success:false,
            message:"error while signup",
        })
    }
} 