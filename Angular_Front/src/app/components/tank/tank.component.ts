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
  
  constructor(
    route: ActivatedRoute,
    private db: DatabaseService,
    private user: UserService
  ) {
    this.tank = route.snapshot.params.id;
    const userType = this.user.getType();
    this.updateAddress  = '/'+ userType +'/tank/' + this.tank + '/update';
    this.exitAddress = '/'+ userType +'/tank/' + this.tank + '/exit';
  }

  // TODO: hacer llamada de getTank
  ngOnInit(): void {
    
  }

}
