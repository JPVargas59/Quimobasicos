import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OperatorHomeComponent } from 'src/app/components/operator/operator-home/operator-home.component';
import { InventoryComponent } from 'src/app/components/reports/inventory/inventory.component';
import { AddTankComponent } from 'src/app/components/tank/add-tank/add-tank.component';
import { TankComponent } from 'src/app/components/tank/tank.component';
import { UpdateTankComponent } from 'src/app/components/tank/update-tank/update-tank.component';
import { ExitTankComponent } from 'src/app/components/tank/exit-tank/exit-tank.component';

const routes:Routes = [
  { path: '', 
    component: OperatorHomeComponent,
    children: [
      { path: '', component: OperatorHomeComponent },
      { path: 'reports/inventory', component: InventoryComponent },
      { path: 'tanks/add', component: AddTankComponent },
      { path: 'tank/:id', component: TankComponent },
      { path: 'tank/:id/update', component: UpdateTankComponent },
      { path: 'tank/:id/exit', component: ExitTankComponent }
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
export class OperatorModule { }
