import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tank',
  templateUrl: './tank.component.html',
  styleUrls: ['./tank.component.css']
})


export class TankComponent implements OnInit {

  tank: string;
  updateAddress: string;
  exitAddress: string;

  constructor(route: ActivatedRoute) { 
    this.tank = route.snapshot.params.id;
    this.updateAddress  = '/operator/tank/'+this.tank+'/update';
    this.exitAddress = '/operator/tank/'+this.tank+'/exit';
  }

  ngOnInit(): void {
  }

}
