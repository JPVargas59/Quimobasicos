# Quimobásicos

## Setup opcional de VS Code

### Prettier

#### Extensiones necesarias:

- [esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

#### Pasos:

1. Crear un directorio llamado `.vscode` y crear los siguientes archivos dentro.
2. Crear `.prettierrc.json` con el siguiente contenido:

```json
{
  "trailingComma": "none",
  "singleQuote": true,
  "useTabs": true
}
```

3. Crear `setting.json` con el siguiente contenido:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```
