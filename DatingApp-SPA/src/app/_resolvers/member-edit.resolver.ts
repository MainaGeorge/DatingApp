import {Injectable} from "@angular/core";
import {UserModel} from "../shared/models";
import {AuthenticationServiceService} from "../_services/authentication-service.service";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {UserService} from "../_services/user.service";
import {catchError} from "rxjs/operators";
import {AlertifyService} from "../_services/alertify-service";


@Injectable()
export class MemberEditResolver implements Resolve<UserModel> {

  constructor(private authService: AuthenticationServiceService,
              private userService: UserService,
              private alertifyService: AlertifyService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserModel> | Promise<UserModel> | UserModel {
    return this.userService.getUser(+this.authService.decodedToken.nameid).pipe( catchError(err => {
      this.alertifyService.errorMessage('something went wrong while loading your profile data');
      this.router.navigate(['/members'])
      return of(null);
    }))
  }
}
