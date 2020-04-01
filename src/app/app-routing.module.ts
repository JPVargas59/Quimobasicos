import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AdminHomeComponent} from './components/admin/admin-home/admin-home.component';
import { UsersComponent } from './components/admin/users/users.component';
import { AddUserComponent } from './components/admin/add-user/add-user.component';
import { UserComponent } from './components/admin/user/user.component';
import { AddTankComponent } from './components/tank/add-tank/add-tank.component';
import { UpdateTankComponent } from './components/tank/update-tank/update-tank.component';
import { ExitTankComponent } from './components/tank/exit-tank/exit-tank.component';
import { TankComponent } from './components/tank/tank.component';
import { SupervisorHomeComponent } from './components/supervisor/supervisor-home/supervisor-home.component'
import { OperatorHomeComponent } from './components/operator/operator-home/operator-home.component'
import { InventoryComponent } from './components/reports/inventory/inventory.component';
import { ReportsComponent } from './components/reports/reports.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', children: [
      { path: '', component: AdminHomeComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/add', component: AddUserComponent },
      { path: 'user/:id', component: UserComponent },
    ]},
  { path: 'supervisor', children: [
      { path: '', component: SupervisorHomeComponent },
      { path: 'reports/inventory', component: InventoryComponent },
      { path: 'tanks/add', component: AddTankComponent },
      { path: 'tank/:id', component: TankComponent },
      { path: 'tank/:id/update', component: UpdateTankComponent },
      { path: 'tank/:id/exit', component: ExitTankComponent },
      { path: 'reports', component: ReportsComponent },
    ]},
  { path: 'operator', children: [
      { path: '', component: OperatorHomeComponent },
      { path: 'reports/inventory', component: InventoryComponent },
      { path: 'tanks/add', component: AddTankComponent },
      { path: 'tank/:id', component: TankComponent },
      { path: 'tank/:id/update', component: UpdateTankComponent },
      { path: 'tank/:id/exit', component: ExitTankComponent },
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
