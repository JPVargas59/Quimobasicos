import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Contenido } from 'src/app/models/Contenido';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.css']
})
export class EditContentComponent implements OnInit {
  contenido: Contenido = {
    idContenido: undefined,
    contenido: undefined
  };
  id: string;
  constructor(
    private db: DatabaseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.contentId;
    if(this.id) {
      this.db.getContenido(this.id).subscribe(res =>{
        const contenido = res as any;
        this.contenido = contenido.data.contenido;
      });
    }
  }

  submit() {
    if (this.id) {
      this.db.setContenido(this.contenido, this.id).subscribe(res => {
        const response = res as any;
        if (response.data) {
          this.router.navigateByUrl('admin/contents');
        }
        console.log(res);
      });
    } else {
      this.db.createContenido(this.contenido).subscribe(res => {
        const response = res as any;
        if (response.data) {
          this.router.navigateByUrl('admin/contents');
        }
        console.log(res);
      });
    }
  }

}
