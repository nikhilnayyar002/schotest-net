import * as express from 'express';
import { postInstruction, getInstruction, updateInstruction, getInstructionStates, getInstructionState, getInstructionByCategory } from '../controllers/instruction.controller';

let router:express.Router = express.Router();
router.post('/', postInstruction);
router.put('/', updateInstruction);
router.get('/states', getInstructionStates);
router.get('/category/:catID', getInstructionByCategory);
router.get('/:id', getInstruction);
router.get('/:id/state', getInstructionState);


export const instructionRouter = router;