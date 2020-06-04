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
 ​
  tanks = [];

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
   this.user.goTo(`tank/${id}`);
 }
}
