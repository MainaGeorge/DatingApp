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
  photos: Photo[]
}

export interface Photo {
  id: number,
  url: string,
  description: string,
  isMain: boolean,
  dateAdded: Date
}

export interface Pagination {
  totalPages: number,
  totalItems: number,
  currentPage: number,
  itemsPerPage: number
}

export class PaginatedResult<T>{
  result: T;
  pagination: Pagination;

  constructor(result: T, pagination?: Pagination) {
    this.result = result;
    this.pagination = pagination;
  }
}
