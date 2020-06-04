import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  reports = [
    {nombre: 'Inventario de Tanques', route: 'inventory'},
    {nombre: 'Tanques por Lugar', route: 'byLocation'},
    {nombre: 'Tanques por contenido', route: 'byContent'}
  ];

  constructor(
    private router: Router,
    private user: UserService
  ) { }

  ngOnInit(): void {
  }

  onReportSelection(route) {
    this.user.goTo(`reports/${route}`);
  }
}
