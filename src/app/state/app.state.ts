
import { UserProfile } from '../modals/user';
import { Credentials } from '../shared/global';

export interface AppState {
    loggedIn?:boolean;
    user:UserProfile;
    cred?:Credentials;
}
