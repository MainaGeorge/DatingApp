import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../shared/models";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: UserModel;
  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.data.subscribe( routeData => {
      this.user = routeData['user'];
    });
  }

}
