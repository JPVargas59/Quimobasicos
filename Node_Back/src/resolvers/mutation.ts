import { IResolvers } from 'graphql-tools';
import mysqlMutations = require('../data/asyncMySQLMutations');

const mutation: IResolvers = {
	Mutation: {
		setTanque(__: void, { tanqueInput, idTanqueOriginal }, { token }): any {
			if (!token || token.tipo != 'userToken') {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.setValor(tanqueInput, [idTanqueOriginal], 'Tanque', [
					'idTanque'
				]);
			}
		},
		createTanque(__: void, { tanqueInput }, { token }): any {
			if (!token || token.tipo != 'userToken') {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.createValor(tanqueInput, 'Tanque', ['idTanque']);
			}
		},
		deleteTanque(__: void, { idTanqueInput }, { token }): any {
			if (!token) {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.deleteTanque(idTanqueInput);
			}
		},
		setLugar(__: void, { lugarInput, idLugarOriginal }, { token }): any {
			if (!token || token.tipo != 'userToken' || token.puesto == 'Operador') {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.setValor(lugarInput, [idLugarOriginal], 'Lugar', ['idLugar']);
			}
		},
		createLugar(__: void, { lugarInput }, { token }): any {
			if (!token || token.tipo != 'userToken' || token.puesto == 'Operador') {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.createValor(lugarInput, 'Lugar', ['idLugar']);
			}
		},
		setContenido(__: void, { contenidoInput, idContenidoOriginal }, { token }): any {
			if (!token || token.tipo != 'userToken' || token.puesto == 'Operador') {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.setValor(contenidoInput, [idContenidoOriginal], 'Contenido', [
					'idContenido'
				]);
			}
		},
		createContenido(__: void, { contenidoInput }, { token }): any {
			if (!token || token.tipo != 'userToken' || token.puesto == 'Operador') {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.createValor(contenidoInput, 'Contenido', ['idContenido']);
			}
		},
		setDueno(__: void, { duenoInput, idDuenoOriginal }, { token }): any {
			if (!token || token.tipo != 'userToken' || token.puesto != 'Admin') {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.setValor(duenoInput, [idDuenoOriginal], 'Dueno', ['idDueno']);
			}
		},
		createDueno(__: void, { duenoInput }, { token }): any {
			if (!token || token.tipo != 'userToken' || token.puesto != 'Admin') {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.createValor(duenoInput, 'Dueno', ['idDueno']);
			}
		},
		setMantenimiento(
			__: void,
			{ mantenimientoInput, idMantenimientoOriginal },
			{ token }
		): any {
			if (!token || token.tipo != 'userToken') {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.setValor(
					mantenimientoInput,
					idMantenimientoOriginal,
					'Mantenimiento',
					['idTanque', 'fechaMantenimiento']
				);
			}
		},
		createMantenimiento(__: void, { mantenimientoInput }, { token }): any {
			if (!token || token.tipo != 'userToken') {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.createValor(mantenimientoInput, 'Mantenimiento', [
					'idTanque',
					'fechaMantenimiento'
				]);
			}
		},
		setEtiqueta(__: void, { etiquetaInput, idEtiquetaOriginal }, { token }): any {
			if (!token || token.tipo != 'userToken') {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.setValor(etiquetaInput, idEtiquetaOriginal, 'EtiquetaRFID', [
					'idEtiqueta'
				]);
			}
		},
		createEtiqueta(__: void, { etiquetaInput }, { token }): any {
			if (!token || token.tipo != 'userToken') {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.createValor(etiquetaInput, 'EtiquetaRFID', ['idEtiqueta']);
			}
		},
		setHistorialPeso(
			__: void,
			{ historialPesoInput, idHistorialPesoOriginal },
			{ token }
		): any {
			if (!token || token.tipo != 'userToken') {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.setValor(
					historialPesoInput,
					idHistorialPesoOriginal,
					'HistorialPeso',
					['idTanque', 'fecha']
				);
			}
		},
		createHistorialPeso(__: void, { historialPesoInput }, { token }): any {
			if (!token || token.tipo != 'userToken') {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.createValor(historialPesoInput, 'HistorialPeso', [
					'idTanque',
					'fecha'
				]);
			}
		},
		setOperadoPor(__: void, { operadoPorInput, idOperadoPorOriginal }, { token }): any {
			if (!token || token.tipo != 'userToken') {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.setValor(
					operadoPorInput,
					idOperadoPorOriginal,
					'OperadoPor',
					['idTanque', 'fecha']
				);
			}
		},
		createOperadoPor(__: void, { operadoPorInput }, { token }): any {
			if (!token || token.tipo != 'userToken') {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.createValor(operadoPorInput, 'OperadoPor', [
					'idTanque',
					'fecha'
				]);
			}
		},
		async setTanqueEsta(
			__: void,
			{ tanqueEstaInput, idTanqueEstaOriginal },
			{ token, tokenHeader }
		) {
			let checkTokenLector = true;
			if (tokenHeader) {
				checkTokenLector = await mysqlMutations.verifyTokenLector(tokenHeader);
			}
			if (!token || token.tipo == 'refreshToken' || !checkTokenLector) {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.setValor(
					tanqueEstaInput,
					idTanqueEstaOriginal,
					'TanqueEsta',
					['idTanque']
				);
			}
		},
		createTanqueEsta(__: void, { tanqueEstaInput }, { token }): any {
			if (!token || token.tipo != 'userToken') {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.createValor(tanqueEstaInput, 'TanqueEsta', ['idTanque']);
			}
		},
		setTanqueHaEstado(
			__: void,
			{ tanqueHaEstadoInput, idTanqueHaEstadoOriginal },
			{ token }
		): any {
			if (!token || token.tipo != 'userToken') {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.setValor(
					tanqueHaEstadoInput,
					idTanqueHaEstadoOriginal,
					'TanqueHaEstado',
					['idTanque', 'idLugar', 'fecha']
				);
			}
		},
		createTanqueHaEstado(__: void, { tanqueHaEstadoInput }, { token }): any {
			if (!token || token.tipo != 'userToken') {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.createValor(tanqueHaEstadoInput, 'TanqueHaEstado', [
					'idTanque',
					'idLugar',
					'fecha'
				]);
			}
		},
		setUsuario(__: void, { usuarioInput, idUsuarioOriginal }, { token }): any {
			if (!token || token.tipo != 'userToken' || token.puesto == 'Operador') {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.setValor(usuarioInput, idUsuarioOriginal, 'Usuario', [
					'idUsuario'
				]);
			}
		},
		createUsuario(__: void, { usuarioInput }, { token }): any {
			if (!token || token.tipo != 'userToken' || token.puesto == 'Operador') {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.createValor(usuarioInput, 'Usuario', ['idUsuario']);
			}
		},
		cambiarContrasena(__: void, { contrasenaInput }, { token }): any {
			if (!token || token.tipo != 'userToken') {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.cambiarContrasena(contrasenaInput);
			}
		},
		login(__: void, { correo, contrasena }): any {
			return mysqlMutations.login(correo, contrasena);
		},
		refresh(__: void, { refreshJWT }): any {
			return mysqlMutations.refresh(refreshJWT);
		},
		logout(__: void, { idUsuario }, { token }): any {
			if (!token || token.tipo != 'userToken') {
				1;
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.logout(idUsuario);
			}
		},
		setLectorRFID(__: void, { lectorRFIDInput, idLectorRFIDOriginal }, { token }): any {
			if (!token || token.tipo != 'userToken' || token.puesto == 'Operador') {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.setValor(
					lectorRFIDInput,
					idLectorRFIDOriginal,
					'LectorRFID',
					['idLector']
				);
			}
		},
		createLectorRFID(__: void, { lectorRFIDInput }, { token }): any {
			if (!token || token.tipo != 'userToken' || token.puesto == 'Operador') {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.createValor(lectorRFIDInput, 'LectorRFID', ['idLector']);
			}
		},
		genTokenLector(__: void, { idLector }, { token }): any {
			if (!token || token.tipo != 'userToken' || token.puesto == 'Operador') {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.genTokenLector(idLector);
			}
		},
		disableTokenLector(__: void, { idLector }, { token }): any {
			if (!token || token.tipo != 'userToken' || token.puesto == 'Operador') {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.disableTokenLector(idLector);
			}
		},
		verifyTokenLector(__: void, { jwt_lector }, { token }): any {
			if (!token || token.tipo != 'userToken' || token.puesto == 'Operador') {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.verifyTokenLector(jwt_lector);
			}
		}
	}
};
export default mutation;
