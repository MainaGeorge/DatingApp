import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginModel, RegisterData, UserModel} from "../shared/models";
import {map} from "rxjs/operators";
import {AlertifyService} from "./alertify-service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  private baseUrl = 'https://localhost:44337/api/authentication/';
  private jwtHelperService = new JwtHelperService();
  decodedToken: {exp: number, iat: number, unique_name: string, nameid:string, nbf: number};

  constructor(private http: HttpClient,
              private alertifyService: AlertifyService) { }

  login(loginData: LoginModel){
    return this.http.post<{token: string}>(this.baseUrl + 'login', loginData)
      .pipe(map( response => {
        if(response){
          localStorage.setItem('token', response.token);
          this.decodedToken = this.jwtHelperService.decodeToken(response.token)
          console.log(this.decodedToken);
        }
      } ));
  }

  register(registerData: RegisterData){
  return this.http.post<UserModel>(this.baseUrl + 'register', registerData);
  }

  logout(){
    localStorage.removeItem('token');
    this.alertifyService.message('logging out');
  }

  isLoggedIn(){
    const token = localStorage.getItem('token') ;
    return !this.jwtHelperService.isTokenExpired(token)
  }
}
