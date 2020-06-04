import {Routes} from "@angular/router";
import {HomeComponentComponent} from "./home-component/home-component.component";
import {MembersListComponent} from "./members-list/members-list.component";
import {MessagesComponent} from "./messages/messages.component";
import {ListsComponent} from "./lists/lists.component";
import {PermissionGuard} from "./_guards/permission.guard";

 export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
   {path: 'members', component: MembersListComponent, canActivate: [PermissionGuard]},
   {path: 'messages', component: MessagesComponent, canActivate: [PermissionGuard]},
   {path: 'lists', component: ListsComponent,canActivate: [PermissionGuard]},
   {path: 'home', component:HomeComponentComponent},
  {path: '**', redirectTo: '/home'}
]
