import express from "express"
import dotenv from 'dotenv'
import dbConnect from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'
import videoRoutes from './routes/videoRoutes.js'
import feedRoutes from './routes/feedRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import giftRoutes from './routes/giftRoutes.js'
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

dbConnect();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"*",
        credentials:true,
    })
)

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/video',videoRoutes);
app.use('/api/v1/feed',feedRoutes);
app.use('/api/v1/comments',commentRoutes);
app.use('/api/v1/gift',giftRoutes);

app.get('/',(req,res)=>{
    return res.json({
        success:true,
        message:"server is running........"
    })
})

app.listen(PORT,'0.0.0.0',()=>{
    console.log(`server started ${PORT}`);
})
