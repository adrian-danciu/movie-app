export interface IUser {
  id?: string;
  uid?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  favorites: string[];
}
