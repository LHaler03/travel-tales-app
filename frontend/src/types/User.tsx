export interface RegisteredUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface LoggedUser {
  username: string;
  password: string;
}
