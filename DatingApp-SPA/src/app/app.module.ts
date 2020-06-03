import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { NavigationComponentComponent } from './navigation-component/navigation-component.component';
import {FormsModule} from "@angular/forms";
import { HomeComponentComponent } from './home-component/home-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponentComponent,
    HomeComponentComponent,
    RegisterComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
