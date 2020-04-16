import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = [
    {nombre: 'Raúl Castellanos', correo: 'raul@quimobasicos.com'},
    {nombre: 'Juan Pablo Vargas', correo: 'jp@quimobasicos.com'},
    {nombre: 'Alejandro Hernández', correo: 'alex@quimobasicos.com'},
    {nombre: 'David Luna', correo: 'david@quimobasicos.com'},
    {nombre: 'Luis Alberto Pérez', correo: 'luis@quimobasicos.com'},

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
