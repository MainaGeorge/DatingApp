import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import {NgForm} from "@angular/forms";
import {AuthenticationServiceService} from "../_services/authentication-service.service";
import {AlertifyService} from "../_services/alertify-service";

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent implements OnInit {
  @Output('cancelRegistration') cancelRegistrationEvent = new EventEmitter<boolean>();
  constructor(private authService: AuthenticationServiceService,
              private alertifyService: AlertifyService) { }

  ngOnInit(): void {
  }

  onCancel() {
    this.cancelRegistrationEvent.emit(false);
  }

  onSubmit(registrationForm: NgForm) {
    this.authService.register(registrationForm.value).subscribe( results => {
      this.alertifyService.success('registration successful')
    }, error => {
      this.alertifyService.errorMessage(error);
    });
  }
}
