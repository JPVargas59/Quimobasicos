import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../../../services/database.service';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
 
@Component({
 selector: 'app-inventory',
 templateUrl: './inventory.component.html',
 styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
 
  // TODO: Agregar a la llamada estos parametros faltantes (Fecha de Retorno y PesoActual)
 
 tanks = [
   { contenidoTanque: { contenido: "Cloro" }, idEtiqueta: { idEtiqueta: "1" }, idTanque: "EURO514966", lugar: {lnombre: "Almacen"}
   }
 ];
​​
 
 constructor(
   private db: DatabaseService,
   private user: UserService,
   private router: Router
 ) { }
 
 ngOnInit(): void {
   this.db.getTanks().subscribe(result => {
     console.log(result);
     // @ts-ignore
     this.tanks = result.data.tanques;
     console.log(this.tanks);
   });
 }
 
 onTankSelection(event) {
   const id = event.target.id;
   const userType = this.user.getType();
   this.router.navigateByUrl(`/${userType}/tank/${id}`);
 }
}
