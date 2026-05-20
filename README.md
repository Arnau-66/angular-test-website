# Web Prueba Codex

Proyecto sencillo en Angular 20 para practicar buenas bases de desarrollo web: estructura,
nombres claros, componentes standalone y estado local con signals.

## Como ejecutar el proyecto

No necesitas instalar Angular de forma global.

Requisitos recomendados:

- Node.js 20.19 o superior.
- npm incluido con Node.js.

```bash
npm install
npm start
```

Despues abre:

```text
http://localhost:4200
```

Tambien puedes usar el CLI local del proyecto:

```bash
npm run ng -- version
```

## Estructura principal

```text
src/
  app/
    app.ts       Logica del componente principal
    app.html     Plantilla HTML de la pagina
    app.scss     Estilos propios del componente
  styles.scss    Estilos globales de la aplicacion
```

La idea base es separar responsabilidades:

- `app.ts`: datos, estado y acciones.
- `app.html`: estructura visual y binding con Angular.
- `app.scss`: estilos de esta pantalla.
- `styles.scss`: reglas globales que afectan a toda la aplicacion.

## Signals usados

En `src/app/app.ts` hay dos signals principales:

```ts
protected readonly selectedArea = signal<CourseArea>('fundamentos');
protected readonly completedModules = signal(1);
```

Un `signal` guarda estado reactivo. Cuando cambia, Angular actualiza la vista donde ese valor se usa.

Tambien hay valores derivados con `computed`:

```ts
protected readonly visibleModules = computed(() =>
  this.modules.filter((module) => module.area === this.selectedArea())
);
```

Un `computed` sirve para calcular datos a partir de otros datos reactivos. Aqui no guardamos una segunda
lista manualmente; Angular la recalcula cuando cambia `selectedArea`.

## Naming

Los nombres intentan decir la intencion:

- `selectedArea`: area seleccionada ahora mismo.
- `completedModules`: cuantos modulos se han completado.
- `visibleModules`: modulos que deben verse segun el filtro actual.
- `progressPercentage`: porcentaje calculado a partir del progreso.
- `selectArea`: accion de usuario para cambiar de area.
- `completeNextModule`: accion para avanzar el progreso.
- `resetProgress`: accion para volver a empezar.

Una buena regla: si un nombre necesita explicarse demasiado, probablemente se puede mejorar.

## Buenas bases aplicadas

- Proyecto creado con dependencias locales, no Angular global.
- Componente standalone, que es el estilo moderno de Angular.
- HTML semantico con `main`, `section`, `article` y `aside`.
- Estado minimo con `signal`.
- Datos derivados con `computed`.
- Estilos separados por responsabilidad.
- Tipos explicitos para reducir errores: `CourseArea` y `LearningModule`.

## Antes de subirlo a GitHub

Sube el codigo fuente y el `package-lock.json`, pero no subas carpetas generadas.

El `.gitignore` ya excluye lo importante:

- `node_modules/`: dependencias instaladas localmente.
- `dist/`: resultado de compilacion.
- `.angular/cache/`: cache de Angular.
- `coverage/`: reportes de tests.

Otra persona podra abrir el proyecto con:

```bash
npm install
npm start
```

## Siguiente paso recomendado

Cuando esta base ya se entienda, lo natural seria separar la pagina en componentes pequenos:

- `HeroSection`
- `ProgressPanel`
- `ModuleTabs`
- `ModuleCard`

No lo hice todavia porque para una primera clase conviene ver el flujo completo en un solo lugar antes
de dividirlo.
