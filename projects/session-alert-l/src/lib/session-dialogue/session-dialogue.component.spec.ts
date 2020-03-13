import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionDialogueComponent } from './session-dialogue.component';
import { SessionTimerService, SESSION_TIMER_CONFIG } from '../session-timer.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { of, Observable } from 'rxjs';

/**
 * Stubs for Testcases to run
 */
// tslint:disable-next-line: component-selector
@Component({ selector: 'mat-chip', template: '' })
class MatChipComponent { }

describe('SessionDialogueComponent', () => {
  let component: SessionDialogueComponent;
  let fixture: ComponentFixture<SessionDialogueComponent>;
  const sessionMockTimer = jasmine.createSpyObj('SessionTimerService', { countDownObs: Observable });
  sessionMockTimer.countDownObs = of(1);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SessionDialogueComponent, MatChipComponent],
      providers: [
        {
          provide: SessionTimerService,
          deps: [{ provide: SESSION_TIMER_CONFIG, useValue: { countDownTime: 1, sessionTime: 2 } }],
          useValue: sessionMockTimer
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
      // schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
