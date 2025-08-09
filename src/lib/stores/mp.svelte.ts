// shared music player state
export const mp = $state({
    queue: [] as any[], // eslint-disable-line @typescript-eslint/no-explicit-any
    waveform: [] as any[], // eslint-disable-line @typescript-eslint/no-explicit-any
    audioEl: null as HTMLAudioElement | null,
    paused: false,
});
