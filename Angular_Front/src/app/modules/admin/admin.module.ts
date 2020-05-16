import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from 'src/app/components/admin/admin-home/admin-home.component';
import { UsersComponent } from 'src/app/components/admin/users/users.component';
import { AddUserComponent } from 'src/app/components/admin/add-user/add-user.component';
import { UserComponent } from 'src/app/components/admin/user/user.component';
import { AdminLandingComponent } from 'src/app/components/admin/admin-landing/admin-landing.component';
import {LocationsComponent} from '../../components/admin/locations/locations.component';
import { AddLocationComponent } from 'src/app/components/admin/locations/add-location/add-location.component';
import { UpdateLocationComponent } from 'src/app/components/admin/locations/update-location/update-location.component';
import { InventoryComponent } from 'src/app/components/reports/inventory/inventory.component';
import { AddTankComponent } from 'src/app/components/tank/add-tank/add-tank.component';
import { TankComponent } from 'src/app/components/tank/tank.component';
import { UpdateTankComponent } from 'src/app/components/tank/update-tank/update-tank.component';
import { ExitTankComponent } from 'src/app/components/tank/exit-tank/exit-tank.component';
import { ReportsComponent } from 'src/app/components/reports/reports.component';
import { SeeReportComponent } from 'src/app/components/reports/see-report/see-report.component';


const routes: Routes = [
  { path: '',
    component: AdminHomeComponent,
    children: [
      { path: '', component: AdminLandingComponent},
      { path: 'users', component: UsersComponent },
      { path: 'users/add', component: AddUserComponent },
      { path: 'user/:id', component: UserComponent },
      { path: 'locations', component: LocationsComponent},
      { path: 'locations/add-location', component: AddLocationComponent},
      { path: 'locations/update-location', component: UpdateLocationComponent},
      
      { path: 'reports/inventory', component: InventoryComponent },
      { path: 'tanks/add', component: AddTankComponent },
      { path: 'tank/:id', component: TankComponent },
      { path: 'tank/:id/update', component: UpdateTankComponent },
      { path: 'tank/:id/exit', component: ExitTankComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'reports/see-report', component: SeeReportComponent }
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
