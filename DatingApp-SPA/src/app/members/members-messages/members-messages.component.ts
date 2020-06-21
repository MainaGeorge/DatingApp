import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {AlertifyService} from '../../_services/alertify-service';
import {AuthenticationServiceService} from '../../_services/authentication-service.service';
import {Message} from '../../shared/models';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-members-messages',
  templateUrl: './members-messages.component.html',
  styleUrls: ['./members-messages.component.css']
})
export class MembersMessagesComponent implements OnInit {

  @Input() recipientId:number;
  messages: Message[];
  messageToSend:any = {};
  constructor(private userService: UserService, private alertifyService:AlertifyService,
              private authService: AuthenticationServiceService) { }

  ngOnInit(): void {
    this.loadConversation();
  }

  loadConversation(){
    this.userService.getMessageThread(+this.authService.decodedToken.nameid, this.recipientId)
      .subscribe( (receivedMessages: Message[]) => {
        this.messages = receivedMessages;
      }, error => {
        this.alertifyService.errorMessage(error);
      })
  }

  onSendMessage(form: NgForm) {
    const userId:number = +this.authService.decodedToken.nameid;
    if(form.valid){
      this.messageToSend.recipientId = this.recipientId;
      this.messageToSend.content = form.value.messageContent;
      this.userService.sendInstantMessage(userId, this.messageToSend).subscribe( (message:Message) => {
        this.messages.unshift(message);
        },
        error => {
        this.alertifyService.errorMessage(error);
        });
      form.reset();
    }
  }
}
