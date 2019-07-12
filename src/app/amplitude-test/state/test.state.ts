import { Test } from '../modals/test';

export interface TestOtherState {
    index:number;
    /**
     *  mcq-states.component used it
     */
    isTestOver:boolean;
}

export interface TestState {
    test:Test;
    testOther:TestOtherState;
}