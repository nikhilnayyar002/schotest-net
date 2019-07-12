import { Test } from '../modals/test';
import * as TestActions from "./state.actions";
import { createReducer, on, Action } from '@ngrx/store';
import { TestOtherState } from './test.state';
import { QuestionState, onTestNotFetched } from '../shared/global';
import { QuestionStateDB } from '../shared/indexDB';

export const initialTestState:Test = {
    name:'',
    questions:[],
    sections:[],
    time:0,
    id:0
};

const testReducer = createReducer(
    initialTestState,
    on(TestActions.SetTest,(state,action)=>(action.test)),
    on(TestActions.SetQuestionState, (state, action)=>{
        QuestionStateDB.updateData(action.state, action.index+1);
        state.questions[action.index].state=action.state
        if(action.state==QuestionState.Unvisited)
            state.questions[action.index].checkedAnswerIndex=null
        state.questions=state.questions.slice()
        return state
    }),
    on(TestActions.SetQuestion, (state,action)=> {
        /**
         * Actually the question.checkedAnswerIndex primitive property has changed
         * Anywhere this primitive property i referenced, there changes will be reflected
         * For eg: the checkbox value property in mcq component 
         */
        state.questions[action.question.id]=action.question
        return state
    }),
    on(TestActions.PauseTest, (state,action)=> {
        /**
         * Actually the question.checkedAnswerIndex primitive property has changed
         * Anywhere this primitive property i referenced, there changes will be reflected
         * For eg: the checkbox value property in mcq component 
         */
        state.time=action.time
        return state
    }),
);

export function tReducer (state:Test|undefined,action:Action) {
    return testReducer(state,action)
}

/**
 * index of currently selected question 
 */
const intialOtherState:TestOtherState={
    index:0,
    isTestOver:false
};

const otherStateReducer = createReducer(
    intialOtherState,
    on(TestActions.SetIndex,(state,action)=>({...state,index:action.index})),
    on(TestActions.TestOver,(state)=>{
        /** Note this the function name has not the usual meaning
         *  it was created for error. but is reusable for
         *  test over purpose also by sending parameter as (null, true)
         */
        onTestNotFetched(null,true);
        return {...state,isTestOver:true}
    }) 
);

export function oReducer (state:TestOtherState|undefined,action:Action) {
    return otherStateReducer(state,action)
}