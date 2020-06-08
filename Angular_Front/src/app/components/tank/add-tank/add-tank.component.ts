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
  tags= [];
  tanque: Tanque;
  error: string;
  id: string;
  redirigir = false;
  allEtiquetas = [];

  constructor(
    private user: UserService,
    private db: DatabaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.db.getTanquesSinEtiqueta().subscribe(tanques => {
      console.log(tanques);
      const data = (tanques as any).data;
      data.etiquetas.map(e => {
        if( e.idTanque == null) {
          this.tags.push(e.idEtiqueta);
        }
      });
    });

    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.db.getFullTank(this.id).subscribe(result => {
        const res = result as any;
        const tanque = res.data.tanque;
        this.tags.push(tanque.etiqueta.id);
        this.tanque =  {
          id: tanque.id,
          calidad: tanque.calidad,
          pesoActual: tanque.pesoActual,
          idContenido: tanque.contenido.id,
          idDueno: tanque.dueno.id,
          fechaIngreso: this.db.dateToStringFormat(tanque.fechaIngreso),
          fechaEsperadaRetorno: this.db.dateToStringFormat(tanque.fechaEsperadaRetorno),
          idEtiqueta: tanque.etiqueta.id,
          peso: tanque.peso
        };
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
    console.log('etiquetas a mostrar',this.tags)
    this.etiquetas = this.tags;

    this.db.getContenidos().subscribe(result => {
      const contenidos = result as any;
      this.contenidos = contenidos.data.contenidos;
    });

    this.db.getDuenos().subscribe(result => {
      const duenos = result as any;
      this.duenos = duenos.data.owners;
    });
  }

  onResgisterTank() {
    const { id, calidad, pesoActual, idContenido, idDueno, fechaIngreso, fechaEsperadaRetorno, idEtiqueta, peso } = this.tanque;
    console.log(this.tanque);
    if (id && calidad && peso && idContenido && idDueno && fechaEsperadaRetorno && fechaIngreso && idEtiqueta && pesoActual) {
      this.tanque.fechaIngreso = new Date(fechaIngreso).toISOString();
      this.tanque.fechaEsperadaRetorno = new Date(fechaEsperadaRetorno).toISOString();
      this.tanque.idEtiqueta = parseInt(idEtiqueta, 10);
      if (this.id) {
        this.db.updateTank(this.tanque).subscribe((result) => {
          console.log(result);
          this.user.goTo(`tank/${this.id}`);
        });
      } else {
        this.db.newTank(this.tanque).subscribe((result) => {
          console.log(result);
          if (!this.redirigir) {
            this.user.goTo('reports/inventory');
          }
        });
      }
    } else {
      this.error = 'Por favor llena todos los datos del tanque';
    }
  }
}
