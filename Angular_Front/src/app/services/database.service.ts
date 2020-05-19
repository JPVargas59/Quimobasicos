import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Tanque} from '../models/Tanque';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  homeURL = 'http://18.219.108.70:5201/graphql';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {

  }

  getTanks() {

    const query = '{tanques {idTanque idEtiqueta{idEtiqueta} fechaEsperadaRetorno peso contenidoTanque {contenido} lugar {lnombre}}}';
    return this.http.post(`${this.homeURL}`, query, {
      headers: {
        'Content-Type': 'application/graphql'
      }
    });
  }

  getContenidos() {
    const json = '{contenidos {idContenido ,contenido}}';
    return this.http.get(`${this.homeURL}?query=${json}`);
  }

  getDuenos() {
    const json = '{owners {idDueno nombre}}';
    return this.http.get(`${this.homeURL}?query=${json}`);
  }

  getEtiquetas() {
    const json = '{etiquetas {idEtiqueta}}';
    return this.http.get(`${this.homeURL}?query=${json}`);
  }

  newTank(tank: Tanque) {
    const query = 'mutation($tank: TanqueInput!) {createTanque(tanqueInput: $tank)}';
    console.log({query, variables: {tank}});
    return this.http.post(this.homeURL, {query, variables: {tank}});
  }
}

