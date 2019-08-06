import { AppState } from '../state/app.state';
import { TestState } from '../amplitude-test/state/test.state';

export interface GLobalState extends TestState {
    app:AppState;
}

