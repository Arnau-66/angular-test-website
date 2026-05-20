import { Component, computed, signal } from '@angular/core';

type CourseArea = 'fundamentos' | 'angular' | 'proyecto';

interface LearningModule {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly area: CourseArea;
  readonly duration: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly selectedArea = signal<CourseArea>('fundamentos');
  protected readonly completedModules = signal(1);

  protected readonly areas = [
    { id: 'fundamentos', label: 'Fundamentos' },
    { id: 'angular', label: 'Angular 20' },
    { id: 'proyecto', label: 'Proyecto final' }
  ] as const;

  protected readonly modules: readonly LearningModule[] = [
    {
      id: 1,
      title: 'HTML semantico y estructura',
      description: 'Aprende a ordenar contenido con etiquetas claras y nombres faciles de mantener.',
      area: 'fundamentos',
      duration: '35 min'
    },
    {
      id: 2,
      title: 'CSS base y sistema visual',
      description: 'Define colores, espaciados y componentes pequenos antes de crecer la interfaz.',
      area: 'fundamentos',
      duration: '45 min'
    },
    {
      id: 3,
      title: 'Signals para estado local',
      description: 'Usa signal y computed para que la vista responda a cambios sin ruido accidental.',
      area: 'angular',
      duration: '50 min'
    },
    {
      id: 4,
      title: 'Componentes standalone',
      description: 'Organiza pantallas pequenas con imports explicitos y responsabilidades visibles.',
      area: 'angular',
      duration: '40 min'
    },
    {
      id: 5,
      title: 'Entrega de una landing simple',
      description: 'Une contenido, estilos y estado interactivo en una pagina lista para evolucionar.',
      area: 'proyecto',
      duration: '60 min'
    }
  ];

  protected readonly visibleModules = computed(() =>
    this.modules.filter((module) => module.area === this.selectedArea())
  );

  protected readonly progressPercentage = computed(() =>
    Math.round((this.completedModules() / this.modules.length) * 100)
  );

  protected selectArea(area: CourseArea): void {
    this.selectedArea.set(area);
  }

  protected completeNextModule(): void {
    this.completedModules.update((currentTotal) =>
      Math.min(currentTotal + 1, this.modules.length)
    );
  }

  protected resetProgress(): void {
    this.completedModules.set(0);
  }
}
