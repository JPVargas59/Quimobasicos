import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AdminHomeComponent} from './components/admin/admin-home/admin-home.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', children: [
      { path: '', component: AdminHomeComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/add', component: AddUsersComponent },
      { path: 'user/:id', component: UserComponent },
    ]},
  /*{ path: 'supervisor', children: [
      { path: '', component: SupervisorHomeComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'tanks/add', component: AddTankComponent },
      { path: 'tank/:id', component: TankComponent },
      { path: 'tank/:id/update', component: UpdateTankComponent },
      { path: 'tank/:id/exit', component: TankExitComponent },
      { path: 'reports', component: ReportsComponent },
    ]},
  { path: 'operator', children: [
      { path: '', component: OpreatorHomeComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'tanks/add', component: AddTankComponent },
      { path: 'tank/:id', component: TankComponent },
      { path: 'tank/:id/update', component: UpdateTankComponent },
      { path: 'tank/:id/exit', component: TankExitComponent },
    ]},*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
