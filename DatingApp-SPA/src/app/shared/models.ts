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
  username: string,
  id: number,
  age: number,
  gender: string,
  knownAs: string,
  photoUrl: string,
  created: Date,
  city: string,
  country: string,
  lastActive: Date,
  interests?: string,
  introduction?: string,
  lookingFor?: string,
  photo: Photo[]
}

export interface Photo {
  id: number,
  url: string,
  description: string,
  isMain: boolean,
  dateAdded: Date
}
