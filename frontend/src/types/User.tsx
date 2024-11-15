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

export type UserType = {
  username: string;
  email?: string;
  picture?: string;
};

export interface LoginResponse {
  username: string;
  email: string;
  token: string;
}

export interface User {
  username: string;
  email: string;
}
