import { Component, OnInit } from '@angular/core';
import {PaginatedResult, Pagination, UserModel} from '../shared/models';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertifyService} from '../_services/alertify-service';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  pagination: Pagination ;
  users: UserModel[];
  likesParam: string;

  constructor(private route:ActivatedRoute,
              private alertifyService: AlertifyService,
              private router:Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.route.data.subscribe(response => {
      this.pagination = response['users'].pagination;
      this.users = response['users'].result;
      console.log(response);
    });
    this.likesParam = 'Likers';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getUsers(this.pagination.itemsPerPage, this.pagination.currentPage, null, this.likesParam)
      .subscribe((response: PaginatedResult<UserModel[]>) => {
        this.users = response.result;
        this.pagination = response.pagination;
      }, error => {
        this.alertifyService.errorMessage(error);
      })
  }
}
