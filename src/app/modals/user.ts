import { UserTest } from "../amplitude-test/modals/test";

export interface UserFeatures {
  isAdmin:boolean;
  favourites: string[];
  tests?: { [index: string]: UserTest };
}

export interface UserBase {
  fullName: string;
  email: string;
}

export interface UserProfile extends UserBase, UserFeatures {
  id: string;
}
