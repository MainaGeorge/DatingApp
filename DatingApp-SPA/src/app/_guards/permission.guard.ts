import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationServiceService} from '../_services/authentication-service.service';
import {AlertifyService} from '../_services/alertify-service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(private authService: AuthenticationServiceService,
              private alertifyService: AlertifyService,
              private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isLoggedIn()){
      return true;
    }
    else{
      this.alertifyService.errorMessage('You must be logged in to view this page');
      this.router.navigate(['/home']);
    }
  }

}
