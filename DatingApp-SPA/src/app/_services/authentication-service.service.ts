import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginModel, RegisterData, UserModel} from "../shared/models";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  private baseUrl = 'https://localhost:44337/api/authentication/'
  constructor(private http: HttpClient) { }

  login(loginData: LoginModel){
    return this.http.post<{token: string}>(this.baseUrl + 'login', loginData)
      .pipe(map( response => {
        if(response){
          localStorage.setItem('token', response.token);
        }
      } ));
  }

  register(registerData: RegisterData){
  return this.http.post<UserModel>(this.baseUrl + 'register', registerData);
  }

  logout(){
    localStorage.removeItem('token');
    console.log('logging out');
  }

  isLoggedIn(){
    return !!localStorage.getItem('token') ;
  }
}
