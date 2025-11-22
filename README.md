# Evaluación 2 - Desarrollo Móvil — TODO List

Aplicación de lista de tareas (TODO) desarrollada con React Native + Expo y TypeScript. Proyecto creado como parte de la Evaluación 2 del curso de Desarrollo de Aplicaciones Móviles.

## Características

- Gestión de tareas: crear, editar, completar y eliminar tareas.
- Interfaz con navegación por pestañas (tabs).
- Formularios controlados (validación básica).
- Persistencia local del usuario (simulada con `AsyncStorage`).
- Componentes reutilizables y hooks personalizados para la lógica de TODOs.

## Credenciales de prueba (solo para testing)

Usa estas cuentas para acceder a la aplicación durante pruebas:

- Email: `demo@eva.com`  
	Password: `S3guro!2024`
- Email: `visitante@eva.com`  
	Password: `Visit@123`

Nota: Estas credenciales están definidas en `constants/auth.ts` y se usan solo como datos de ejemplo en la evaluación.

## Tecnologías

- Expo (React Native)
- React
- TypeScript
- `@react-native-async-storage/async-storage` (para simulación de sesión)
- Metro bundler (dev server)
- Node.js, npm/yarn

## Requisitos

- Node.js (14+ recomendado)
- npm o yarn
- Opcional: Expo CLI (`npm install -g expo-cli`) para usar comandos globales

## Instalación y ejecución

Instala dependencias
npm install
Inicia la aplicación (abrirá el panel de Expo)
npx expo start
Abre la app en un emulador o dispositivo con Expo Go / development build según prefieras.

## Estructura principal del proyecto

- `app/` — Pantallas y rutas (puntos de entrada de la UI).
- `components/` — Componentes reutilizables (`TodoItem.tsx`, `TodoForm.tsx`, etc.).
- `hooks/` — Hooks personalizados (`useTodos.ts`).
- `assets/` — Fuentes e imágenes.
- `constants/` — Constantes y utilidades (ej. `auth.ts`, `Colors.ts`).
- `package.json` — Dependencias y scripts.
- `tsconfig.json` — Configuración de TypeScript.


## Licencia
Este proyecto es de uso académico y está estríctamente prohibido su uso para usos comerciales.

## Licencia

## Autores
Miembros del equipo y roles:
- Luciano Lopresti: Desarollo.
- Sebastián Masferrer: Desarrollo.
- Loretto Herrera: QA.