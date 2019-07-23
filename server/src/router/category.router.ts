import * as express from 'express';
import { getCategories, postCategory, getCategoryTests, getCategory } from '../controllers/categories.controller';

let router:express.Router = express.Router();
router.post('/', postCategory);
router.get('/', getCategories);
router.get('/:categoryID', getCategory);
router.get('/:categoryID/tests', getCategoryTests);

export const CategoryRouter = router;