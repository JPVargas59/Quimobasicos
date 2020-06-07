import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../../../../services/database.service';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.css']
})
export class EditTagComponent implements OnInit {

  idEtiqueta;
  idEtiquetaNueva;
  idTanque;
  tanques: any;
  etiquetas: any;
  allEtiquetas = [];

  constructor(
    private db: DatabaseService,
    private route: ActivatedRoute,
    private user: UserService
  ) { }

  ngOnInit(): void {
    this.idEtiqueta = this.route.snapshot.params.tagId;
    this.db.getTanquesSinEtiqueta().subscribe(tanques => {
      console.log(tanques);
      const data = (tanques as any).data;
      this.tanques = data.tanques;
      this.etiquetas = data.etiquetas.filter(e => e.idTanque == null);
      data.etiquetas.map(e => {
        this.allEtiquetas.push(e.idEtiqueta);
      });
      console.log(data, this.etiquetas, this.allEtiquetas);
    });
  }

  vincularTanque() {
    if (this.allEtiquetas.includes(this.idEtiquetaNueva)) {
      alert('Esta etiqueta ya existe');
      return;
    }
    if (this.idEtiqueta) {
      this.db.vincularTanque(this.idTanque, this.idEtiqueta).subscribe(() => {
        this.user.goTo('rfid-tags');
      });
    } else {
      this.db.createEtiqueta(this.idEtiquetaNueva).subscribe(res => {
        const data = (res as any).data;
        if (data) {
          this.db.vincularTanque(this.idTanque, this.idEtiquetaNueva).subscribe(() => {
            this.user.goTo('rfid-tags');
          });
        }
      });
    }

  }

}
