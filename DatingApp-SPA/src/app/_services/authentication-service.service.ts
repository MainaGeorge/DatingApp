import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginModel, RegisterData, UserModel} from "../shared/models";
import {map} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  private baseUrl = environment.apiUrl + 'authentication/'
  private jwtHelperService = new JwtHelperService();
  decodedToken: {exp: number, iat: number, unique_name: string, nameid:string, nbf: number};

  constructor(private http: HttpClient) { }

  login(loginData: LoginModel){
    return this.http.post<{token: string}>(this.baseUrl + 'login', loginData)
      .pipe(map( response => {
        if(response){
          localStorage.setItem('token', response.token);
          this.decodedToken = this.jwtHelperService.decodeToken(response.token)
        }
      } ));
  }

  register(user: UserModel){
  return this.http.post<UserModel>(this.baseUrl + 'register', user);
  }

  logout(){
    localStorage.removeItem('token');
  }

  isLoggedIn(){
    const token = localStorage.getItem('token') ;
    return !this.jwtHelperService.isTokenExpired(token)
  }
}
