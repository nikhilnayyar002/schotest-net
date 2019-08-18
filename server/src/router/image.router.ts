import * as express from 'express';
import { postImage, delImage } from '../controllers/image.controller';
import { imageUpload} from '../config/global';
import { checkAdminRoute } from '../config/global';

let router:express.Router = express.Router();

router.delete('/:id', checkAdminRoute, delImage); /** an admin route */
router.post('/:id', /** an admin route */
    checkAdminRoute,
    // First middleware, validate number of files (one file) / size (5MB) / extension ('jpg', 'png', 'jpeg')
    imageUpload, 
    postImage
);


export const imageRouter = router;