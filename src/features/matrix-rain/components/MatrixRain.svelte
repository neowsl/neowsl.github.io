<script lang="ts">
import { onMount } from "svelte";
import { MatrixRain } from "../matrix-rain/matrixRain";

let canvas = $state<HTMLCanvasElement>();

let matrixRain = $state<MatrixRain>();

onMount(() => {
    if (!canvas) return;

    matrixRain = new MatrixRain(canvas);
    matrixRain.init();
    matrixRain.update();

    return () => {
        matrixRain?.deinit();
    };
});
</script>

<canvas class="h-full w-full" bind:this={canvas}></canvas>
