import { JAMENDO_CLIENT_ID } from "$lib/config";
import { mp } from "$lib/stores/mp.svelte";

const JAMENDO_API = "https://api.jamendo.com/v3.0";

export const getRandomTrack = async () => {
    if (!mp.queue.length) {
        const res = await fetch(
            `${JAMENDO_API}/tracks?client_id=${JAMENDO_CLIENT_ID}&search=synthwave&limit=200`,
        );

        const json = await res.json();
        mp.queue = json.results;
    }

    // return a random track from the queue
    return mp.queue.splice(Math.floor(Math.random() * mp.queue.length), 1)[0];
};

export const getPeak = (time?: number): number => {
    if (!mp.audioEl || !mp.audioEl.duration || !mp.waveform.length) {
        return -1;
    }

    time = time ?? mp.audioEl.currentTime;
    if (time >= mp.audioEl.duration) {
        return -1;
    }

    const interval = mp.audioEl.duration / mp.waveform.length;
    return mp.waveform[Math.floor(time / interval)];
};
