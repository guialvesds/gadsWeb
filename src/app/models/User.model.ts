export interface User {
  id: number;
  primary_name: string,
  second_name: string,
  email: string,
  password: string,
  access_token?: string,
}
