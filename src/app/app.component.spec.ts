import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SessionDialogueService } from 'projects/session-alert-l/src/public-api';

describe('AppComponent', () => {

  beforeEach(async(() => {
    const sessionMockService = jasmine.createSpyObj('SessionDialogueService', ['initialise']);
    sessionMockService.initialise.and.returnValue(null);

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: SessionDialogueService,
          useValue: sessionMockService
        }]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'session-alert'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('session-alert');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to session-alert!');
  });

  it('should change title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.title = 'new-title';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('new-title');
  });
});
