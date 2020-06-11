import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {PaginatedResult, UserModel} from '../shared/models';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {
baseUrl = environment.apiUrl;
changePhoto = new Subject<string>()
  constructor(private http: HttpClient) { }

  getUsers(size?, page?): Observable<PaginatedResult<UserModel[]>>{
    const paginatedResult = new PaginatedResult<UserModel[]>();
    let params = new HttpParams();
    if(size != null){
      params = params.append('pageSize', size)
    }
    if(page != null){
      params = params.append('pageNumber', page)
    }
    return this.http.get<PaginatedResult<UserModel[]>>(`${this.baseUrl}users`, {
      observe: 'response',
      params : params
    }).pipe( map(response => {
      paginatedResult.result = response.body;
      if(response.headers.get('Pagination') != null){
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    }));
  }

  getUser(id: number): Observable<UserModel>{
    return this.http.get<UserModel>(`${this.baseUrl}users/${id}`);
  }

  updateUser(id: number, userModel: UserService){
    return this.http.put(`${this.baseUrl}users/${id}`, userModel);
  }

  updateProfilePhoto(userId: number, photoId: number){
    return this.http.post(`${this.baseUrl}users/${userId}/photos/${photoId}/setMainPhoto`, {});
  }

  deletePhoto(userId:number, photoId: number){
    return this.http.delete(`${this.baseUrl}users/${userId}/photos/${photoId}`);
  }
}
