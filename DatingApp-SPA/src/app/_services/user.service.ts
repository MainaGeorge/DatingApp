import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserModel} from "../shared/models";
import {Observable} from "rxjs";


const httpOptions = {
  headers : new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};


@Injectable({
  providedIn: 'root'
})

export class UserService {
baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getUsers(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(this.baseUrl + 'users', httpOptions);
  }

  getUser(id: number): Observable<UserModel>{
    return this.http.get<UserModel>(this.baseUrl + 'users' + id, httpOptions);
  }
}
