import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserModel} from "../../shared/models";
import {UserService} from '../../_services/user.service';
import {Subscription} from 'rxjs';
import {AlertifyService} from '../../_services/alertify-service';
import {AuthenticationServiceService} from '../../_services/authentication-service.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() user: UserModel
  photoUrl: string;

  constructor(private userService: UserService,
              private alertifyService: AlertifyService,
              private authService: AuthenticationServiceService) { }

  ngOnInit(): void {
  }

  addLike(recipientId: number) {
    this.userService.addLike(+this.authService.decodedToken.nameid, recipientId)
      .subscribe( response => {
        this.alertifyService.success('You just liked ' + this.user.knownAs)
      }, error => {
        this.alertifyService.errorMessage(error);
      })
  }
}
