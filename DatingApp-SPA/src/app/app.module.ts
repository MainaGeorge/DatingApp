import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Pipe} from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { NavigationComponentComponent } from './navigation-component/navigation-component.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponentComponent } from './home-component/home-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import {ErrorInterceptorProvider} from './_services/error-interceptor.service';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {routes} from './routing';
import { MessagesComponent } from './messages/messages.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { ListsComponent } from './lists/lists.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import {AddHeaderInterceptorProvider} from './_services/header-modifying.service';
import {MembersResolver} from './_resolvers/members.resolver';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import {MemberDetailsResolver} from './_resolvers/member-details.resolver';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {NgxGalleryModule} from '@kolkov/ngx-gallery';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import {MemberEditResolver} from './_resolvers/member-edit.resolver';
import { PhotoEditComponent } from './members/photo-edit/photo-edit.component';
import {FileUploadModule} from 'ng2-file-upload';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {TimeAgoExtendsPipePipe} from './pipe';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {LikesResolver} from './_resolvers/likes.resolver';
import { MembersMessagesComponent } from './members/members-messages/members-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponentComponent,
    HomeComponentComponent,
    RegisterComponentComponent,
    MessagesComponent,
    MembersListComponent,
    ListsComponent,
    MemberCardComponent,
    MemberDetailComponent,
    TimeAgoExtendsPipePipe,
    MemberEditComponent,
    PhotoEditComponent,
    MembersMessagesComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    TabsModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule
],
  providers: [ErrorInterceptorProvider,
    AddHeaderInterceptorProvider,
    MembersResolver,
    MemberDetailsResolver,
    MemberEditResolver,
    LikesResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
