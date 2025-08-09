<script lang="ts">
    import { mp } from "$lib/stores/mp.svelte";
    import { score } from "$lib/stores/score.svelte";

    $effect(() => {
        score.hit = 0;
        score.total = 0;

        mp.waveform; //eslint-disable-line
    });

    const scorePercent = $derived.by(() => {
        if (score.total === 0) {
            return 100;
        }

        return Math.round((score.hit / score.total) * 100);
    });

    const colour = $derived.by(() => {
        if (scorePercent < 50) {
            return "text-neutral-content";
        }
        if (scorePercent < 75) {
            return "text-secondary";
        }
        if (scorePercent < 90) {
            return "text-accent";
        }
        return "text-primary";
    });
</script>

<div class="fixed top-4 left-4 z-[-5]">
    <div class={`radial-progress ${colour}`} style="--value:{scorePercent}">
        <span class="mt-1 font-stereofunk">
            {scorePercent}%
        </span>
    </div>
</div>
