import {Routes} from "@angular/router";
import {HomeComponentComponent} from "./home-component/home-component.component";
import {MembersListComponent} from "./members-list/members-list.component";
import {MessagesComponent} from "./messages/messages.component";
import {ListsComponent} from "./lists/lists.component";

 export const routes: Routes = [
  { path: 'home', component:HomeComponentComponent},
   {path: 'members', component: MembersListComponent},
   {path: 'messages', component: MessagesComponent},
   {path: 'lists', component: ListsComponent},
   {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: '**', redirectTo: '', pathMatch: 'full'}
]
