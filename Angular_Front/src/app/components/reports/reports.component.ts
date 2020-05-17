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
    {nombre: 'Inventario'},
    {nombre: 'Tanques en planta'},
    {nombre: 'Tanques '}
  ];

  constructor(
    private router: Router,
    private user: UserService
  ) { }

  ngOnInit(): void {
  }

  onReportSelection(event) {
    console.log(event);
    const reportName = event.target.id;
    const userType = this.user.getType();
    this.router.navigateByUrl(`/${userType}/reports/see-report/${reportName}`);
  }

}
