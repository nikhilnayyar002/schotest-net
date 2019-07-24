import { createAction, props } from '@ngrx/store';
import { Test } from '../modals/test';
import { Question } from '../modals/question';
import { QuestionState } from '../shared/global';

/**
 * Set the state of question. Eg: Answered, Marked etc.
 */
export const SetQuestionState = createAction(
  '[Question] State',
  props<{state:QuestionState, id:string}>()
);

/**
 * Here we get a test given id.
 * For dev purpose the id is simple as number
 */
export const GetTest = createAction(
    '[Test] Get',
    props<{id:string}>()
);

/**
 * Here we set the state of Test.
 * We actually fetched the test from main service and used effect to dispatch
 * this action.
 */
export const SetTest = createAction(
  '[Test] Set',
  props<{test:Test}>()
);

/**
 * Actions for currently selected question index
 */
export const SetIndex = createAction(
  '[Index] Set',
  props<{id:string}>()
);

/**
 * set the question in backend. For eg. updating options
 */
export const UpdateQuestion =createAction(
  '[Question] Update',
  props<{question:Question}>()
)

/**
 * set the questionState in store.
 */
export const SetQuestion =createAction(
  '[Question] Set',
  props<{question:Question}>()
)

export const TestOver =createAction(
  '[Test] Over'
)

/**
 * Clear your answer will also
 * should also make changes in backend 
 */
export const ClearResponse =createAction(
  '[Question] Update Server',
  props<{question:Question}>()
)

export const PauseTest =createAction(
  '[Test] Pause',
  props<{time:number}>()
)
export const PauseTestServer =createAction(
  '[Test] Pause Server',
  props<{time:number}>()
)


/** *************************************** Error Actions ******************** */

// export const GetError = createAction(
//   '[Error] Get'
// );

