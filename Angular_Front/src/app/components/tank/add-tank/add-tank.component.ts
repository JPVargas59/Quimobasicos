import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-tank',
  templateUrl: './add-tank.component.html',
  styleUrls: ['./add-tank.component.css']
})
export class AddTankComponent implements OnInit {
  
  contenidos: any;
  duenos: any;
  etiquetas: any;
  constructor(
    private user: UserService,
    private db: DatabaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.db.getContenidos().subscribe(result => {
      const contenidos = result as any;
      this.contenidos = contenidos.data.contenidos;
    })

    this.db.getDuenos().subscribe(result => {
      console.log(result)
      const duenos = result as any;
      this.duenos = duenos.data.owners;
    })

    this.db.getEtiquetas().subscribe(result => {
      console.log(result)
      const etiquetas = result as any;
      this.etiquetas = etiquetas.data.etiquetas;
    })
  }

  onResgisterTank(event) {
    //  TODDO: POST de esta info
    const userType = this.user.getType();
    this.router.navigateByUrl(`/${userType}/reports/inventory`);
  }

}