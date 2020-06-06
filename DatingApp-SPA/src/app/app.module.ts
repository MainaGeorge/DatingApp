import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { NavigationComponentComponent } from './navigation-component/navigation-component.component';
import {FormsModule} from "@angular/forms";
import { HomeComponentComponent } from './home-component/home-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import {ErrorInterceptorProvider} from "./_services/error-interceptor.service";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {routes} from "./routing";
import { MessagesComponent } from './messages/messages.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { ListsComponent } from './lists/lists.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import {AddHeaderInterceptorProvider} from "./_services/header-modifying.service";

export function getToken() {
  return localStorage.getItem('token')
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponentComponent,
    HomeComponentComponent,
    RegisterComponentComponent,
    MessagesComponent,
    MembersListComponent,
    ListsComponent,
    MemberCardComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
],
  providers: [ErrorInterceptorProvider, AddHeaderInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
