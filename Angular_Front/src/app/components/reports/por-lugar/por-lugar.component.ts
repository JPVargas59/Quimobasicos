import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../../../services/database.service';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-por-lugar',
  templateUrl: './por-lugar.component.html',
  styleUrls: ['./por-lugar.component.css']
})
export class PorLugarComponent implements OnInit {

  lugares;
  lugarEscogido;

  constructor(
    private db: DatabaseService,
    private router: Router,
    private user: UserService
  ) { }

  ngOnInit(): void {
    this.db.tanksPerPlace().subscribe( res => {
      const response = res as any;
      this.lugares = response.data.lugares;
    });
  }

  specificPlace(id) {
    this.db.tanksPerSpecificPlace(id).subscribe(res => {
      const response = res as any;
      this.lugarEscogido = response.data.lugar;
      // console.log(this.lugarEscogido);
    });
  }

  selectTank(id) {
    this.user.goTo(`tank/${id}`);
  }

}
