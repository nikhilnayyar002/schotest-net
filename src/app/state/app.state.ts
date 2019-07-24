
import { User } from '../modals/user';
import { Credentials } from '../shared/global';

export interface AppState {
    loggedIn:boolean;
    user:User;
    cred?:Credentials;
}
