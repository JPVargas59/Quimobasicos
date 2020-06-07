import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../../../services/database.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/User';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  id: string;
  currentUser: User = {
    nombre: undefined,
    apellidos: undefined,
    password: undefined,
    correo: undefined,
    idUsuario: undefined
  };
  supervisores: any;
  constructor(
    private db: DatabaseService,
    private router: Router,
    private route: ActivatedRoute,
    private user: UserService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.db.getUser(this.id).subscribe(result => {
        const res = result as any;
        this.currentUser = res.data.usuario;
        this.supervisores = res.data.usuarios.filter(u => u.puesto === 'Supervisor' || u.puesto === 'Admin');
        console.log(this.user);
      });
    }
  }

  submit() {
    if (this.id) {
      this.user.setUser(this.currentUser, this.id).subscribe(res => {
        const response = res as any;
        if (response.data) {
          this.router.navigateByUrl('admin/users');
        }
        console.log(res);
      });
    } else {
      this.user.createUser(this.currentUser).subscribe(res => {
        const response = res as any;
        if (response.data) {
          this.router.navigateByUrl('admin/users');
        }
        console.log(res);
      });
    }
  }

}
