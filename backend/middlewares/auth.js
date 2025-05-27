import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export const auth = async (req,res, next) => {

    try {
        
        const token = req?.body?.token || req?.cookies?.token || req.get("Authorization")?.replace("Bearer ", "");
        console.log("token : ",token);
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }
        try {
            const payload = jwt.verify(token,process.env.JWT_SECRET);
            console.log("payload: ",payload);
            req.user = payload;
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"Invaild token."
            })
        } 
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success:false,
            message:"Error in validating token"
        })
    }
}



