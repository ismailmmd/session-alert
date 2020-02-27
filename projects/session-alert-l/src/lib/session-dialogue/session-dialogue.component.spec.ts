import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionDialogueComponent } from './session-dialogue.component';

describe('SessionDialogueComponent', () => {
  let component: SessionDialogueComponent;
  let fixture: ComponentFixture<SessionDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionDialogueComponent ]
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
