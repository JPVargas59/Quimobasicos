# GraphQL: Mutaciones

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

-   [GraphQL: Mutaciones](#graphql-mutaciones)
    -   [Esquema en GraphQL](#esquema-en-graphql)
    -   [Resolvers](#resolvers)
        -   [Create](#create)
        -   [Set](#set)

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
