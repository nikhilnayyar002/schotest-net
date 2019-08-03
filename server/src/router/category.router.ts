import * as express from 'express';
import { getCategories, postCategory, getCategoryTests, getCategory, updateCategory } from '../controllers/category.controller';

let router:express.Router = express.Router();
router.post('/', postCategory);
router.put('/', updateCategory);
router.get('/', getCategories);
router.get('/:categoryID', getCategory);
router.get('/:categoryID/tests', getCategoryTests);

export const CategoryRouter = router;