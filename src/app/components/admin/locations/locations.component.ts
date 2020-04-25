import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  lugares = [
    { nombre: 'Patio 1', radio: '1.5', coordenadas: '123,123', capacidad: 15 },
    { nombre: 'Patio 1', radio: '1.5', coordenadas: '123,123', capacidad: 15 }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
