import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginModel, RegisterData, UserModel} from "../shared/models";
import {map} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";
import {environment} from "../../environments/environment";
import {UserService} from './user.service';
import {AlertifyService} from './alertify-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  private baseUrl = environment.apiUrl + 'authentication/'
  private jwtHelperService = new JwtHelperService();
  decodedToken: {exp: number, iat: number, unique_name: string, nameid:string, nbf: number};

  constructor(private http: HttpClient,
              private userService: UserService,
              private alertifyService: AlertifyService) { }

  login(loginData: LoginModel){
    return this.http.post<{token: string}>(this.baseUrl + 'login', loginData)
      .pipe(map( response => {
        if(response){
          localStorage.setItem('token', response.token);
          this.decodedToken = this.jwtHelperService.decodeToken(response.token)
          this.userService.getUser(+this.decodedToken.nameid).subscribe( user => {
            localStorage.setItem('user', JSON.stringify(user));
            },
            error => {
            this.alertifyService.errorMessage(error);
            });
        }
      } ));
  }

  register(user: UserModel){
  return this.http.post<UserModel>(this.baseUrl + 'register', user);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn(){
    const token = localStorage.getItem('token') ;
    return !this.jwtHelperService.isTokenExpired(token)
  }
}
