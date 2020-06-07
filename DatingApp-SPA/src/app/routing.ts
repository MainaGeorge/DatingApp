import {Routes} from "@angular/router";
import {HomeComponentComponent} from "./home-component/home-component.component";
import {MembersListComponent} from "./members/members-list/members-list.component";
import {MessagesComponent} from "./messages/messages.component";
import {ListsComponent} from "./lists/lists.component";
import {PermissionGuard} from "./_guards/permission.guard";
import {MembersResolver} from "./_resolvers/members.resolver";
import {MemberDetailsResolver} from "./_resolvers/member-details.resolver";
import {MemberDetailComponent} from "./members/member-detail/member-detail.component";

 export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
   {path: 'members', component: MembersListComponent, canActivate: [PermissionGuard], resolve: { users: MembersResolver}},
   {path: 'members/:id', resolve : { user : MemberDetailsResolver}, component: MemberDetailComponent, canActivate: [PermissionGuard]},
   {path: 'messages', component: MessagesComponent, canActivate: [PermissionGuard]},
   {path: 'lists', component: ListsComponent,canActivate: [PermissionGuard]},
   {path: 'home', component:HomeComponentComponent},
  {path: '**', redirectTo: '/home'}
]
