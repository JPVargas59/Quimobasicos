import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  lugares = [
    { nombre: 'Patio 1', radio: '1.5', coordenadas: '123,123', capacidad: 15 },
    { nombre: 'Patio 2', radio: '3', coordenadas: '456,789', capacidad: 4 },
    { nombre: 'Patio 3', radio: '1', coordenadas: '001,404', capacidad: 2 }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
