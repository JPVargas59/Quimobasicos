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
import { SupervisorHomeComponent } from './components/supervisor/supervisor-home/supervisor-home.component';
import { OperatorHomeComponent } from './components/operator/operator-home/operator-home.component';
import { InventoryComponent } from './components/reports/inventory/inventory.component';
import { ReportsComponent } from './components/reports/reports.component';
import {AuthGuardGuard} from './guards/auth-guard.guard';
import {AdminGuard} from './guards/admin.guard';
import { SupervisorGuard } from './guards/supervisor.guard';
import { OperatorGuard } from './guards/operator.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule), canLoad: [AuthGuardGuard, AdminGuard] },
  { path: 'supervisor', loadChildren: () => import('./modules/supervisor/supervisor.module').then(m => m.SupervisorModule), canLoad: [AuthGuardGuard, SupervisorGuard] },
  { path: 'operator', loadChildren: () => import('./modules/operator/operator.module').then(m => m.OperatorModule), canLoad: [AuthGuardGuard, OperatorGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
