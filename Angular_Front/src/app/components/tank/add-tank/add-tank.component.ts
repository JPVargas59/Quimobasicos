import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { UserService } from 'src/app/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
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
  id: string;
  redirigir = false;

  constructor(
    private user: UserService,
    private db: DatabaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.db.getFullTank(this.id).subscribe(result => {
        const res = result as any;
        const tanque = res.data.tanque;
        this.tanque = tanque;
        this.tanque.idDueno = tanque.dueno.id;
        this.tanque.idEtiqueta = tanque.etiqueta.id;
        this.tanque.idContenido = tanque.contenido.id;
        this.tanque.fechaEsperadaRetorno = this.db.dateToStringFormat(tanque.fechaEsperadaRetorno);
        this.tanque.fechaIngreso = this.db.dateToStringFormat(tanque.fechaIngreso);
        console.log(this.tanque);
      });
    } else {
      this.tanque =  {
        id: undefined,
        calidad: undefined,
        pesoActual: undefined,
        idContenido: undefined,
        idDueno: undefined,
        fechaIngreso: undefined,
        fechaEsperadaRetorno: undefined,
        idEtiqueta: undefined,
        peso: undefined
      };
    }

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

  }

  onResgisterTank() {
    //  TODDO: POST de esta info
    const { id, calidad, pesoActual, idContenido, idDueno, fechaIngreso, fechaEsperadaRetorno, idEtiqueta, peso } = this.tanque;
    console.log(this.tanque);
    if (id && calidad && peso && idContenido && idDueno && fechaEsperadaRetorno && fechaIngreso && idEtiqueta && pesoActual) {
      this.tanque.fechaIngreso = new Date(fechaIngreso).toISOString();
      this.tanque.fechaEsperadaRetorno = new Date(fechaEsperadaRetorno).toISOString();
      this.tanque.idEtiqueta = parseInt(idEtiqueta, 10);
      if (this.id) {
        this.db.updateTank(this.tanque).subscribe((result) => {
          console.log(result);
        });
      } else {
        this.db.newTank(this.tanque).subscribe((result) => {
          console.log(result);
          if (!this.redirigir) {
            const userType = this.user.getType();
            this.router.navigateByUrl(`/${userType}/reports/inventory`);
          }
        });
      }
    } else {
      this.error = 'Por favor llena todos los datos del tanque';
    }
  }
}
