import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationServiceService} from "../_services/authentication-service.service";
import {AlertifyService} from "../_services/alertify-service";
import {LoginModel, UserModel} from '../shared/models';
import {Router} from '@angular/router';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent implements OnInit {
  @Output('cancelRegistration') cancelRegistrationEvent = new EventEmitter<boolean>();

  user: UserModel
  registerForm: FormGroup;
  colorTheme = "theme-orange";
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthenticationServiceService,
              private alertifyService: AlertifyService,
              private router: Router) { }

  validateConfirmPassword(form: FormGroup): { [key: string]: boolean}{
    if(form.get('password').value !== form.get('confirmPassword').value){
      return {'mismatch': true}
    }else {
      return null
    }
  }
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'gender': new FormControl('male'),
      'knownAs': new FormControl('First Name', Validators.required),
      'username': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required,
        Validators.minLength(6), Validators.maxLength(15)]),
      'confirmPassword': new FormControl('', Validators.required),
      'dateOfBirth': new FormControl(null, Validators.required),
      'city': new FormControl('City', Validators.required),
      'country': new FormControl('Country', Validators.required)
    }, this.validateConfirmPassword);
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
  }

  onCancel() {
    this.cancelRegistrationEvent.emit(false);
  }

  onSubmit() {
    if(this.registerForm.valid){
      this.user = Object.assign({}, this.registerForm.value)
      const login:LoginModel = {username: this.registerForm.value.username, password: this.registerForm.value.password}
      this.authService.register(this.user).subscribe( responseData => {
        this.alertifyService.success('Registration successful');
        },
        error => {
        this.alertifyService.errorMessage(error)
        }, () => {
        this.authService.login(login).subscribe( response => {
          this.router.navigate(['/members']);
        })
      });
    }
  }
}
