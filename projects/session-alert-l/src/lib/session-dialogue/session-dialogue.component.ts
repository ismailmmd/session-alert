import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SessionDialogueModal } from './session-dialogue.model';
import { SessionTimerService } from '../session-timer.service';
import { tap } from 'rxjs/operators';
import { toMinutes, toSecondsString } from '../helper/helper';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sa-session-dialogue',
  templateUrl: './session-dialogue.component.html',
  styleUrls: ['./session-dialogue.component.scss']
})
export class SessionDialogueComponent implements OnInit, OnDestroy {

  tMin: string;
  tSec: string;
  countDownSubscription: Subscription;
  isExpired = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SessionDialogueModal,
    private dialogRef: MatDialogRef<SessionDialogueComponent>,
    private sessionService: SessionTimerService
  ) {
    this.countDownSubscription = this.sessionService.countDownObs
      .pipe(
        tap(t => this.tMin = toMinutes(t).toString()),
        tap(t => this.tSec = toSecondsString(t))
      )
      .subscribe(
        {
          complete: () => {
            this.isExpired = true;
            if (data.closeOnTrigger) {
              this.onClickCancel();
            }
          }
        }
      );
  }

  ngOnInit() {
  }

  onClickConfirm() {
    this.dialogRef.close(true);
  }

  onClickCancel() {
    this.dialogRef.close(false);
  }

  ngOnDestroy() {
    this.countDownSubscription.unsubscribe();
  }

}
