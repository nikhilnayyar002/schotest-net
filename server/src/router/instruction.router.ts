import * as express from 'express';
import { postInstruction, getInstruction, updateInstruction, getInstructionStates, getInstructionByCategory, delInstruction } from '../controllers/instruction.controller';
import { checkAdminRoute } from '../config/global';

let router:express.Router = express.Router();
router.post('/', checkAdminRoute, postInstruction); /** an admin route */
router.put('/', checkAdminRoute, updateInstruction); /** an admin route */
router.get('/states', getInstructionStates);
router.get('/category/:catID', getInstructionByCategory);
router.get('/:id', getInstruction);
router.delete('/:id', checkAdminRoute, delInstruction); /** an admin route */

export const instructionRouter = router;