import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Message, PaginatedResult, Pagination, UserModel} from '../shared/models';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  baseUrl = environment.apiUrl;
  changePhoto = new Subject<string>()
  constructor(private http: HttpClient) { }

  getUsers(size?, page?, userParams?, likers?): Observable<PaginatedResult<UserModel[]>>{
    let paginatedResult : PaginatedResult<UserModel[]>;
    let params = new HttpParams();

    if(page != null && size != null){
      params = params.append('pageNumber', page);
      params = params.append('pageSize', size);
    }
    if(userParams != null){
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }

    if(likers === 'Likers'){
      params = params.append('likers', 'true')
    }

    if(likers === 'Likees'){
      params = params.append('likees', 'true');
    }

    return this.http.get<UserModel[]>(`${this.baseUrl}users`,
      {
      observe: 'response',
      params
             }
    ).pipe( map(response => {
      const users = response.body;
      let pagination: Pagination;
      if(response.headers.get('Pagination') != null){
        pagination = JSON.parse(response.headers.get('Pagination'));
      }
      paginatedResult = new PaginatedResult<UserModel[]>(users,pagination)
      return paginatedResult;
    }));
  }



  getMessages(userId, pages?, size?, messageContainer?) : Observable<PaginatedResult<Message[]>>{
    let params = new HttpParams();
    params = params.append('MessageContainer', messageContainer);

    if(pages != null && size != null){
      params = params.append('pageNumber', pages);
      params = params.append('pageSize', size);
    }

    return this.http.get<Message[]>(`${this.baseUrl}users/${userId}/messages`, {
      observe: 'response',
      params: params
    }).pipe( map(response => {
      const messages:Message[] = response.body;
      let paginationInfo: Pagination;
      if(response.headers.get('Pagination') != null){
        paginationInfo = JSON.parse(response.headers.get('Pagination'));
      }
      return new PaginatedResult<Message[]>(messages, paginationInfo)
    }));
  }

  getMessageThread(userId:number, recipientId:number){
    return this.http.get<Message[]>(`${this.baseUrl}users/${userId}/messages/thread/${recipientId}`);
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

  addLike(userId:number, recipientId:number){
    return this.http.post(`${this.baseUrl}users/${userId}/likes/${recipientId}`, {});
  }

  sendInstantMessage(userId: number, message:Message){
    return this.http.post<Message>(`${this.baseUrl}users/${userId}/messages`, message);
  }

  deleteMessage(userId:number, messageId:number){
    return this.http.post(`${this.baseUrl}users/${userId}/messages/${messageId}`, {})
  }
}
