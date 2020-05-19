import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatabaseService} from '../../services/database.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tank',
  templateUrl: './tank.component.html',
  styleUrls: ['./tank.component.css']
})

export class TankComponent implements OnInit {

  tank: string;
  updateAddress: string;
  exitAddress: string;
  tanks: [];
  tankInfo: any;
  tankWeight: any;
  locations: any;
  
  constructor(
    route: ActivatedRoute,
    private db: DatabaseService,
    private user: UserService
  ) {
    this.tank = route.snapshot.params.id;
    const userType = this.user.getType();
    this.updateAddress  = '/'+ userType +'/tank/' + this.tank + '/edit';
    this.exitAddress = '/'+ userType +'/tank/' + this.tank + '/exit';
  }

  // TODO: hacer llamada de getTank
  ngOnInit(): void {
    this.db.getTank(this.tank).subscribe(result => {
      const tankInfo = result as any;
      this.tankInfo = tankInfo.data.tanque;
    })
    this.db.getTankWeight(this.tank).subscribe(result => {
      const tankWeight = result as any;
      this.tankWeight = tankWeight.data.historialPesoTanque;
      console.log(this.tankWeight)
    })
    this.db.getTankLocations(this.tank).subscribe(result => {
      const locations = result as any;
      // CHECAR LUGARES
      this.locations = locations.data.lugares;
      console.log(this.locations)
    })
  }
}
