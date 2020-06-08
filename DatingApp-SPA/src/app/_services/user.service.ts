import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserModel} from '../shared/models';
import {Observable} from 'rxjs';
import {AuthenticationServiceService} from './authentication-service.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
baseUrl = environment.apiUrl;
  constructor(private http: HttpClient,
              private authService: AuthenticationServiceService) { }


  getUsers(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(`${this.baseUrl}users`);
  }

  getUser(id: number): Observable<UserModel>{
    return this.http.get<UserModel>(`${this.baseUrl}users/${id}`);
  }

  updateUser(id: number, userModel: UserService){
    return this.http.put(`${this.baseUrl}users/${id}`, userModel);
  }

  updateProfilePhoto(photoId: number){
    return this.http.post(`${this.baseUrl}users/${this.authService.decodedToken.nameid}/photos/${photoId}/setMainPhoto`, {})
  }
}
