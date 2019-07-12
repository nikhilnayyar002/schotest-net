import { AppState } from '../state/app.state';
import { Test } from '../amplitude-test/modals/test';
import { TestOtherState } from '../amplitude-test/state/test.state';

export interface GLobalState {
    app:AppState;
    test:Test;
    testOther:TestOtherState;
}

