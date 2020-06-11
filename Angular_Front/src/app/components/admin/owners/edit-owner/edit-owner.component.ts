import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { Owner } from 'src/app/models/Owner';

@Component({
  selector: 'app-edit-owner',
  templateUrl: './edit-owner.component.html',
  styleUrls: ['./edit-owner.component.css']
})
export class EditOwnerComponent implements OnInit {
  id: string;
  error:string;
  owner: Owner = {
    idDueno: undefined,
    nombre: undefined
  };

  constructor(
    private db: DatabaseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.ownerId;
    if (this.id) {
      this.db.getDueno(this.id).subscribe(res => {
        const owner = res as any;
        this.owner = owner.data.owner;
      });
    }
  }

  submit() {
    if(this.owner.idDueno && this.owner.nombre){
      if (this.id) {
        this.db.setOwner(this.owner, this.id).subscribe(res => {
          const response = res as any;
          // console.log(res);
          if (response.data) {
            this.router.navigateByUrl('admin/owners');
          }
        });
      } else {
        this.db.createOwner(this.owner).subscribe(res => {
          const response = res as any;
          // console.log(res);
          if (response.data) {
            this.router.navigateByUrl('admin/owners');
          }
        });
      }
    } else{
      this.error = 'Por favor verifica los datos'
    }
  }

}
