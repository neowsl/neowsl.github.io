<script lang="ts">
    import { Canvas } from "@threlte/core";
    import { afterNavigate } from "$app/navigation";
    import MatrixRain from "$features/matrix-rain/components/MatrixRain.svelte";
    import MusicPlayer from "$features/music/components/MusicPlayer.svelte";
    import Score from "$features/synthwave/components/Score.svelte";
    import Synthwave from "$features/synthwave/components/Synthwave.svelte";
    import Glitch from "$lib/components/Glitch.svelte";
    import MetallicText from "$lib/components/MetallicText.svelte";
    import { CONTROLS_DELAY } from "$lib/config";
    import gsap from "gsap";

    let showVisuals: boolean | null = $state(null);
    let heroEl: HTMLElement | null = $state(null);
    let synthwaveVisible = $state(true);
    let externalNavigation = $state(false);

    afterNavigate(({ from }) => {
        if (from?.url) {
            if (showVisuals === null) {
                showVisuals = true;
            }
            return;
        }

        externalNavigation = true;

        const tl = gsap.timeline();
        tl.from("#title", { opacity: 0, duration: 1, ease: "power1.out" });
        tl.delay(1);
        tl.from("#title", { y: "25vh", duration: 2, ease: "power2.out" });
        tl.from("#glitch", { opacity: 0, duration: 1, ease: "power1.out" });
        tl.from("#synthwave", {
            opacity: 0,
            duration: 3,
            ease: "power1.out",
        });

        setTimeout(() => {
            if (showVisuals === null) {
                showVisuals = true;
            }
        }, CONTROLS_DELAY);
    });
</script>

<MusicPlayer />

{#if showVisuals}
    <Score />
{/if}

{#if showVisuals}
    <div class="fixed z-[-30] h-[75vh] w-screen">
        <MatrixRain />
    </div>
{/if}

<div id="synthwave-background" class="fixed z-[-20] h-screen w-screen"></div>

{#if synthwaveVisible}
    <div id="synthwave" class="fixed top-0 z-[-20] h-screen w-screen">
        <Canvas>
            <Synthwave />
        </Canvas>
    </div>
{/if}

<div id="hero" class="flex h-screen flex-col items-center" bind:this={heroEl}>
    <div id="title" class="mt-[20vh] flex flex-col items-center">
        <div
            class={externalNavigation && showVisuals
                ? "tooltip-open tooltip tooltip-secondary"
                : ""}
            data-tip="Click me!"
        >
            <a class="cursor-pointer" href="/bio">
                <h1
                    id="name"
                    class="mb-[-0.4em] text-5xl sm:text-7xl md:text-8xl"
                >
                    <MetallicText>Neal Wang</MetallicText>
                </h1>
            </a>
        </div>
        <div id="glitch">
            <Glitch />
        </div>
    </div>
</div>

<style>
    #synthwave-background {
        background: linear-gradient(
            to bottom,
            oklch(15% 0.09 281.288 / 0) 25%,
            oklch(29% 0.136 325.661 / 0.5) 45%,
            oklch(15% 0.09 281.288)
        );
    }

    #hero {
        @apply cursor-none;
    }

    #name {
        view-transition-name: name;
    }
</style>
