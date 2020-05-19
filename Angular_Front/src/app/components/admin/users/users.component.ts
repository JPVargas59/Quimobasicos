import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  users: any;

  constructor(
    private db: DatabaseService
  ) { }

  ngOnInit(): void {
    this.db.getUsuarios().subscribe(result =>{
      const users = result as any;
      this.users = users.data.usuarios;
    })
  }

}
