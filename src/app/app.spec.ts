import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the learning page title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Build a clear page before making it complex',
    );
  });

  it('should switch the page language to Spanish', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const spanishButton = Array.from(compiled.querySelectorAll('button')).find((button) =>
      button.textContent?.includes('Español'),
    );

    spanishButton?.click();
    fixture.detectChanges();

    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Construye una pagina clara antes de hacerla compleja',
    );
  });
});
