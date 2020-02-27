import { TestBed } from '@angular/core/testing';

import { SessionDialogueService } from './session-dialogue.service';

describe('SessionDialogueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionDialogueService = TestBed.get(SessionDialogueService);
    expect(service).toBeTruthy();
  });
});
