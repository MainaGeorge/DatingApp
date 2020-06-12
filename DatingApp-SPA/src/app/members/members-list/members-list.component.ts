import { Component, OnInit } from '@angular/core';
import {PaginatedResult, Pagination, UserModel} from '../../shared/models';
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
pagination: Pagination;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.route.data.subscribe( dataFromRoute => {
     this.users = dataFromRoute['users'].result;
     this.pagination = dataFromRoute['users'].pagination;
     console.log("data frm route", dataFromRoute);
   })
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getUsers(this.pagination.itemsPerPage, this.pagination.currentPage)
      .subscribe((response: PaginatedResult<UserModel[]>) => {
        this.users = response.result;
      }, error => {
        console.log(error)
      })
  }


}
