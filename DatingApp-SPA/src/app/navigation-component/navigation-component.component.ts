import { Component, OnInit } from '@angular/core';
import {AuthenticationServiceService} from '../_services/authentication-service.service';
import {NgForm} from '@angular/forms';
import {AlertifyService} from '../_services/alertify-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation-component',
  templateUrl: './navigation-component.component.html',
  styleUrls: ['./navigation-component.component.css'],
})
export class NavigationComponentComponent implements OnInit {

  constructor(public authService: AuthenticationServiceService,
              private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(formElement: NgForm){
    this.authService.login(formElement.value).subscribe( response => {
        this.alertify.success('logged in successfully');
        this.router.navigate(['/members']);
      }, error => {
      this.alertify.errorMessage(error);
    });

    formElement.reset();
  }

  loggedIn(){
    return this.authService.isLoggedIn();
  }

  onLogout(){
    this.authService.logout();
    this.alertify.warning('logging out');
    this.router.navigate(['/home']);

  }
}
