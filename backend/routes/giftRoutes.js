import { Router } from "express";
import {auth} from '../middlewares/auth.js'
import { createGift } from "../controllers/gift.js";

const router = Router();

router.post('/createGift/:videoId',auth,createGift);

export default router;