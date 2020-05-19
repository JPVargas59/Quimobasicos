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

  getTank(idTanque) {
    const query = `{tanque(idTanque:"${idTanque}"){ contenidoTanque {contenido} dueno {nombre} calidad estadoValvula peso fechaIngreso fechaEsperadaRetorno observaciones}}`;
    return this.http.post(`${this.homeURL}`,{query});
  }

  getTankWeight(idTanque){
    const query = `{ historialPesoTanque (idTanque:"${idTanque}") { idTanque fecha peso}}`
    return this.http.post(`${this.homeURL}`,{query});
  }

  getTankLocations(idTanque){
    // CORREGIR QUERIE
    const query = `{ historialPesoTanque (idTanque:"${idTanque}") { idTanque fecha peso}}`
    return this.http.post(`${this.homeURL}`,{query});
  }

  getTanks() {
    const json = '{tanques {idTanque contenidoTanque {contenido} fechaIngreso  fechaEsperadaRetorno  lugar {lnombre} peso  idEtiqueta{idEtiqueta}  observaciones}}';
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
}
