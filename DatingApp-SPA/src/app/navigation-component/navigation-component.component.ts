import { Component, OnInit } from '@angular/core';
import {LoginModel} from "../shared/models";
import {AuthenticationServiceService} from "../_services/authentication-service.service";
import {NgForm} from "@angular/forms";
import {AlertifyService} from "../_services/alertify-service";

@Component({
  selector: 'app-navigation-component',
  templateUrl: './navigation-component.component.html',
  styleUrls: ['./navigation-component.component.css'],
})
export class NavigationComponentComponent implements OnInit {

  constructor(public authService: AuthenticationServiceService,
              private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  onSubmit(formElement: NgForm){
    this.authService.login(formElement.value).subscribe( response => {
        this.alertify.success('logged in successfully');
      }, error => {
      this.alertify.errorMessage(error);
    })

    formElement.reset();
  }

  loggedIn(){
    return this.authService.isLoggedIn()
  }

  onLogout(){
    this.authService.logout();
  }
}
