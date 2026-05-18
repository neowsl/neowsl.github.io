// shared music player state
export const mp = $state({
    // biome-ignore lint/suspicious/noExplicitAny: external api type
    queue: [] as any[],
    // biome-ignore lint/suspicious/noExplicitAny: external api type
    waveform: [] as any[],
    audioEl: null as HTMLAudioElement | null,
    paused: false,
});
