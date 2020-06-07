import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import * as moment from 'moment';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {User} from '../models/User';
import {Owner} from '../models/Owner';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    if (this.isLoggedIn()) {
      console.log('Logged in');
      this.setRefreshTimer();
    } else {
      console.log('Not logged in');
      this.router.navigateByUrl('/login');
    }
  }

  type;
  userId;
  homeURL = 'http://localhost:5201/graphql';
  refreshToken;

  private static setSession(token, expiration) {
    const expiresAt = moment().add(expiration, 'second');
    console.log(expiration);
    localStorage.setItem('id_token', token);
    if (expiration) {
      localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
    }
  }

  getType() {
    return localStorage.getItem('user_type');
  }

  private setType(type: string) {
    localStorage.setItem('user_type', type.toLowerCase());
    this.type = type.toLowerCase();
  }

  getUserId() {
    return this.userId;
  }

  private setUserId(userId) {
    this.userId = userId;
  }

  refreshJwtToken() {
    const query = `
      mutation($refresh: String!) {
        refresh(refreshJWT: $refresh)
      }
    `;
    console.log(this.refreshToken);
    return this.http.post(this.homeURL, {query, variables: {refresh: this.refreshToken}});
  }

  setRefreshTimer() {
    setInterval(() => {
      this.refreshJwtToken().subscribe(res => {
        console.log('Refreshed token', res);
        UserService.setSession(this.refreshToken, undefined);
      });
    }, 840000);
  }

  login(user: string, password: string ) {
    const query = `
      mutation($user: String!, $password: String!) {
        login(correo: $user, contrasena: $password) {
          jwt_token,
          refreshJWT,
          jwt_fechaExpiracion
        }
      }
    `;
    return this.http.post(this.homeURL, {query, variables: {user, password}})
      .subscribe(res => {
        console.log(user, password);
        const response = res as any;
        if (response.data) {
          console.log('Response', response);
          UserService.setSession(response.data.login.jwt_token, response.data.login.jwt_fechaExpiracion);
          const decodedToken = this.jwtDecode(response.data.login.jwt_token);
          console.log('decoded token', decodedToken);
          this.refreshToken = response.data.login.refreshJWT;
          this.setRefreshTimer();
          this.setType(decodedToken.payload.puesto);
          this.setUserId(decodedToken.payload.id);
        } else {
          console.log('El servidor no respondió');
        }
      });
  }

  logoutDB(){
    const query = `mutation{
      logout(idUsuario:"${this.getUserId()}")
    }`
    return this.http.post(this.homeURL, {query});
  }

  logout() {
    this.logoutDB().subscribe(result => {
      console.log('COSA: ',result);
    });
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_type');
  }

  public isLoggedIn() {
    return moment().isAfter(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  goTo(route) {
    return this.router.navigateByUrl(`${this.getType()}/${route}`);
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }



  setUser(user: User, id) {
    const query = `
    mutation($usuarioInput: setUsuarioInput!, $idUsuarioOriginal: String!) {
      setUsuario(usuarioInput: $usuarioInput, idUsuarioOriginal: $idUsuarioOriginal)
    }`;
    return this.http.post(this.homeURL, {query, variables: {
        usuarioInput : {
          correo: user.correo,
          id: user.idUsuario,
          fName: user.nombre,
          lName: user.apellidos,
          puesto: user.puesto,
          idSupervisor: user.idSupervisor
        },
        idUsuarioOriginal: id
      }
    });
  }

  createUser(user: User) {
    const query = `
    mutation($usuarioInput: createUsuarioInput!) {
      createUsuario(usuarioInput: $usuarioInput)
    }`;
    console.log(user);
    return this.http.post(this.homeURL, {query, variables: {
        usuarioInput : {
        correo: user.correo,
        id: user.idUsuario,
        fName: user.nombre,
        lName: user.apellidos,
        contrasena: user.password,
        puesto: user.puesto
        }
      }
    });
  }

  private jwtDecode(t) {
    const token = {raw: undefined, header: undefined, payload: undefined};
    token.raw = t;
    token.header = JSON.parse(window.atob(t.split('.')[0]));
    token.payload = JSON.parse(window.atob(t.split('.')[1]));
    return (token);
  }

}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem('id_token');

    if (idToken) {
      // console.log('Making request with token', idToken);
      const cloned = req.clone({
        headers: req.headers.set('authorization', idToken)
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
