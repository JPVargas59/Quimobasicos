import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  homeURL = 'http://18.219.108.70:5201/graphql';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  getTanks() {
    const json = '{tanques {idTanque idEtiqueta{idEtiqueta} fechaEsperadaRetorno peso contenidoTanque {contenido} lugar {lnombre}}}';
    return this.http.get(`${this.homeURL}?query=${json}`);
  }

  getContenidos() {
    const json = '{contenidos {idContenido ,contenido}}';
    return this.http.get(`${this.homeURL}?query=${json}`);
  }

  getDuenos(){
    const json = '{owners {idDueno nombre}}';
    return this.http.get(`${this.homeURL}?query=${json}`);
  }

  getEtiquetas(){
    const json = '{etiquetas {idEtiqueta}}'
    return this.http.get(`${this.homeURL}?query=${json}`);
  }

  getLugares(){
    const json = '{lugares{idLugar, lnombre, radio, capacidadMaxima}}'
    return this.http.get(`${this.homeURL}?query=${json}`);
  }

  // postEtiqueta(){
  //   const json = '{createEtiqueta(etiquetaInput:{id:15})}';
  //   return this.http.post(`${this.homeURL}?query=${json}`);
  // }

}
