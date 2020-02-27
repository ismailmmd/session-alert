import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionTimerService, SessionTimerConfig, SESSION_TIMER_CONFIG } from './session-timer.service';
import { SessionDialogueComponent } from './session-dialogue/session-dialogue.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { SessionDialogueService } from './session-dialogue/session-dialogue.service';
import { MatDialogModule, MatButtonModule, MatDialog, MatChipsModule } from '@angular/material';

@NgModule({
  declarations: [
    SessionDialogueComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatChipsModule
  ],
  providers: [
    SessionTimerService,
    { provide: SessionDialogueService, deps: [SessionTimerService, MatDialog] },
  ],
  exports: [
    SessionDialogueComponent
  ],
  entryComponents: [
    SessionDialogueComponent
  ]
})
export class SessionModule {
  /**
   *
   * @param config session timer configuration
   * @see SessionTimerConfig
   * @usageNotes Inject Null
   * @example{ SessionModule.forRoot()}
   * @usageNotes Inject configuration
   * @example SessionModule.forRoot({sessionTime: 5, countDownTime: 3}),
   */
  static forRoot(config?: SessionTimerConfig): ModuleWithProviders {
    return {
      ngModule: SessionModule,
      providers: [
        {
          provide: SESSION_TIMER_CONFIG,
          useValue: config
        },
        SessionTimerService,
        SessionDialogueService
      ]
    };
  }
}
