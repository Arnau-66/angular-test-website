# Angular Test Website

A beginner-friendly Angular 20 project built to practice the foundations of modern Angular development.

The goal of this repository is not to build a complex application. It is a small learning project focused on clean structure, readable naming, standalone components, Angular signals, computed state, and basic UI organization.

## What This Project Practices

- Angular 20 project structure.
- Standalone component setup.
- Local reactive state with `signal`.
- Derived state with `computed`.
- Template control flow with `@for`.
- Semantic HTML structure.
- Component-level SCSS.
- Clear naming for state, data, and user actions.
- Basic project hygiene for a GitHub repository.

## Getting Started

You do not need to install Angular globally.

Recommended requirements:

- Node.js 20.19 or higher.
- npm, included with Node.js.

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm start
```

Open the app in your browser:

```text
http://localhost:4200
```

You can also use the local Angular CLI through npm:

```bash
npm run ng -- version
```

## Project Structure

```text
src/
  app/
    app.ts       Main component logic
    app.html     Main component template
    app.scss     Main component styles
  styles.scss    Global application styles
```

The project keeps responsibilities separated:

- `app.ts` contains state, data, and actions.
- `app.html` contains the page structure and Angular bindings.
- `app.scss` contains styles for the main component.
- `styles.scss` contains global styles shared by the application.

## Angular Signals

The main component uses `signal` for local state:

```ts
protected readonly selectedArea = signal<CourseArea>('fundamentos');
protected readonly completedModules = signal(1);
```

A signal stores reactive state. When the value changes, Angular updates the parts of the template that depend on it.

The component also uses `computed` for derived state:

```ts
protected readonly visibleModules = computed(() =>
  this.modules.filter((module) => module.area === this.selectedArea())
);
```

This avoids storing duplicated state. The visible modules are calculated from the selected area whenever Angular needs the updated value.

## Naming Approach

Names are intentionally descriptive:

- `selectedArea`: the currently selected learning area.
- `completedModules`: the number of completed modules.
- `visibleModules`: the modules shown for the selected area.
- `progressPercentage`: the calculated progress value.
- `selectArea`: user action to change the selected area.
- `completeNextModule`: user action to increase progress.
- `resetProgress`: user action to reset progress.

A useful rule: if a name needs too much explanation, it can probably be improved.

## Repository Notes

This repository should include source code and lock files, but not generated folders.

The `.gitignore` already excludes common generated files:

- `node_modules/`
- `dist/`
- `.angular/cache/`
- `coverage/`

Another developer can clone the repository and run it with:

```bash
npm install
npm start
```

## Possible Next Steps

Once the basics are clear, the main component could be split into smaller components:

- `HeroSection`
- `ProgressPanel`
- `ModuleTabs`
- `ModuleCard`

For this first learning version, the logic is kept in one place so the full flow is easier to read.
