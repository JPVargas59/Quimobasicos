import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Tanque} from '../models/Tanque';
import {User} from '../models/User';
import {Lugar} from '../models/Lugar';
import {Contenido} from '../models/Contenido';
import {Owner} from '../models/Owner';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  homeURL = 'http://localhost:5201/graphql';

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
    const query = `{
    tanque(idTanque:"${idTanque}"){
      haEstado{
        fecha
        lugar{
          idLugar
          lnombre
          }
        }
      }
    }`;
    return this.http.post(`${this.homeURL}`, {query});
  }

  getExactInfoTank(idTanque) {
    const query = `{
      tanque(idTanque: "${idTanque}") {
        haEstado {
          fecha
          lugar {
            idLugar
            lnombre
          }
        }

        contenidoTanque {
          contenido
        }
        dueno {
          nombre
        }
        calidad
        estadoValvula
        peso
        pesoActual
        fechaIngreso
        fechaEsperadaRetorno
        observaciones
      }
      historialPesoTanque(idTanque: "${idTanque}") {
        fecha
        peso
      }
    }
    `;
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
    const query = `{ contenidos{ idContenido contenido numTanques}}`;
    return this.http.post(`${this.homeURL}`, {query});
  }
  getContenido(id) {
    const query = `{contenido(idContenido:"${id}"){ idContenido contenido }}`;
    return this.http.post(`${this.homeURL}`, {query});
  }

  getDuenos() {
    const query = `{ owners{ idDueno nombre numTanques }}`;
    return this.http.post(`${this.homeURL}`, {query});
  }
  getDueno(id) {
    const query = `{owner(idOwner:"${id}") {idDueno nombre}}`;
    return this.http.post(`${this.homeURL}`, {query});
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
  getUser(idUser) {
    const query = `{
      usuario(idUsuario:"${idUser}"){
        idUsuario
        nombre
        apellidos
        correo
        password
        idSupervisor
        puesto
      },
      usuarios {
        idUsuario,
        puesto,
        nombre
     }
    }
    `;
    return this.http.post(`${this.homeURL}`, {query});
  }

  getEtiquetas() {
    const query = `{etiquetas{ idEtiqueta idTanque }}`;
    return this.http.post(`${this.homeURL}`, {query});
  }

  setEtiqueta(idEtiqueta, idTanque) {
    const query = `mutation
    {
      setTanque(tanqueInput:{
        idEtiqueta:${idEtiqueta}
      }, idTanqueOriginal:"${idTanque}")
    }`;
    return this.http.post(`${this.homeURL}`, {query});
  }

  getLugares() {
    const json = '{lugares{idLugar, lnombre, radio, capacidadMaxima}}';
    return this.http.get(`${this.homeURL}?query=${json}`);
  }
  getLugar(idLugar) {
    const query = `{
      lugar(idLugar:"${idLugar}"){
        idLugar
        lnombre
        radio
        capacidadMaxima
        coordenadas{
          x
          y
        }
      }
    }`;
    return this.http.post(`${this.homeURL}`, {query});
  }

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

  tanksPerPlace() {
    const query = `
      {
        lugares {
          idLugar
          lnombre
          capacidadMaxima
          tanques {
            idTanque
          }
        }
      }
    `;
    return this.http.post(this.homeURL, {query});
  }

  tanksPerSpecificPlace(id) {
    const query = `
      {
        lugar(idLugar: "${id}") {
          idLugar
          lnombre
          capacidadMaxima
          tanques {
            idTanque
            contenidoTanque {
              idContenido
            }
          }
        }
      }
    `;
    return this.http.post(this.homeURL, {query});
  }

  tanksPerContent() {
    const query = `
      {
        contenidos {
          tanques {
            idTanque
          }
          idContenido
          contenido
        }
      }
    `;
    return this.http.post(this.homeURL, {query});
  }

  tanksPerSpecificContent(id) {
    const query = `
      {
        contenido(idContenido: "${id}") {
          tanques {
            idTanque
            lugar {
              lnombre
            }
          }
          contenido
        }
      }
    `;
    return this.http.post(this.homeURL, {query});
  }

  createLugar(lugar: Lugar) {
    const query = `
    mutation {
      createLugar(lugarInput : {
        lnombre: "${lugar.lnombre}",
        id: "${lugar.idLugar}",
        radio: ${lugar.radio},
        coordenadas: {
          x: ${lugar.coordenadas.x},
          y: ${lugar.coordenadas.y}
        }
        capacidadMaxima: ${lugar.capacidadMaxima}
      })
    }
    `;
    return this.http.post(this.homeURL, {query});
  }

  setLugar(lugar: Lugar, id: string) {
    const query = `
    mutation {
      setLugar(lugarInput : {
        lnombre: "${lugar.lnombre}",
        id: "${lugar.idLugar}",
        radio: ${lugar.radio},
        coordenadas: {
          x: ${lugar.coordenadas.x},
          y: ${lugar.coordenadas.y}
        }
        capacidadMaxima: ${lugar.capacidadMaxima}
      }, idLugarOriginal: "${id}")
    }
    `;
    return this.http.post(this.homeURL, {query});
  }

  setOwner(owner: Owner, id: string) {
    const query = `
      mutation {
        setDueno(duenoInput: {
          id: "${owner.idDueno}",
          nombre: "${owner.nombre}"
        }, idDuenoOriginal: "${id}")
      }
    `;
    return this.http.post(this.homeURL, {query});
  }

  createOwner(owner: Owner) {
    const query = `
      mutation {
        createDueno(duenoInput: {
          id: "${owner.idDueno}",
          nombre: "${owner.nombre}"
        })
      }
    `;
    return this.http.post(this.homeURL, {query});
  }

  setContenido(contenido: Contenido, id: string) {
    const query = `
    mutation {
      setContenido(contenidoInput: {
        id: "${contenido.idContenido}",
        contenido: "${contenido.contenido}"
      }, idContenidoOriginal: "${id}")
    }
    `;
    console.log(query);
    return this.http.post(this.homeURL, {query});
  }

  createContenido(contenido: Contenido) {
    const query = `
    mutation {
      createContenido(contenidoInput: {
        id: "${contenido.idContenido}",
        contenido: "${contenido.contenido}"
      })
    }
    `;
    console.log(query);
    return this.http.post(this.homeURL, {query});
  }

  desvincularTanque(idTanque) {
    const query = `

        mutation {
          setTanque(tanqueInput: {
            idEtiqueta: null
          }, idTanqueOriginal: "${idTanque}")
        }

    `;
    return this.http.post(this.homeURL, {query});
  }

  vincularTanque(idTanque, idEtiqueta) {
    const query = `

        mutation {
          setTanque(tanqueInput: {
            idEtiqueta: ${idEtiqueta}
          }, idTanqueOriginal: "${idTanque}")
        }

    `;
    return this.http.post(this.homeURL, {query});
  }

  getTanquesSinEtiqueta() {
    const query = `
      {
        tanques(idEtiqueta: null) {
          idTanque
        }
        etiquetas {
          idTanque
          idEtiqueta
        }
      }
    `;
    return this.http.post(this.homeURL, {query});
  }

  getLectoresRfid() {
    const query = `
      {
        lectorRFID {
          idLector
          aliasDispositivo
        }
      }
    `;
    return this.http.post(this.homeURL, {query});
  }

  getLectorRfid(id: string) {
    const query = `
      {
        lectorRFID(idLector: "${id}") {
          idLector
          aliasDispositivo
        }
      }
    `;
    return this.http.post(this.homeURL, {query});
  }

  genToken(id) {
    const query = `
      mutation {
        genTokenLector(idLector: "${id}")
      }
    `;
    return this.http.post(this.homeURL, {query});
  }

  disableToken(id) {
    const query = `
    mutation {
      disableTokenLector(idLector: "${id}")
    }
    `;
    return this.http.post(this.homeURL, {query});
  }

  createLectorRfid(lector) {
    const query = `
    mutation {
      createLectorRFID(lectorRFIDInput: {
        id: "${lector.idLector}",
        aliasDispositivo: "${lector.alias}"
      })
    }
    `;
    return this.http.post(this.homeURL, {query});
  }

  setLectorRfid(lector, id: string) {
    const query = `
    mutation {
      setLectorRFID(lectorRFIDInput: {
        id: "${lector.idLector}",
        aliasDispositivo: "${lector.alias}"
      }, idLectorRFIDOriginal: "${id}")
    }
    `;
    return this.http.post(this.homeURL, {query});
  }

  createEtiqueta(idEtiqueta) {
    const query = `
    mutation {
      createEtiqueta(etiquetaInput: {
        id: ${idEtiqueta}
      })
    }
    `;
    return this.http.post(this.homeURL, {query});
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

