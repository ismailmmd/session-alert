import { Inject, InjectionToken } from '@angular/core';
import { Subscription, Observable, Subject, timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { toRemainingSeconds, toMs } from './helper/helper';

/**
 * Configuration interface for Session Timer
 */
export interface SessionTimerConfig {
  /**
   * At what instant of time the count down shoul begin ?
   * Countdown time in minutes. This timer countdown to 0 and trigger log out when 0.
   */
  countDownTime: number;
  /**
   * session time - total session time in minutes
   */
  sessionTime: number;
}

/**
 * Session configuration token
 * @see SessionTimerConfig
 */
export const SESSION_TIMER_CONFIG = new InjectionToken<SessionTimerConfig>('Session Timer Configuration');

export class SessionTimerService {

  private _timeoutMilliseconds = 5000;
  private _sessionTime = 10000;
  private _countDown = 5000;
  private timerSubscription: Subscription;
  private _timer: Observable<number>;
  /**
   * Subscription for timer. To trigger dilog on session warning
   */
  public timeoutExpired: Subject<number> = new Subject<number>();
  /**
   * Count down value in @number
   */
  public countDownObs: Observable<number>;

  constructor(@Inject(SESSION_TIMER_CONFIG) private _config: SessionTimerConfig) {
    console.log('session config data: ', _config);
    if (_config != null) {
      if (_config.countDownTime >= _config.sessionTime) { throw new Error('Invalid Session Timer Configuration'); }
      this._timeoutMilliseconds = +_config.countDownTime.toFixed() * 1000 * 60;
      this._sessionTime = +_config.sessionTime.toFixed() * 1000 * 60;
      this._countDown = this._sessionTime - this._timeoutMilliseconds;
    }
    this.timeoutExpired.subscribe(n => {
      console.log('timeoutExpired subject next.. ' + n.toString());
    });
    this.startTimer();
  }

  /**
   * Start sessoin timer. Usually called on user login
   */
  public startTimer() {
    if (this.timerSubscription) {
      this.stopTimer();
    }
    this.setSubscription();
  }

  /**
   * Stops timer and kills timer subscription
   */
  public stopTimer() {
    if (!this.timerSubscription.closed) {
      this.timerSubscription.unsubscribe();
    }
  }

  /**
   * Reset session timer, calls @startTimer internally
   */
  public resetTimer() {
    this.startTimer();
  }

  private setSubscription() {
    this._timer = timer(this._timeoutMilliseconds);
    this.timerSubscription = this._timer.subscribe(n => {
      this.startCounter();
      this.timerComplete(n);
    });
  }

  private startCounter() {
    this.countDownObs = timer(0, 1000)
      .pipe(
        map(t => toRemainingSeconds(this._countDown, t)),
        map(toMs),
        takeWhile(t => t >= 0)
      );
  }

  private timerComplete(n: number) {
    this.timeoutExpired.next(this.getTimerCount(n));
  }

  private getTimerCount(n: number): number {
    return (n / this._timeoutMilliseconds) + 1;
  }

}
