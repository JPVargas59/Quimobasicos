import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from 'src/app/components/admin/admin-home/admin-home.component';
import { UsersComponent } from 'src/app/components/admin/users/users.component';
import { AddUserComponent } from 'src/app/components/admin/add-user/add-user.component';
import { UserComponent } from 'src/app/components/admin/user/user.component';
import { AdminLandingComponent } from 'src/app/components/admin/admin-landing/admin-landing.component';


const routes: Routes = [
  { path: '',
    component: AdminHomeComponent,
    children: [
      { path: '', component: AdminLandingComponent},
      { path: 'users', component: UsersComponent },
      { path: 'users/add', component: AddUserComponent },
      { path: 'user/:id', component: UserComponent }
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminModule { }
