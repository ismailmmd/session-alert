import { TestBed } from '@angular/core/testing';
import * as helper from './helper';

describe('Helper Methods', () => {

  beforeEach(() => TestBed.configureTestingModule({
  }));

  it('to Munites should work', () => {
    const munites = helper.toMinutes(60 * 1000);
    expect(munites).toBe(1);
  });

  it('to Seconds should work', () => {
    const munites = helper.toSeconds(55 * 1000);
    expect(munites).toBe(55);
  });

  it('toSecondsString should work', () => {
    const munites = helper.toSecondsString(55 * 1000);
    expect(munites).toBe('55');
  });

  it('toSecondsString should work with formating', () => {
    const munites = helper.toSecondsString(1000);
    expect(munites).toBe('01');
  });

  it('to Munites should work', () => {
    const munites = helper.toMs(1);
    expect(munites).toBe(1000);
  });

  it('to Munites should work', () => {
    const munites = helper.toRemainingSeconds(60 * 1000, 5);
    expect(munites).toBe(55);
  });
});
