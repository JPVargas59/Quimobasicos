# Quimobásicos

## Setup opcional de VS Code

### Prettier

#### Extensiones necesarias:

-   [esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

#### Pasos:

1. Crear un directorio llamado `.vscode` y crear el siguiente archivo dentro.
2. Crear `setting.json` con el siguiente contenido:

```json
{
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	"editor.formatOnSave": true
}
```

3. Crear `.prettierrc.json` con el siguiente contenido en el directorio raíz:

```json
{
	"trailingComma": "none",
	"singleQuote": true,
	"useTabs": true,
	"tabWidth": 4,
	"semi": true
}
```

## Configurar base de datos local

* Crear archivo .env en Node_Back con los siguientes datos
```
DBUSER=password
DBPASSWORD=usuario
DBSCHEMA=quimobasicos
DBPORT=3306
DBHOST=localhost
```

## To start graphql Apollo Server

```
cd Node_Back
npm run start:dev
```

### Pendientes

#### GraphQL

-   [x] Realizar schema de GraphQL

#### Queries

-   [x] Obtener información de todos los tanques registrados
-   [x] Obtener los tanques de acuerdo a id
-   [x] Obtener información de todos los materiales registrados
-   [x] Obtener los duenos
-   [x] Obtener los duenos por id
-   [x] Obtener información de todos los lugares registrados
-   [x] Obtener información lugares registrados por id
-   [x] Obtener los contenidos
-   [x] Obtener los contenidos por id
-   [x] Obtener las etiquetas RFID
-   [x] Obtener la etiqueta RFID por id
-   [x] Obtener el historial de peso de tanques
-   [x] Obtener el historial de peso de un tanque por id


#### Mutations

-   [x] Dar de alta un tanque
-   [x] Modificar los datos de un tanque
-   [x] Eliminar un tanque
-   [x] Dar de alta un contenido
-   [x] Modificar un contenido
-   [x] Dar de alta un lugar
-   [x] Modificar un lugar
-   [x] Dar de alta un dueño
-   [x] Modificar un dueño
-   [x] Dar de alta un mantenimiento
-   [x] Modificar un mantenimiento
-   [x] Dar de alta un operador
-   [x] Modificar un operador
-   [x] Dar de alta usuario
-   [x] Modificar un usuario
-   [x] Dar de alta una operación
-   [x] Modificar una operación
-   [x] Dar de alta una etiqueta
-   [x] Modificar una etiqueta
-   [x] Dar de alta un tanqueEsta
-   [x] Modificar un tanqueEsta
-   [x] Dar de alta un tanqueHaEstado
-   [x] Modificar un tanqueHaEstado
