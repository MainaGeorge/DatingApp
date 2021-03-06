import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationServiceService} from "./_services/authentication-service.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  private jwtHelperService = new JwtHelperService();
  constructor(private authService: AuthenticationServiceService) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token){
      this.authService.decodedToken = this.jwtHelperService.decodeToken(token);
    }
  }
}
