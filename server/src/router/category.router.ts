import * as express from 'express';
import { getCategories, postCategory, getCategory, updateCategory, getCategoryStates, delCategory } from '../controllers/category.controller';
import { checkAdminRoute } from '../config/global';

let router:express.Router = express.Router();

router.post('/', checkAdminRoute, postCategory); /** an admin route */
router.put('/', checkAdminRoute, updateCategory); /** an admin route */
router.get('/', getCategories);
router.get('/states', getCategoryStates);
router.get('/:categoryID', getCategory);
router.delete('/:categoryID', checkAdminRoute, delCategory); /** an admin route */

export const CategoryRouter = router;