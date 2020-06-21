import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Message} from '../shared/models';
import {Observable, of} from 'rxjs';
import {UserService} from '../_services/user.service';
import {AuthenticationServiceService} from '../_services/authentication-service.service';
import {catchError} from 'rxjs/operators';
import {AlertifyService} from '../_services/alertify-service';


@Injectable({providedIn: 'root'})
export class MessagesResolver implements Resolve<Message[]>{
  messageContainer: string = 'Unread';
  constructor(private userService: UserService,
              private authService: AuthenticationServiceService,
              private alertifyService: AlertifyService,
              private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Message[]> | Promise<Message[]> | Message[] {
    return this.userService.getMessages(+this.authService.decodedToken.nameid,null,null, this.messageContainer)
      .pipe( catchError(err => {
        this.alertifyService.errorMessage("something went wrong while getting the messages");
        this.router.navigate(['/members'])
        return of(null);
      }))
  }

}
