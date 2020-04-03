import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-tank',
  templateUrl: './update-tank.component.html',
  styleUrls: ['./update-tank.component.css']
})
export class UpdateTankComponent implements OnInit {
  tank: string;

  constructor(route: ActivatedRoute) { 
    this.tank = route.snapshot.params.id;
  }

  ngOnInit(): void {
  }

}
