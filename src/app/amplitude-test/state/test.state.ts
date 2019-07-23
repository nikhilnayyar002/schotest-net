import { Test } from '../modals/test';

export interface TestOtherState {
    /**
     * id of currently selected question
     */
    id:string;
    /**
     *  mcq-states.component used it
     */
    isTestOver:boolean;
}

export interface TestState {
    test:Test;
    testOther:TestOtherState;
}