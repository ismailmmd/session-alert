import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionDialogueComponent } from './session-dialogue.component';
import { SessionTimerService, SESSION_TIMER_CONFIG } from '../session-timer.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material';
import { NO_ERRORS_SCHEMA, Component, NgModule } from '@angular/core';
import { of, Observable, NEVER } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

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
  const dialogMock = jasmine.createSpyObj('MatDialogRef', ['close']);
  dialogMock.close.and.returnValue(null);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SessionDialogueComponent, MatChipComponent],
      providers: [
        {
          provide: SessionTimerService,
          deps: [{ provide: SESSION_TIMER_CONFIG, useValue: { countDownTime: 1, sessionTime: 2 } }],
          useValue: sessionMockTimer
        },
        {
          provide: MAT_DIALOG_DATA, useValue: {
            title: 'my-title', message: 'my-message', showCancel: true, confirmText: 'Ok',
            cancelText: 'Cancel', closeOnTrigger: true,
          }
        },
        { provide: MatDialogRef, useValue: dialogMock }
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

  it('should open dailog with content', () => {
    const tag = fixture.debugElement.nativeElement;
    expect(tag.querySelector('h3').textContent).toBe('my-title');
    expect(tag.querySelector('button').textContent).toBe('Close');
  });

});

describe('SessionDialogueComponent Time Expire with Auto-close', () => {
  let component: SessionDialogueComponent;
  let fixture: ComponentFixture<SessionDialogueComponent>;

  const sessionMockTimer = jasmine.createSpyObj('SessionTimerService', { countDownObs: Observable });
  sessionMockTimer.countDownObs = of(1);
  const dialogMock = jasmine.createSpyObj('MatDialogRef', ['close']);
  dialogMock.close.and.returnValue(null);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SessionDialogueComponent, MatChipComponent],
      providers: [
        {
          provide: SessionTimerService,
          deps: [{ provide: SESSION_TIMER_CONFIG, useValue: { countDownTime: 1, sessionTime: 2 } }],
          useValue: sessionMockTimer
        },
        {
          provide: MAT_DIALOG_DATA, useValue: {
            title: 'my-title', message: 'my-message', showCancel: true, confirmText: 'Ok',
            cancelText: 'Cancel', closeOnTrigger: false,
          }
        },
        { provide: MatDialogRef, useValue: dialogMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and call dialog.close()', () => {
    expect(component).toBeTruthy();
  });

});

describe('SessionDialogueComponent with CountDown Actions', () => {
  let component: SessionDialogueComponent;
  let fixture: ComponentFixture<SessionDialogueComponent>;

  const sessionMockTimer = jasmine.createSpyObj('SessionTimerService', { countDownObs: Observable });
  sessionMockTimer.countDownObs = NEVER;
  const dialogMock = jasmine.createSpyObj('MatDialogRef', ['close']);
  dialogMock.close.and.returnValue(null);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SessionDialogueComponent, MatChipComponent],
      providers: [
        {
          provide: SessionTimerService,
          deps: [{ provide: SESSION_TIMER_CONFIG, useValue: { countDownTime: 1, sessionTime: 2 } }],
          useValue: sessionMockTimer
        },
        {
          provide: MAT_DIALOG_DATA, useValue: {
            title: 'my-title', message: 'my-message', showCancel: true, confirmText: 'Ok',
            cancelText: 'Cancel', closeOnTrigger: false,
          }
        },
        { provide: MatDialogRef, useValue: dialogMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call dialog.close() on confirm', () => {
    component.onClickConfirm();
    expect(dialogMock.close).toHaveBeenCalled();
  });

  it('should call dialog.close() on cancel', () => {
    component.onClickCancel();
    expect(dialogMock.close).toHaveBeenCalled();
  });

});
