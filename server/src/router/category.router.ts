import * as express from 'express';
import { getCategories, postCategory, getCategory, updateCategory, getCategoryStates } from '../controllers/category.controller';

let router:express.Router = express.Router();
router.post('/', postCategory);
router.put('/', updateCategory);
router.get('/', getCategories);
router.get('/states', getCategoryStates);
router.get('/:categoryID', getCategory);

export const CategoryRouter = router;