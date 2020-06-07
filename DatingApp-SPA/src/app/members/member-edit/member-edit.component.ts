import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserModel} from "../../shared/models";
import {NgForm} from "@angular/forms";
import {AlertifyService} from "../../_services/alertify-service";

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: UserModel;
  @ViewChild('editForm', { static: true}) editForm : NgForm

  constructor(private activatedRoute: ActivatedRoute,
              private alertifyService: AlertifyService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe( dataFromRoute => {
      this.user = dataFromRoute['user'];
    });
  }

  onSaveChanges() {
    if(this.editForm.valid){
      console.log(this.editForm.value);
      this.alertifyService.success('changes saved successfully');
      this.editForm.reset(this.user);
    }
  }
}
