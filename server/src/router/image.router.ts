import * as express from 'express';
import * as multer from 'multer';


const storage = multer.diskStorage({

    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
       }
    });
const upload = multer({ storage: storage }).single('avatar');

let router:express.Router = express.Router();

router.post('/upload', function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            // An error occurred when uploading
            throw err;
        }
        res.json({
            sucess: true,
            message: 'Image was uploaded successfully'
        });
        // Everything went fine
      })
});


export const imageRouter = router;