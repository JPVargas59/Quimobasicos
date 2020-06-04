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
import { ContentsComponent } from 'src/app/components/admin/contents/contents.component';
import { EditContentComponent } from 'src/app/components/admin/contents/edit-content/edit-content.component';
import { OwnersComponent } from 'src/app/components/admin/owners/owners.component';
import { EditOwnerComponent } from 'src/app/components/admin/owners/edit-owner/edit-owner.component';
import { RfidTagsComponent } from 'src/app/components/admin/rfid-tags/rfid-tags.component';
import { EditTagComponent } from 'src/app/components/admin/rfid-tags/edit-tag/edit-tag.component';
import {PorLugarComponent} from '../../components/reports/por-lugar/por-lugar.component';



const routes: Routes = [
  { path: '',
    component: AdminHomeComponent,
    children: [
      { path: '', component: AdminLandingComponent},
      { path: 'users', component: UsersComponent },
      { path: 'users/add', component: AddUserComponent },
      { path: 'user/:id', component: UserComponent },
      { path: 'user/:id/edit', component: AddUserComponent },
      { path: 'locations', component: LocationsComponent},
      { path: 'locations/add-location', component: AddLocationComponent},
      { path: 'locations/:location/edit', component: UpdateLocationComponent},

      { path: 'reports/inventory', component: InventoryComponent },
      { path: 'tanks/add', component: AddTankComponent },
      { path: 'tank/:id', component: TankComponent },
      { path: 'tank/:id/edit', component: AddTankComponent },
      { path: 'tank/:id/exit', component: ExitTankComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'reports/see-report/byLocation', component: PorLugarComponent },
      { path: 'reports/see-report/:reportName', component: SeeReportComponent },

      { path: 'contents', component: ContentsComponent },
      { path: 'contents/add', component: EditContentComponent },
      { path: 'contents/edit/:contentId', component: EditContentComponent },
      { path: 'owners', component: OwnersComponent },
      { path: 'owners/add', component: EditOwnerComponent },
      { path: 'owners/:ownerId/edit', component: EditOwnerComponent },
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
  ],
  exports: [RouterModule]
})
export class AdminModule { }
