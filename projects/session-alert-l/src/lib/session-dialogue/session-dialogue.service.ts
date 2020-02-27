import { SessionTimerService } from '../session-timer.service';
import { SessionDialogueModal } from './session-dialogue.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { SessionDialogueComponent } from './session-dialogue.component';

export class SessionDialogueService {

  private _loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private sessionTimer: SessionTimerService,
    private dailog: MatDialog
  ) { }

  /**
   *
   * @param dialogObject Pass Default dailog model data
   * @see SessionDialogueModal
   * @param loggedIn$ Pass logged in status as observable
   */
  initialise(dialogObject: SessionDialogueModal, loggedIn$: BehaviorSubject<boolean>): void {
    this._loggedIn$ = loggedIn$;

    this.sessionTimer.startTimer();
    this.sessionTimer.timeoutExpired.subscribe(res => {
      console.log('Session Expire Triggered - ', res);
      this.dailog.open(SessionDialogueComponent, {
        panelClass: 'az-no-padding-dialog',
        hasBackdrop: true,
        width: '500px', maxHeight: '700px',
        disableClose: true,
        data: dialogObject
      })
        .afterClosed().subscribe(
          action => {
            if (action === true) {
              this.sessionTimer.resetTimer();
            } else {
              this._loggedIn$.next(false);
            }
          }
        );
    });

    this._loggedIn$.subscribe(
      successVal => {
        if (successVal) {
          this.sessionTimer.resetTimer();
        } else {
          this.sessionTimer.stopTimer();
        }
      });
  }

  getCountDownObs(): Observable<number> {
    return this.sessionTimer.countDownObs;
  }

}
