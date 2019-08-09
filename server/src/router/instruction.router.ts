import * as express from 'express';
import { postInstruction, getInstruction, updateInstruction, getInstructionStates } from '../controllers/instruction.controller';

let router:express.Router = express.Router();
router.post('/', postInstruction);
router.get('/states', getInstructionStates);
router.get('/:id', getInstruction);
router.put('/:id', updateInstruction);


export const instructionRouter = router;