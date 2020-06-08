# GraphQL: Mutaciones

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

-   [GraphQL: Mutaciones](#graphql-mutaciones)
    -   [Esquema en GraphQL](#esquema-en-graphql)
    -   [Resolvers](#resolvers)
        -   [Create](#create)
        -   [Set](#set)
    -   [Conexión entre DB y GraphQL](#conexión-entre-db-y-graphql)
        -   [Cliente](#cliente)
        -   [Environment variables](#environment-variables)
    -   [Manipulación de base de datos](#manipulación-de-base-de-datos)
        -   [parseObj()](#parseobj)
        -   [checkExists()](#checkexists)

<!-- /code_chunk_output -->

## Esquema en GraphQL

El esquema de GraphQL está definido en el archivo `/Node_Back/src/schemas/schema.graphql`.

La estructura para definir mutaciones es siguiente:

```graphql
type Mutation {
	mutacion(input: String): String
}
```

En caso de que el input que se desea recibir para la mutación sea más completo, se pueden definir los inputs, por ejemplo.

```graphql
input usuario {
	nombre: String
	correo: String
	edad: Int
}

type Mutation {
	crearUsuario(datosUsuario: usuario): String
}
```

Este esquema indica que recibe como input un usuario con los datos definidos por el esquema.

Ejemplo del proyecto:

```graphql
input ContenidoInput {
	id: String
	contenido: String
}

type Mutation {
	createContenido(contenidoInput: ContenidoInput!): String
}
```

Para más información consultar en los siguientes enlaces:

-   [GraphQL: Basic Types](https://graphql.org/graphql-js/basic-types/)
-   [GraphQL: Schemas and Types](https://graphql.org/learn/schema/)
-   [GraphQL: Mutations and Input Types](https://graphql.org/graphql-js/mutations-and-input-types/)

## Resolvers

Cada mutación es una función que tiene asignado un resolver, es decir, una función que cumple la funcionalidad descrita por el esquema.

Los resolvers están definidos en el archivo `/Node_Back/src/resolvers/mutation.ts` y tienen la siguiente estructura:

```ts
import { IResolvers } from 'graphql-tools';
import mysqlMutations = require('../data/asyncMySQLMutations');

const mutation: IResolvers = {
	Mutation: {
		setContenido(__: void, { contenidoInput, idContenidoOriginal }, { token }): any {
			if (!token) {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.setValor(contenidoInput, [idContenidoOriginal], 'Contenido', [
					'idContenido'
				]);
			}
		},
		createContenido(__: void, { contenidoInput }, { token }): any {
			if (!token) {
				throw new Error('Acceso no autorizado');
			} else {
				return mysqlMutations.createValor(contenidoInput, 'Contenido', ['idContenido']);
			}
		}
	}
};
```

IResolvers permite definir las funciones como resolvers del esquema de GraphQL, mientras que mysqlMutations permite separar el acceso a datos y funciona para modularizar el código, permitiendo que cada archivo cumpla su función.

En este archivo se hace la validación de que la petición para hacer la mutación tenga los permisos necesarios, los cuales se pueden ver gracias al token que se obtiene de `server.ts`. Una vez que se comprueba que se tienen los permisos necesarios, se llama a las funciones de `createValor()` o `setValor()`.

### Create

La función `createValor()` sirve para, como su nombre lo inidca, crear una entrada en la base de datos.

La función `createValor()` toma como input lo siguiente:

`createValor(input, table, mysqlId)`

-   La variable de la mutación que contiene un objeto con los datos del input, en el caso del ejemplo, el objeto contenidoInput contiene el id y el nombre del contenido.
-   El segundo argumento es la tabla de la base de datos en la que se va a insertar el objeto.
-   El último argumento es un arreglo con las columnas que forman la llave primaria de la tabla del objeto en la base de datos.

### Set

La función `setValor()` sirve para actualizar los datos de alguna entrada ya existente en la base de datos.

La función `setValor()` toma como input lo siguiente:

`setValor(input, idOriginal, table, mysqlId)`

-   El primer argumento es el objeto con los datos del input, tal como se mostró en el ejemplo anterior.
-   El segundo argumento que se toma es un arreglo con los datos que conforman la llave primaria de la entrada a actualizar.
-   El tercer argumento es la tabla de la base de datos que se busca actualizar.
-   El último argumento es un arreglo con las columnas que forman la llave primaria de la tabla en la base de datos.

## Conexión entre DB y GraphQL

Como se puede ver en los resolvers de cada mutación, hay una llamada a un archivo llamado `/Node_Back/src/data/asyncMySQLMutations.ts`. Este archivo, como su nombre lo indica, relaciona las mutaciones con la conexión a la base de datos en MySQL. Este archivo establece las conexiones que `/Node_Back/src/resolvers/mutations.ts` necesita para resolver las mutaciones que se hacen en el servidor de GraphQL.

El código en este archivo tiene las dos funciones que se presentaron anteriormente `setValor()` y `createValor()`, pero además tiene funciones específicas que no pueden cumplirse con funciones genéricas, algunos ejemplos son hacer login, cambiar contraseñas, cerrar sesión, etc

La estructura general del archivo (sin presentar las funciones más específicas) es la siguiente:

```ts
var common = require('../Common/mysqlMutations');
import client from '../client';

function quitClient(client, resp) {
	client.quit();
	return resp;
}

let mysqlMutations = {
	async createValor(input, table, mysqlId) {
		var resp = await common.createValor(client, input, table, mysqlId);
		return quitClient(client, resp);
	},
	async setValor(input, idOriginal, table, mysqlId) {
		let resp = await common.setValor(client, input, idOriginal, table, mysqlId);
		return quitClient(client, resp);
	}
};
```

### Cliente

El cliente que se pasa como argumento a todas las llamadas de las mutaciones de MySQL contiene los detalles para establecer una conexión a la base de datos. El código en `/Node_Back/src/client.ts` es el siguiente:

```ts
const Client = require('serverless-mysql');
var client = Client({
	config: {
		host: process.env.DBHOST,
		port: process.env.DBPORT,
		database: process.env.DBSCHEMA,
		user: process.env.DBUSER,
		password: process.env.DBPASSWORD
	}
});

export default client;
```

### Environment variables

Por seguridad, y por facilidad de user el programa en distintos equipos, todas las credenciales del cliente se encuentran almacenadas en las environment variables del proceso que ejecuta el servidor de GraphQL.

Para establecer estas variables hay que crear un archivo llamado `.env` en el directorio `/Node_Back`. La definición de las variables se hace de la siguiente manera:

```
DBUSER=aquiVaElUsuario
DBPASSWORD=aquiVaLaContraseña
DBSCHEMA=aquiVaElEsquema
DBPORT=3306
DBHOST=localhost
```

## Manipulación de base de datos

Todas las llamadas directas a la base de datos se manejan en el archivo `/Node_Back/src/Common/mysqlMutations.ts`. La estructura de este archivo es la siguiente:

```ts
import mysql from 'mysql';
let bcryptjs = require('bcryptjs');
let jwt = require('jsonwebtoken');
let fsPromises = require('fs').promises;
let path = require('path');

let mysqlMutations = {
	async createValor(client, input, table, mysqlId) {
		if (await checkExists(client, table, mysqlId, validateId(input.id))) {
			return `El ID de ${table} ya existe`;
		} else {
			let resp: String = `Instancia de ${table} creada`;
			input = await modifyId(table, input);
			await client.query(`INSERT INTO ?? SET ?`, [table, input]).catch((error) => {
				console.log(error);
				resp = error.sqlMessage;
			});
			return resp;
		}
	},
	async setValor(client, input, idOriginal, table, mysqlId) {
		idOriginal = validateId(idOriginal);
		if (await checkExists(client, table, mysqlId, idOriginal)) {
			//console.log(input);
			input = await modifyId(table, input);
			//console.log(input);
			let resp = `El valor de ${table} ha sido actualizado`;
			var obj = {
				queryString: `UPDATE ?? SET ? WHERE`,
				arr: [table, input],
				mysqlId: mysqlId,
				id: idOriginal
			};
			obj = parseObj(obj);
			//console.log(obj);
			await client.query(obj.queryString, obj.arr).catch((error) => {
				console.log(error);
				resp = error.sqlMessage;
			});
			return resp;
		} else {
			return `El ID de ${table} no existe`;
		}
	}
};
export = mysqlMutations;
```

Este código es el que se usa para manipular todas las mutaciones de create y set para todos los tipos del esquema de GraphQL. Son dos funciones genéricas que cubren todos los casos para crear y modificar los datos dentro de la base de datos. Las dos funciones hacen llamadas a varias funciones locales del archivo, las cuales se presentan a continuación.

### parseObj()

Esta función de encarga de modificar un objeto que recibe para crear hacer queries a la base de datos. El código de la función es el siguiente:

```ts
function parseObj(obj) {
	//console.log(obj);
	//console.log(obj.mysqlId.length);
	for (var i = 0; i < obj.mysqlId.length; i++) {
		if (i == obj.id.length - 1) {
			obj.queryString += ` ?? = ?`;
		} else {
			obj.queryString += ` ?? = ? AND`;
		}
		//console.log(i);
		//console.log(obj.queryString);
		obj.arr.push(obj.mysqlId[i]);
		obj.arr.push(obj.id[i]);
	}
	return obj;
}
```

Un ejemplo del tipo de input que puede recibir la función es el siguiente:

```ts
obj {
  queryString: 'SELECT * FROM ?? WHERE',
  arr: [ 'Lugar' ],
  mysqlId: [ 'idLugar' ],
  id: [ 'LUGAR1' ]
}
```

La función simplemente acomoda un arreglo con los detalles que se usarán para hacer un query de SQL. En este caso, el resultado de la función sería el siguiente objeto

```ts
obj {
  queryString: 'SELECT * FROM ?? WHERE ?? = ?',
  arr: [ 'Lugar', 'idLugar', 'LUGAR1|' ],
  mysqlId: [ 'idLugar' ],
  id: [ 'LUGAR1|' ]
}
```

La función se puede usar para poner los elementos finales cuando se quiere hacer un `SELECT` o un `UPDATE` de los datos. El objeto que se obtiene es usado para hacer un query a la base de datos con la siguiente estructura:

```ts
await client.query(obj.queryString, obj.arr);
```

Tomando el ejemplo del objeto anterior, la petición traducida a una declaración de SQL sería la siguiente:

```sql
SELECT * FROM Lugar WHERE idLugar = LUGAR1
```

Para más información del manejo de queries con las librerías de mysql:

-   [npm mysql](https://www.npmjs.com/package/mysql)
-   [npm serverless-mysql](https://www.npmjs.com/package/serverless-mysql)
