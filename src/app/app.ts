import { Component, computed, signal } from '@angular/core';

type CourseArea = 'fundamentals' | 'angular' | 'project';
type Language = 'en' | 'es';

interface TranslatedText {
  readonly en: string;
  readonly es: string;
}

interface LearningArea {
  readonly id: CourseArea;
  readonly label: TranslatedText;
}

interface LearningModule {
  readonly id: number;
  readonly title: TranslatedText;
  readonly description: TranslatedText;
  readonly area: CourseArea;
  readonly duration: string;
}

const translations = {
  en: {
    languageLabel: 'Language',
    heroEyebrow: 'Angular 20 from solid foundations',
    heroTitle: 'Build a clear page before making it complex',
    heroSummary:
      'This example shows simple structure, readable names, reactive state, and a small language switcher. The goal is to read the project like a well-organized first lesson.',
    progressActions: 'Progress actions',
    completeModule: 'Complete module',
    reset: 'Reset',
    progressAria: 'Course progress',
    progress: 'Progress',
    completedText: 'of',
    completedSuffix: 'modules completed',
    mainContent: 'Main content',
    learningPath: 'Learning path',
    filterTitle: 'Filter modules by stage',
    courseStages: 'Course stages',
    principlesEyebrow: 'Good foundations',
    principlesTitle: 'Decisions that help a project grow better',
    principles: [
      'A single app folder for the main experience.',
      'Names that explain intent: selectedLanguage, selectedArea, visibleModules.',
      'Minimal state with signal and derived data with computed.',
      'A small typed dictionary before adding a full i18n library.'
    ]
  },
  es: {
    languageLabel: 'Idioma',
    heroEyebrow: 'Angular 20 desde buenas bases',
    heroTitle: 'Construye una pagina clara antes de hacerla compleja',
    heroSummary:
      'Este ejemplo muestra una estructura sencilla, nombres legibles, estado reactivo y un pequeno selector de idioma. La idea es leer el proyecto como una primera clase bien ordenada.',
    progressActions: 'Acciones de progreso',
    completeModule: 'Completar modulo',
    reset: 'Reiniciar',
    progressAria: 'Progreso del curso',
    progress: 'Progreso',
    completedText: 'de',
    completedSuffix: 'modulos completados',
    mainContent: 'Contenido principal',
    learningPath: 'Ruta de aprendizaje',
    filterTitle: 'Filtra los modulos por etapa',
    courseStages: 'Etapas del curso',
    principlesEyebrow: 'Buenas bases',
    principlesTitle: 'Decisiones que hacen crecer mejor un proyecto',
    principles: [
      'Una carpeta app para la experiencia principal.',
      'Nombres que explican intencion: selectedLanguage, selectedArea, visibleModules.',
      'Estado minimo con signal y datos derivados con computed.',
      'Un diccionario tipado pequeno antes de anadir una libreria i18n completa.'
    ]
  }
} as const;

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly selectedLanguage = signal<Language>('en');
  protected readonly selectedArea = signal<CourseArea>('fundamentals');
  protected readonly completedModules = signal(1);

  protected readonly languages = [
    { id: 'en', label: 'English' },
    { id: 'es', label: 'Español' }
  ] as const;

  protected readonly areas: readonly LearningArea[] = [
    { id: 'fundamentals', label: { en: 'Fundamentals', es: 'Fundamentos' } },
    { id: 'angular', label: { en: 'Angular 20', es: 'Angular 20' } },
    { id: 'project', label: { en: 'Final project', es: 'Proyecto final' } }
  ];

  protected readonly modules: readonly LearningModule[] = [
    {
      id: 1,
      title: { en: 'Semantic HTML and structure', es: 'HTML semantico y estructura' },
      description: {
        en: 'Learn to organize content with clear tags and maintainable names.',
        es: 'Aprende a ordenar contenido con etiquetas claras y nombres faciles de mantener.'
      },
      area: 'fundamentals',
      duration: '35 min'
    },
    {
      id: 2,
      title: { en: 'Base CSS and visual system', es: 'CSS base y sistema visual' },
      description: {
        en: 'Define colors, spacing, and small components before growing the interface.',
        es: 'Define colores, espaciados y componentes pequenos antes de crecer la interfaz.'
      },
      area: 'fundamentals',
      duration: '45 min'
    },
    {
      id: 3,
      title: { en: 'Signals for local state', es: 'Signals para estado local' },
      description: {
        en: 'Use signal and computed so the view reacts to changes without accidental noise.',
        es: 'Usa signal y computed para que la vista responda a cambios sin ruido accidental.'
      },
      area: 'angular',
      duration: '50 min'
    },
    {
      id: 4,
      title: { en: 'Standalone components', es: 'Componentes standalone' },
      description: {
        en: 'Organize small screens with explicit imports and visible responsibilities.',
        es: 'Organiza pantallas pequenas con imports explicitos y responsabilidades visibles.'
      },
      area: 'angular',
      duration: '40 min'
    },
    {
      id: 5,
      title: { en: 'Simple landing page delivery', es: 'Entrega de una landing simple' },
      description: {
        en: 'Combine content, styles, and interactive state in a page that can evolve.',
        es: 'Une contenido, estilos y estado interactivo en una pagina lista para evolucionar.'
      },
      area: 'project',
      duration: '60 min'
    }
  ];

  protected readonly copy = computed(() => translations[this.selectedLanguage()]);

  protected readonly visibleModules = computed(() =>
    this.modules.filter((module) => module.area === this.selectedArea())
  );

  protected readonly progressPercentage = computed(() =>
    Math.round((this.completedModules() / this.modules.length) * 100)
  );

  protected selectLanguage(language: Language): void {
    this.selectedLanguage.set(language);
  }

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
