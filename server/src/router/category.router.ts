import * as express from 'express';
import { getCategories, postCategory, getCategory, updateCategory, getCategoryStates, delCategory } from '../controllers/category.controller';

let router:express.Router = express.Router();
router.post('/', postCategory);
router.put('/', updateCategory);
router.get('/', getCategories);
router.get('/states', getCategoryStates);
router.get('/:categoryID', getCategory);
router.delete('/:categoryID', delCategory);

export const CategoryRouter = router;