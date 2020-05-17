import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SupervisorHomeComponent } from 'src/app/components/supervisor/supervisor-home/supervisor-home.component';
import { InventoryComponent } from 'src/app/components/reports/inventory/inventory.component';
import { AddTankComponent } from 'src/app/components/tank/add-tank/add-tank.component';
import { TankComponent } from 'src/app/components/tank/tank.component';
import { UpdateTankComponent } from 'src/app/components/tank/update-tank/update-tank.component';
import { ExitTankComponent } from 'src/app/components/tank/exit-tank/exit-tank.component';
import { ReportsComponent } from 'src/app/components/reports/reports.component';
import {SupervisorLandingComponent} from '../../components/supervisor/supervisor-landing/supervisor-landing.component';
import { SeeReportComponent } from 'src/app/components/reports/see-report/see-report.component';

const routes: Routes = [
    { path: '',
    component: SupervisorHomeComponent,
    children: [
      { path: '', component: SupervisorLandingComponent},
      { path: 'reports/inventory', component: InventoryComponent },
      { path: 'tanks/add', component: AddTankComponent },
      { path: 'tank/:id', component: TankComponent },
      { path: 'tank/:id/update', component: UpdateTankComponent },
      { path: 'tank/:id/exit', component: ExitTankComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'reports/see-report/:reportName', component: SeeReportComponent }
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SupervisorModule { }
