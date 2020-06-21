import { Component, OnInit } from '@angular/core';
import {Message, PaginatedResult, Pagination} from '../shared/models';
import {ActivatedRoute} from '@angular/router';
import {AlertifyService} from '../_services/alertify-service';
import {AuthenticationServiceService} from '../_services/authentication-service.service';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages : Message[];
  pagination: Pagination;
  messageContainer: string = 'Unread';

  constructor(private route: ActivatedRoute,
              private alertifyService: AlertifyService,
              private authService: AuthenticationServiceService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.route.data.subscribe( response => {
      this.messages = response['messages'].result;
      this.pagination = response['messages'].pagination;
    })
  }

  loadMessages() {
    this.userService.getMessages(this.authService.decodedToken.nameid,
      this.pagination.currentPage, this.pagination.itemsPerPage,
      this.messageContainer).subscribe( (res: PaginatedResult<Message[]>) => {
        this.messages = res.result;
        this.pagination = res.pagination;
    }, error => {
        this.alertifyService.errorMessage(error);
    })
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

  deleteMessage(event: MouseEvent, messageId:number) {
    event.stopPropagation();
    this.userService.deleteMessage(+this.authService.decodedToken.nameid, messageId)
      .subscribe( () => {
        this.alertifyService.confirm('are you sure you want to delete this message?', ()=> {
          this.messages.splice(this.messages.findIndex(m => m.id === messageId), 1);
          this.alertifyService.success('message deleted successfully');
        });
        },
        error => {
        this.alertifyService.errorMessage('could not delete message');
        })
  }
}
