import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../shared/models";
import {UserService} from "../../_services/user.service";
import {AlertifyService} from "../../_services/alertify-service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
users: UserModel[];

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.route.data.subscribe( dataFromRoute => {
     this.users = dataFromRoute['users'];
   })
  }

}
