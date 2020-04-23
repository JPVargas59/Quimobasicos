var { gql } = require('apollo-server-express');

const schema = gql`
	"Interfaces"
	interface Empleado {
		idUsuario: ID
		nobmres: String
		apellidos: String
		password: String
		genero: Int
		correo: String
	}

	"Objetos"
	type Owner {
		id: ID!
		nombre: String!
	}
	type Tanque {
		idTanque: ID!
		calidad: String
		estadoValvula: String
		pesoActual: Float
		peso: Float
		fechaEsperadaRegreso: String
		etiquetarfid: etiquetarfid
		duenoTanque: Owner
		contenidoTanque: Contenido
		lugar: Lugar
		haEstado: [HistorialTanque]
	}
	type etiquetarfid {
		idEtiqueta: ID!
	}
	type Contenido {
		idContenido: ID!
		contenido: String!
	}
	type Lugar {
		idLugar: ID!
		radio: Float
		capacidadMaxima: Int
		coordenadas: String
		tanques: [Tanque]
	}
	type Usuario implements Empleado {
		idUsuario: ID
		nobmres: String
		apellidos: String
		password: String
		genero: Int
		correo: String
	}
	type Operador implements Empleado {
		idUsuario: ID
		nobmres: String
		apellidos: String
		password: String
		genero: Int
		correo: String
		supervisor: Usuario
	}
	type Operacion {
		operador: Usuario
		tanque: Tanque
		fecha: String
	}
	type HistorialTanque {
		tanque: Tanque
		lugar: Lugar
		fecha: String
	}

	"Queries"
	type Query {
		hello: String
	}
`;

exports.schema = schema;
