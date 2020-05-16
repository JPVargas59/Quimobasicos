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

To start graphql Apollo Server

```
cd Node_Back
npm run start:dev
```

### Pendientes

#### GraphQL

-   [x] Realizar schema de GraphQL

#### Queries

-   [x] Obtener información de todos los tanques registrados
-   [ ] Obtener los tanques de acuerdo a una caracteristica
-   [ ] Obtener información de todos los materiales registrados
-   [ ] Obtener los tanques de acuerdo a su nombre o clave
-   [ ] Obtener información de todos los lugares registrados
-   [ ] Obtener los lugares de acuerdo a su nombre o clave

#### Mutations

-   [x] Dar de alta un tanque
-   [x] Modificar los datos de un tanque
-   [x] Eliminar un tanque
-   [ ] Dar de alta un materia
-   [ ] Dar de alta un lugar
