import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../../../services/database.service';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-por-contenido',
  templateUrl: './por-contenido.component.html',
  styleUrls: ['./por-contenido.component.css']
})
export class PorContenidoComponent implements OnInit {


  contenidos;
  contenidoEscogido;

  constructor(
    private db: DatabaseService,
    private router: Router,
    private user: UserService
  ) { }

  ngOnInit(): void {
    this.db.tanksPerContent().subscribe( res => {
      const response = res as any;
      this.contenidos = response.data.contenidos;
    });
  }

  specificPlace(id) {
    this.db.tanksPerSpecificContent(id).subscribe(res => {
      const response = res as any;
      this.contenidoEscogido = response.data.contenido;
      // console.log(this.contenidoEscogido);
    });
  }

  selectTank(id) {
    this.router.navigateByUrl(`/${this.user.getType()}/tank/${id}`);
  }

}
