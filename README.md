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
