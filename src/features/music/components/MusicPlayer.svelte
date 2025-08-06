<script lang="ts">
    import { Info, Music, Pause, Play, StepForward } from "@lucide/svelte";
    import { CONTROLS_DELAY } from "$lib/config";
    import { mp } from "$lib/stores/mp.svelte";
    import { ON_MOBILE } from "$lib/utils/common";
    import { getRandomTrack } from "$lib/utils/music";

    const TOAST_TIME = 4000;

    let modalEl: HTMLDialogElement | null = $state(null);
    let audioEl: HTMLAudioElement | null = $state(null);
    let track: any = $state(null); // eslint-disable-line @typescript-eslint/no-explicit-any
    let showControls = $state(false);
    let showToast = $state(false);

    $effect(() => {
        mp.audioEl = audioEl;

        setTimeout(() => {
            modalEl?.showModal();
            showControls = true;
        }, CONTROLS_DELAY);
    });

    $effect(() => {
        if (mp.paused) {
            audioEl?.pause();
        } else {
            audioEl?.play();
        }
    });

    $effect(() => {
        if (audioEl && audioEl.paused) {
            mp.paused = false;
        }
    });

    const nextTrack = async () => {
        track = await getRandomTrack();
        if (audioEl) {
            audioEl.src = track.audio;
        }
    };

    const toast = () => {
        showToast = true;
        setTimeout(() => {
            showToast = false;
        }, TOAST_TIME);
    };

    const play = async () => {
        await nextTrack();

        mp.paused = false;
        modalEl?.close();

        toast();
    };

    const togglePaused = () => {
        if (!audioEl) {
            return;
        }

        if (audioEl.paused) {
            mp.paused = false;
        } else {
            mp.paused = true;
        }
    };

    const start = () => {
        if (!audioEl) {
            return;
        }

        mp.waveform = JSON.parse(track.waveform).peaks;
    };
</script>

<dialog class="modal h-screen w-screen cursor-default" bind:this={modalEl}>
    <div class="modal-box text-sm md:text-base">
        <h3
            class="font-rocket-rinder text-base font-bold text-secondary md:text-xl"
        >
            Welcome to Neal's website!
        </h3>
        <div class="font-oxanium">
            <p class="pt-2">Turn up the volume;</p>
            <p>Hit notes to score!</p>
            <div class="flex items-center gap-2 py-2">
                {#if ON_MOBILE}
                    Use
                    <div class="flex items-center gap-1">
                        <kbd class="kbd">◀︎</kbd>
                        <div class="flex flex-col gap-1">
                            <kbd class="kbd">▲</kbd>
                            <kbd class="kbd">▼</kbd>
                        </div>
                        <kbd class="kbd">▶︎</kbd>
                    </div>
                    or your mouse;
                {:else}
                    Tap the sides of your screen;
                {/if}
            </div>
            <p>Scroll down to learn more!</p>
        </div>
        <div class="modal-action">
            <form method="dialog" onsubmit={play}>
                <button class="btn font-rocket-rinder btn-primary">Play!</button
                >
            </form>
        </div>
    </div>
</dialog>

{#if showControls}
    <div class="fixed bottom-4 flex w-screen justify-center gap-4">
        <div class="tooltip tooltip-top" data-tip="Track info">
            <button class="btn px-2 btn-soft btn-primary" onclick={toast}>
                <Info />
            </button>
        </div>
        <div
            class="tooltip tooltip-top"
            data-tip={mp.paused ? "Play" : "Pause"}
        >
            <button
                class="btn px-2 btn-soft btn-primary"
                onclick={togglePaused}
            >
                {#if mp.paused}<Play />{:else}<Pause />{/if}
            </button>
        </div>
        <div class="tooltip tooltip-top" data-tip="Skip track">
            <button class="btn px-2 btn-soft btn-primary" onclick={play}>
                <StepForward />
            </button>
        </div>
    </div>

    {#if showToast}
        <div class="toast z-50">
            <div class="alert alert-info">
                <Music />
                <div class="text-xs md:text-base">
                    <span class="font-bold">[{track.artist_name}]</span>
                    {track.name}
                </div>
            </div>
        </div>
    {/if}
{/if}

<audio
    autoplay
    bind:this={audioEl}
    onloadedmetadata={start}
    onplay={() => (mp.paused = false)}
    onpause={() => (mp.paused = true)}
    onended={play}
></audio>
