import { Component, OnInit } from '@angular/core';
import {LoginModel} from "../shared/models";
import {AuthenticationServiceService} from "../_services/authentication-service.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-navigation-component',
  templateUrl: './navigation-component.component.html',
  styleUrls: ['./navigation-component.component.css']
})
export class NavigationComponentComponent implements OnInit {
  loggedInUser: boolean;

  constructor(private authService: AuthenticationServiceService) { }

  ngOnInit(): void {
    console.log(this.authService.isLoggedIn())
    this.loggedInUser = this.authService.isLoggedIn();
  }

  onSubmit(formElement: NgForm){
    this.authService.login(formElement.value).subscribe( response => {
        console.log('logged in')
      this.loggedInUser = this.authService.isLoggedIn();
      }, error => {
      console.log(error.message);
    })

    formElement.reset();
  }

  onLogout(){
    this.authService.logout();
  }
}
