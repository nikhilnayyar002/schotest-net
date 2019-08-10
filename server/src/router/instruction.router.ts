import * as express from 'express';
import { postInstruction, getInstruction, updateInstruction, getInstructionStates, getInstructionState } from '../controllers/instruction.controller';

let router:express.Router = express.Router();
router.post('/', postInstruction);
router.get('/states', getInstructionStates);
router.get('/:id', getInstruction);
router.put('/:id', updateInstruction);
router.get('/:id/state', getInstructionState);


export const instructionRouter = router;