import { IResolvers } from 'graphql-tools';
import mysqlMutations = require('../data/asyncMySQLMutations');

const mutation: IResolvers = {
	Mutation: {
		setTanque(__: void, { tanqueInput, idTanqueOriginal }): any {
			return mysqlMutations.setValor(
				tanqueInput,
				[idTanqueOriginal],
				'Tanque',
				['idTanque']
			);
		},
		createTanque(__: void, { tanqueInput }): any {
			return mysqlMutations.createValor(tanqueInput, 'Tanque', [
				'idTanque'
			]);
		},
		deleteTanque(__: void, { idTanqueInput }): any {
			return mysqlMutations.deleteTanque(idTanqueInput);
		},
		setLugar(__: void, { lugarInput, idLugarOriginal }): any {
			return mysqlMutations.setValor(
				lugarInput,
				[idLugarOriginal],
				'Lugar',
				['idLugar']
			);
		},
		createLugar(__: void, { lugarInput }): any {
			return mysqlMutations.createValor(lugarInput, 'Lugar', ['idLugar']);
		},
		setContenido(__: void, { contenidoInput, idContenidoOriginal }): any {
			return mysqlMutations.setValor(
				contenidoInput,
				[idContenidoOriginal],
				'Contenido',
				['idContenido']
			);
		},
		createContenido(__: void, { contenidoInput }): any {
			return mysqlMutations.createValor(contenidoInput, 'Contenido', [
				'idContenido'
			]);
		},
		setDueno(__: void, { duenoInput, idDuenoOriginal }): any {
			return mysqlMutations.setValor(
				duenoInput,
				[idDuenoOriginal],
				'Dueno',
				['idDueno']
			);
		},
		createDueno(__: void, { duenoInput }): any {
			return mysqlMutations.createValor(duenoInput, 'Dueno', ['idDueno']);
		},
		setMantenimiento(
			__: void,
			{ mantenimientoInput, idMantenimientoOriginal }
		): any {
			return mysqlMutations.setValor(
				mantenimientoInput,
				idMantenimientoOriginal,
				'Mantenimiento',
				['idTanque', 'fechaMantenimiento']
			);
		},
		createMantenimiento(__: void, { mantenimientoInput }): any {
			return mysqlMutations.createValor(
				mantenimientoInput,
				'Mantenimiento',
				['idTanque', 'fechaMantenimiento']
			);
		},
		setEtiqueta(__: void, { etiquetaInput, idEtiquetaOriginal }): any {
			return mysqlMutations.setValor(
				etiquetaInput,
				idEtiquetaOriginal,
				'EtiquetaRFID',
				['idEtiqueta']
			);
		},
		createEtiqueta(__: void, { etiquetaInput }): any {
			return mysqlMutations.createValor(etiquetaInput, 'EtiquetaRFID', [
				'idEtiqueta'
			]);
		},
		setHistorialPeso(
			__: void,
			{ historialPesoInput, idHistorialPesoOriginal }
		): any {
			return mysqlMutations.setValor(
				historialPesoInput,
				idHistorialPesoOriginal,
				'HistorialPeso',
				['idTanque', 'fecha']
			);
		},
		createHistorialPeso(__: void, { historialPesoInput }): any {
			return mysqlMutations.createValor(
				historialPesoInput,
				'HistorialPeso',
				['idTanque', 'fecha']
			);
		},
		setOperadoPor(
			__: void,
			{ operadoPorInput, idOperadoPorOriginal }
		): any {
			return mysqlMutations.setValor(
				operadoPorInput,
				idOperadoPorOriginal,
				'OperadoPor',
				['idTanque', 'fecha']
			);
		},
		createOperadoPor(__: void, { operadoPorInput }): any {
			return mysqlMutations.createValor(operadoPorInput, 'OperadoPor', [
				'idTanque',
				'fecha'
			]);
		},
		setTanqueEsta(
			__: void,
			{ tanqueEstaInput, idTanqueEstaOriginal }
		): any {
			return mysqlMutations.setValor(
				tanqueEstaInput,
				idTanqueEstaOriginal,
				'TanqueEsta',
				['idTanque']
			);
		},
		createTanqueEsta(__: void, { tanqueEstaInput }): any {
			return mysqlMutations.createValor(tanqueEstaInput, 'TanqueEsta', [
				'idTanque'
			]);
		},
		setTanqueHaEstado(
			__: void,
			{ tanqueHaEstadoInput, idTanqueHaEstadoOriginal }
		): any {
			return mysqlMutations.setValor(
				tanqueHaEstadoInput,
				idTanqueHaEstadoOriginal,
				'TanqueHaEstado',
				['idTanque', 'idLugar', 'fecha']
			);
		},
		createTanqueHaEstado(__: void, { tanqueHaEstadoInput }): any {
			return mysqlMutations.createValor(
				tanqueHaEstadoInput,
				'TanqueHaEstado',
				['idTanque', 'idLugar', 'fecha']
			);
		},
		setUsuario(__: void, { usuarioInput, idUsuarioOriginal }): any {
			return mysqlMutations.setValor(
				usuarioInput,
				idUsuarioOriginal,
				'Usuario',
				['idUsuario']
			);
		},
		createUsuario(__: void, { usuarioInput }): any {
			return mysqlMutations.createValor(usuarioInput, 'Usuario', [
				'idUsuario'
			]);
		},
		cambiarContrasena(__: void, { contrasenaInput }): any {
			return mysqlMutations.cambiarContrasena(contrasenaInput);
		},
		login(__: void, { correo, contrasena }): any {
			return mysqlMutations.login(correo, contrasena);
		},
		refresh(__: void, { refreshJWT }): any {
			return mysqlMutations.refresh(refreshJWT);
		}
	}
};
export default mutation;
