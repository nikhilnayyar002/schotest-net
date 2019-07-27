import { AppState } from '../state/app.state';
import { TestWithFeatures } from '../amplitude-test/modals/test';
import { TestOtherState } from '../amplitude-test/state/test.state';

export interface GLobalState {
    app:AppState;
    test:TestWithFeatures;
    testOther:TestOtherState;
}

