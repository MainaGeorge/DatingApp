import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from "../../shared/models";

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() user: UserModel
  constructor() { }

  ngOnInit(): void {
  }

}
