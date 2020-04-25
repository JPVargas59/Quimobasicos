import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exit-tank',
  templateUrl: './exit-tank.component.html',
  styleUrls: ['./exit-tank.component.css']
})
export class ExitTankComponent implements OnInit {

  tank: string;
  constructor(route: ActivatedRoute) { 
    this.tank = route.snapshot.params.id;
  }

  ngOnInit(): void {
  }

}
