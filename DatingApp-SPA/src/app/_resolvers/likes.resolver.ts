import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {UserModel} from "../shared/models";
import {Observable, of} from "rxjs";
import {UserService} from "../_services/user.service";
import {AlertifyService} from "../_services/alertify-service";
import {catchError} from "rxjs/operators";


@Injectable()
export class LikesResolver implements Resolve<UserModel[]> {
  likes = 'Likers';
  constructor(private userService: UserService,
              private alertifyService: AlertifyService,
              private router: Router) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserModel[]> | Promise<UserModel[]> | UserModel[] {
    return this.userService.getUsers(null, null, null, this.likes).pipe( catchError( err => {
      this.alertifyService.errorMessage("Something went wrong while getting the users");
      this.router.navigate(['/home'])
      return of(null);
    }));
  }

}
