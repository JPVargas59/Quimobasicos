import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { UsersComponent } from './components/admin/users/users.component';
import { AddUserComponent } from './components/admin/add-user/add-user.component';
import { UserComponent } from './components/admin/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminHomeComponent,
    UsersComponent,
    AddUserComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
