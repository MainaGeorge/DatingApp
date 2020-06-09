import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserModel} from "../../shared/models";
import {UserService} from '../../_services/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() user: UserModel
  photoUrl: string;
  profilePhotoChangeSubscription: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
}
