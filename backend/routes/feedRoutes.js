import { Router } from "express";
import {auth} from '../middlewares/auth.js'
import { getFeed } from "../controllers/video.js";

const router = Router();

router.get('/getFeed',auth,getFeed);

export default router;