import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: string;
  usuario: {
    correo: undefined,
    contrasena: undefined
  };
  constructor(
    public user: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuario = {
      correo: undefined,
      contrasena: undefined
    };
  }

  onSubmit() {
    if (this.usuario.contrasena && this.usuario.correo) {
      this.user.login(this.usuario.correo, this.usuario.contrasena).add(() => {
        // console.log(this.user.getType(), this.user.getUserId());
        if (this.user.getType()) {
          this.router.navigateByUrl(this.user.getType().toLowerCase());
        }else {
          this.isError('Verifica tus datos');
        }
      });
    } else {
      this.isError('Completa todos los campos');
    }
  }
  isError(message){
    this.error = message;
  }

}
