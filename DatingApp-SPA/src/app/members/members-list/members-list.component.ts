import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../shared/models";
import {UserService} from "../../_services/user.service";
import {AlertifyService} from "../../_services/alertify-service";

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
users: UserModel[];

  constructor(private userService: UserService, private alertifyService: AlertifyService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe( (users: UserModel[])=> {
      this.users = users;
      console.log(users)
    }, error => {
      this.alertifyService.errorMessage(error);
    });
  }

}
