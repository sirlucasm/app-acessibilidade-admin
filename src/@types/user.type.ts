export interface LoginUser {
  email: string;
  password: string;
}

export interface User {
  uid: string;
  name: string;
  email: string;
  password: string;
  photoURL: string;
  admin: boolean;
}
