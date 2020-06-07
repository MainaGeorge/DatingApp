import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {UserModel} from "../shared/models";
import {Observable, of} from "rxjs";
import {UserService} from "../_services/user.service";
import {AlertifyService} from "../_services/alertify-service";
import {catchError} from "rxjs/operators";


@Injectable()
export class MemberDetailsResolver implements Resolve<UserModel> {

  constructor(private userService: UserService,
              private alertifyService: AlertifyService,
              private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserModel> | Promise<UserModel> | UserModel {
    return this.userService.getUser(route.params['id']).pipe( catchError( err => {
      this.alertifyService.errorMessage('something went wrong while getting the required data')
      return of(null);
    }));
  }

}
