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

  tanks = [
    { id: 'CA400', content: 'GENETRON FLUSH', registerDate: '02-04-2020', location: 'Patio', status: 'vacio' },
    { id: 'CA403', content: 'GENETRON FLUSH', registerDate: '03-04-2020', location: 'Vaciado', status: 'activo' },
    { id: 'CA500', content: 'GENETRON 134a', registerDate: '01-04-2020', location: 'Vaciado', status: 'activo' },
    { id: 'CA510', content: 'GENETRON 134a', registerDate: '09-04-2020', location: 'Patio', status: 'vacio' },
    { id: 'CA600', content: 'GENETRON MP39', registerDate: '03-04-2020', location: 'Llenado', status: 'activo' },
    { id: 'CA602', content: 'GENETRON MP39 (R-401A)', registerDate: '02-04-2020', location: 'Patio', status: 'lleno' },
  ];

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
    });
  }

  onTankSelection(event) {
    const id = event.target.id;
    const userType = this.user.getType();
    this.router.navigateByUrl(`/${userType}/tank/${id}`);
  }

}
