export interface LoginModel {
  username: string,
  password: string
}

export interface RegisterData {
  username: string,
  password: string,
  email: string
}


export interface UserModel {
  PasswordHash: ArrayBuffer,
  PasswordSalt: ArrayBuffer,
  Username: string,
  Id: number,
  Email: string
}
