export const toMinutes = (ms: number) => Math.floor(ms / 1000 / 60);

export const toSeconds = (ms: number) => Math.floor(ms / 1000) % 60;

export const toSecondsString = (ms: number) => {
    const seconds = toSeconds(ms);
    return seconds < 10 ? `0${seconds}` : seconds.toString();
};

export const toMs = (tSec: number) => tSec * 1000;

export const toRemainingSeconds = (tMs: number, tNow: number) => ( tMs / 1000 ) - tNow;
