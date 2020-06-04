import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { UsersComponent } from './components/admin/users/users.component';
import { AddUserComponent } from './components/admin/add-user/add-user.component';
import { UserComponent } from './components/admin/user/user.component';
import { AddTankComponent } from './components/tank/add-tank/add-tank.component';
import { UpdateTankComponent } from './components/tank/update-tank/update-tank.component';
import { ExitTankComponent } from './components/tank/exit-tank/exit-tank.component';
import { TankComponent } from './components/tank/tank.component';
import { SupervisorHomeComponent } from './components/supervisor/supervisor-home/supervisor-home.component';
import { OperatorHomeComponent } from './components/operator/operator-home/operator-home.component';
import { ReportsComponent } from './components/reports/reports.component';
import { InventoryComponent } from './components/reports/inventory/inventory.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminLandingComponent } from './components/admin/admin-landing/admin-landing.component';
import { OperatorLandingComponent } from './components/operator/operator-landing/operator-landing.component';
import { SupervisorLandingComponent } from './components/supervisor/supervisor-landing/supervisor-landing.component';
import { LocationsComponent } from './components/admin/locations/locations.component';
import { AddLocationComponent } from './components/admin/locations/add-location/add-location.component';
import { UpdateLocationComponent } from './components/admin/locations/update-location/update-location.component';
import { SeeReportComponent } from './components/reports/see-report/see-report.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { OwnersComponent } from './components/admin/owners/owners.component';
import { EditOwnerComponent } from './components/admin/owners/edit-owner/edit-owner.component';
import { ContentsComponent } from './components/admin/contents/contents.component';
import { EditContentComponent } from './components/admin/contents/edit-content/edit-content.component';
import { RfidTagsComponent } from './components/admin/rfid-tags/rfid-tags.component';
import { EditTagComponent } from './components/admin/rfid-tags/edit-tag/edit-tag.component';
import {FormsModule} from '@angular/forms';
import {AuthInterceptor} from './services/user.service';
import { PorLugarComponent } from './components/reports/por-lugar/por-lugar.component';
import { PorContenidoComponent } from './components/reports/por-contenido/por-contenido.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminHomeComponent,
    UsersComponent,
    AddUserComponent,
    UserComponent,
    AddTankComponent,
    UpdateTankComponent,
    ExitTankComponent,
    TankComponent,
    SupervisorHomeComponent,
    OperatorHomeComponent,
    ReportsComponent,
    InventoryComponent,
    NavbarComponent,
    AdminLandingComponent,
    OperatorLandingComponent,
    SupervisorLandingComponent,
    LocationsComponent,
    AddLocationComponent,
    UpdateLocationComponent,
    SeeReportComponent,
    OwnersComponent,
    EditOwnerComponent,
    ContentsComponent,
    EditContentComponent,
    RfidTagsComponent,
    EditTagComponent,
    PorLugarComponent,
    PorContenidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
