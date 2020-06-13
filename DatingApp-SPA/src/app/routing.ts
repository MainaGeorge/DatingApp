import {Routes} from '@angular/router';
import {HomeComponentComponent} from './home-component/home-component.component';
import {MembersListComponent} from './members/members-list/members-list.component';
import {MessagesComponent} from './messages/messages.component';
import {ListsComponent} from './lists/lists.component';
import {PermissionGuard} from './_guards/permission.guard';
import {MembersResolver} from './_resolvers/members.resolver';
import {MemberDetailsResolver} from './_resolvers/member-details.resolver';
import {MemberDetailComponent} from './members/member-detail/member-detail.component';
import {MemberEditComponent} from './members/member-edit/member-edit.component';
import {MemberEditResolver} from './_resolvers/member-edit.resolver';
import {PreventDataLossGuard} from './_guards/prevent-data-loss.guard';
import {LikesResolver} from './_resolvers/likes.resolver';

export const routes: Routes = [
  { path: '',canActivate: [PermissionGuard], runGuardsAndResolvers: 'always', children:
      [
       {path: 'members', component: MembersListComponent, resolve: { users: MembersResolver}},
       {path: 'members/edit',  component: MemberEditComponent,
          resolve: {user: MemberEditResolver}, canDeactivate: [PreventDataLossGuard]},
       {path: 'members/:id', resolve : { user : MemberDetailsResolver}, component: MemberDetailComponent},
       {path: 'messages', component: MessagesComponent},
       {path: 'lists', component: ListsComponent, resolve: { users : LikesResolver}}
      ]
  },
   {path: 'home', component: HomeComponentComponent},
   {path: '**', redirectTo: '/home'}
];
