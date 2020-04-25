import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  users = [
    {nombre: 'Raúl Castellanos', correo: 'raul@quimobasicos.com', telefono: 1234567891},
    {nombre: 'Juan Pablo Vargas', correo: 'jp@quimobasicos.com', telefono: 1234567891},
    {nombre: 'Alejandro Hernández', correo: 'alex@quimobasicos.com', telefono: 1234567891},
    {nombre: 'David Luna', correo: 'david@quimobasicos.com', telefono: 1234567891},
    {nombre: 'Luis Alberto Pérez', correo: 'luis@quimobasicos.com', telefono: 1234567891}
  ];

  constructor() { }

  ngOnInit(): void {}

}
