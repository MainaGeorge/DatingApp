import { Component, OnInit } from '@angular/core';
import {PaginatedResult, Pagination, UserModel} from '../../shared/models';
import {UserService} from "../../_services/user.service";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
users: UserModel[];
gender = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
queryParams: any = {};
pagination: Pagination;
user: UserModel;
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.route.data.subscribe( dataFromRoute => {
     this.users = dataFromRoute['users'].result;
     this.pagination = dataFromRoute['users'].pagination;
   });
   this.user = JSON.parse(localStorage.getItem('user'));
   this.queryParams.minAge = 18;
   this.queryParams.maxAge = 99;
   this.queryParams.gender = this.user.gender === 'male' ? 'female' : 'male';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getUsers(this.pagination.itemsPerPage, this.pagination.currentPage, this.queryParams)
      .subscribe((response: PaginatedResult<UserModel[]>) => {
        this.users = response.result;
        this.pagination = response.pagination;
      }, error => {
        console.log(error)
      })
  }

  resetFilters(){
    this.queryParams.minAge = 18;
    this.queryParams.maxAge = 99;
    this.queryParams.gender = this.user.gender === 'male' ? 'female' : 'male';
    this.loadUsers();
  }
}
