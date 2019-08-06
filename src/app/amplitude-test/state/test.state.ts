import { TestWithFeatures, TestWithFeaturesForUser } from '../modals/test';

export interface TestOtherState {
    /**
     * id of currently selected question
     */
    id:string;
    /**
     *  mcq-states.component used it
     */
    isTestOver:boolean;
    /**
     *  used for showing status like spinner. When it is true spinner is shown instead of
     *  submit button in "submit modal". If error occurs it is set to false. To disable the spinner.
     *  Yeah! it is not something cool. 
     */
    submittingTest?:boolean;
}

export interface TestState {
    test:TestWithFeaturesForUser;
    testOther:TestOtherState;
}