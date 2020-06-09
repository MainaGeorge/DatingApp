import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserModel} from "../../shared/models";
import {NgForm} from "@angular/forms";
import {AlertifyService} from "../../_services/alertify-service";
import {UserService} from '../../_services/user.service';
import {AuthenticationServiceService} from '../../_services/authentication-service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit, OnDestroy {
  user: UserModel;
  subscriptionToChangePhoto: Subscription;
  photoUrl: string;
  @ViewChild('editForm', { static: true}) editForm: NgForm;

  constructor(private activatedRoute: ActivatedRoute,
              private alertifyService: AlertifyService,
              private userService: UserService,
              private authService: AuthenticationServiceService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe( dataFromRoute => {
      this.user = dataFromRoute['user'];
    });
    this.photoUrl = this.user.photoUrl;
    this.subscriptionToChangePhoto = this.userService.changePhoto.subscribe( photoUrl => {
      this.photoUrl = photoUrl;
    })
  }

  onSaveChanges() {
      this.userService.updateUser(+this.authService.decodedToken.nameid, this.editForm.value).subscribe( next => {
        this.alertifyService.success('profile successfully updated');
        this.editForm.reset(this.user);
      }, error => {
        this.alertifyService.errorMessage(error)
      });
  }

  onChangePhoto(photoUrl: string) {
    this.user.photoUrl = photoUrl;
  }

  ngOnDestroy(): void {
    this.subscriptionToChangePhoto.unsubscribe();
  }
}
