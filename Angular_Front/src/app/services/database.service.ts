import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Tanque} from '../models/Tanque';
import {User} from '../models/User';

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

  getTank(idTanque) {
    const query = `{
      tanque(idTanque:"${idTanque}"){
      contenidoTanque {contenido}
      dueno {nombre}
      calidad
      estadoValvula
      peso
      pesoActual
      fechaIngreso
      fechaEsperadaRetorno
      observaciones}
    }`;
    return this.http.post(`${this.homeURL}`, {query});
  }

  getTankWeight(idTanque) {
    const query = `{ historialPesoTanque (idTanque:"${idTanque}") { idTanque fecha peso}}`;
    return this.http.post(`${this.homeURL}`, {query});
  }

  getTankLocations(idTanque) {
    // CORREGIR QUERIE
    const query = `{
      historialPesoTanque (idTanque:"${idTanque}") {
         idTanque fecha peso}}`;
    return this.http.post(`${this.homeURL}`, {query});
  }

  getTanks() {
    const json = `{
    tanques {
      idTanque
      contenidoTanque {
        contenido
      }
      fechaIngreso
      fechaEsperadaRetorno
      lugar {lnombre}
      peso
      pesoActual
      idEtiqueta {
        idEtiqueta
      }
      observaciones
      }
    }`;
    return this.http.get(`${this.homeURL}?query=${json}`);
  }

  getFullTank(id) {
    const query = `{
      tanque(idTanque: "${id}") {
      id: idTanque
      etiqueta: idEtiqueta {
        id: idEtiqueta
      }
      dueno {
        id: idDueno
      }
      fechaEsperadaRetorno
      fechaIngreso
      observaciones
      peso
      pesoActual
      contenido: contenidoTanque {
        id: idContenido
      }
      calidad
    }
  }`;
    return this.http.post(`${this.homeURL}`, {query});
  }

  getContenidos() {
    const json = '{contenidos {idContenido ,contenido}}';
    return this.http.get(`${this.homeURL}?query=${json}`);
  }

  getDuenos() {
    const json = '{owners {idDueno nombre}}';
    return this.http.get(`${this.homeURL}?query=${json}`);
  }

  getUsuarios() {
    const query = `{
      usuarios{
        idUsuario
        nombre
        apellidos
        correo
      }
    }`;
    return this.http.post(`${this.homeURL}`, {query});
  }

  getEtiquetas() {
    const json = '{etiquetas {idEtiqueta}}';
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


  newTank(tank: Tanque) {
    const query = 'mutation($tank: TanqueInput!) {createTanque(tanqueInput: $tank)}';
    console.log({query, variables: {tank}});
    return this.http.post(this.homeURL, {query, variables: {tank}});
  }

  updateTank(tank: Tanque) {
    const query = `
    mutation($tank: TanqueInput!, $id: String!) {
      setTanque(tanqueInput: $tank, idTanqueOriginal: $id)
    }
    `;
    return this.http.post(this.homeURL, {query, variables: {tank, id: tank.id}});
  }

  dateToStringFormat(dateString: string) {
    const date = new Date(dateString);
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    return `${y}-${m < 10 ? '0' : ''}${m}-${d < 10 ? '0' : ''}${d}`;
  }

  createUser(user: User) {
    const query = `
    mutation($user: UsuarioInput!) {
      createUsuario(usuarioInput: $user)
    }`;
    return this.http.post(this.homeURL, {query, variables: {user}});
  }
}

