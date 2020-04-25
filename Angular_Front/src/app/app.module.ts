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
    LocationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
