import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import {Tanque} from '../../../models/Tanque';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add-tank',
  templateUrl: './add-tank.component.html',
  styleUrls: ['./add-tank.component.css']
})
export class AddTankComponent implements OnInit {

  contenidos: any;
  duenos: any;
  etiquetas: any;
  tanque: Tanque;
  error: string;

  constructor(
    private user: UserService,
    private db: DatabaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.db.getContenidos().subscribe(result => {
      const contenidos = result as any;
      this.contenidos = contenidos.data.contenidos;
    });

    this.db.getDuenos().subscribe(result => {
      console.log(result);
      const duenos = result as any;
      this.duenos = duenos.data.owners;
    });

    this.db.getEtiquetas().subscribe(result => {
      console.log(result);
      const etiquetas = result as any;
      this.etiquetas = etiquetas.data.etiquetas;
    });

    /*this.tanque =  {
      calidad: undefined,
      cantidad: undefined,
      contenido: undefined,
      dueno: undefined,
      etiqueta: undefined,
      fechaIngreso: undefined,
      fechaSalida: undefined,
      id: undefined,
      peso: undefined
    };*/

    this.tanque =  {
      id: 'EURO514966',
      calidad: 'buena',
      pesoActual: 10,
      idContenido: 'G-134A',
      idDueno: 'ARL',
      fechaIngreso: '2020-02-02T10:00:00.000Z',
      fechaEsperadaRetorno: '2020-02-02T10:00:00.000Z',
      idEtiqueta: 1,
      peso: 100
    };
  }

  onResgisterTank(form: HTMLFormElement) {
    //  TODDO: POST de esta info
    this.db.newTank(this.tanque).subscribe((result) => {
      console.log(result);
    });
    if (form.valid) {

      // const userType = this.user.getType();
      // this.router.navigateByUrl(`/${userType}/reports/inventory`);
    } else {
      this.error = 'Por favor llena todos los datos del tanque';
    }
  }

}
