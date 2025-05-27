import { Router } from "express";
import {auth} from '../middlewares/auth.js'
import { getComments, postComment } from "../controllers/comment.js";

const router = Router();

router.post('/postComment/:videoId',auth,postComment);
router.get('/getComments/:videoId',auth,getComments);

export default router;