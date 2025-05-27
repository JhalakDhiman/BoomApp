import { Router } from "express";
import { getVideo, purchaseVideo, uploadVideo } from "../controllers/video.js";
import {auth} from '../middlewares/auth.js'
import {upload} from '../middlewares/multer.js'

const router = Router();

router.post('/uploadVideo',auth,upload.single('videoFile'),uploadVideo);
router.post('/purchaseVideo/:videoId',auth,purchaseVideo);
router.get('/getVideo/:videoId',auth,getVideo);

export default router;