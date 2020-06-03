import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginModel} from "../shared/models";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  private baseUrl = 'https://localhost:44337/api/'
  constructor(private http: HttpClient) { }

  login(loginData: LoginModel){
    return this.http.post<{token: string}>(this.baseUrl + 'authentication/login', loginData)
      .pipe(map( response => {
        if(response){
          localStorage.setItem('token', response.token);
        }
      } ));
  }

  logout(){
    localStorage.removeItem('token');
  }

  isLoggedIn(){
    return !!localStorage.getItem('token') ;
  }
}
