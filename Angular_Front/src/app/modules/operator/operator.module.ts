import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OperatorHomeComponent } from 'src/app/components/operator/operator-home/operator-home.component';
import { InventoryComponent } from 'src/app/components/reports/inventory/inventory.component';
import { AddTankComponent } from 'src/app/components/tank/add-tank/add-tank.component';
import { TankComponent } from 'src/app/components/tank/tank.component';
import { ExitTankComponent } from 'src/app/components/tank/exit-tank/exit-tank.component';
import { OperatorLandingComponent } from 'src/app/components/operator/operator-landing/operator-landing.component';
import { LectoresRfidComponent } from 'src/app/components/admin/lectores-rfid/lectores-rfid.component';
import { AddLectorRfidComponent } from 'src/app/components/admin/lectores-rfid/add/add-lector-rfid.component';
import { RfidTagsComponent } from 'src/app/components/admin/rfid-tags/rfid-tags.component';
import { EditTagComponent } from 'src/app/components/admin/rfid-tags/edit-tag/edit-tag.component';

const routes: Routes = [
  { path: '',
    component: OperatorHomeComponent,
    children: [
      { path: '', component: OperatorLandingComponent },
      { path: 'reports/inventory', component: InventoryComponent },
      { path: 'tanks/add', component: AddTankComponent },
      { path: 'tank/:id', component: TankComponent },
      { path: 'tank/:id/edit', component: AddTankComponent },
      { path: 'tank/:id/exit', component: ExitTankComponent },
      
      { path: 'rfid-readers', component: LectoresRfidComponent },
      { path: 'rfid-readers/add', component: AddLectorRfidComponent },
      { path: 'rfid-readers/:readerId', component: AddLectorRfidComponent },
      { path: 'rfid-tags', component: RfidTagsComponent },
      { path: 'rfid-tags/add', component: EditTagComponent },
      { path: 'rfid-tags/:tagId/edit', component: EditTagComponent },
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
