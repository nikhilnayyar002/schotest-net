import * as express from 'express';
import { postImage, getImage, delImage } from '../controllers/image.controller';
import { imageUpload} from '../config/global';


let router:express.Router = express.Router();


router.get('/:id',getImage);
router.delete('/:id',delImage);
router.post('/:id',
    // First middleware, validate number of files (one file) / size (5MB) / extension ('jpg', 'png', 'jpeg')
    imageUpload, 
    postImage
);


export const imageRouter = router;