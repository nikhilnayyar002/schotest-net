
import * as express from 'express';
import * as userCtl from '../controllers/user.controller';
import { verifyJwtToken, rtnDecryptReqHandler } from '../config/global';

import {globalEnvironment} from "../../../config/global.config";
let config: globalEnvironment = require("../../../config/config.json");

let router:express.Router = express.Router();

router.post('/authenticate', rtnDecryptReqHandler(config.passwordSecret), userCtl.authenticate);
router.get('/userProfile',verifyJwtToken, userCtl.userProfile);
router.post('/register', rtnDecryptReqHandler(config.passwordSecret), userCtl.register);

export let UserRouter = router;