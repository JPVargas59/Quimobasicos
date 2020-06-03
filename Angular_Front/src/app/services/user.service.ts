import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import * as moment from 'moment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(
    private http: HttpClient
  ) { }

  type;
  userId;
  homeURL = 'http://localhost:5201/graphql';

  private static setSession(token, expiration) {
    const expiresAt = moment().add(expiration, 'second');

    localStorage.setItem('id_token', token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
  }

  getType() {
    return this.type;
  }

  private setType(type) {
    this.type = type;
  }

  getUserId() {
    return this.userId;
  }

  private setUserId(userId) {
    this.userId = userId;
  }

  login(user: string, password: string ) {
    const query = `
      mutation($user: String!, $password: String!) {
        login(correo: $user, contrasena: $password) {
          jwt_token,
          refreshJWT
        }
      }
    `;
    return this.http.post(this.homeURL, {query, variables: {user, password}})
      .subscribe(res => {
        const response = res as any;
        console.log(response);
        UserService.setSession(response.data.login.jwt_token, response.data.login.jwt_fechaExpiracion);
        const decodedToken = this.jwtDecode(response.data.login.jwt_token);
        console.log('decoded token', decodedToken);
        this.setType(decodedToken.payload.puesto);
        this.setUserId(decodedToken.payload.id);
      });
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
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
      console.log('Making request with token', idToken);
      const cloned = req.clone({
        headers: req.headers.set('authorization', idToken)
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
