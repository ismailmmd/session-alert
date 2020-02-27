import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionDialogueModal, SessionDialogueService } from 'projects/session-alert-l/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'session-alert';
  loggedIn$: BehaviorSubject<boolean>;
  private dalogModal: SessionDialogueModal;

  constructor(private sessionDiolog: SessionDialogueService) {
    this.loggedIn$ = new BehaviorSubject<boolean>(true);
    this.dalogModal = new SessionDialogueModal('Session Warning!', 'Session is about to Expire', true);
  }

  ngOnInit(): void {
    this.sessionDiolog.initialise(this.dalogModal, this.loggedIn$);
  }
}
