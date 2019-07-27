import { UserTest } from '../amplitude-test/modals/test';

export interface UserBase {
    fullName: string;
    email: string;
  }

export interface UserProfile extends UserBase {
    id: string;
}

export interface UserFeatures {
    favourites: string[];
    tests: { [index: string]: UserTest };
}
  