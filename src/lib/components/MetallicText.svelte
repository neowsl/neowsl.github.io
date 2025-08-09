<script lang="ts">
    const { children } = $props();
</script>

<div class="relative inline-block tracking-wide">
    <span
        class="soft-shadow absolute animate-pulse font-rocket-rinder select-none"
    >
        {@render children()}
    </span>
    <span class="metallic relative font-rocket-rinder select-none">
        {@render children()}
    </span>
</div>

<style>
    .soft-shadow {
        scale: 0.95;
        color: transparent;
        text-shadow: 0 0.2em 0.1em #94c;
    }

    .metallic {
        background: linear-gradient(
            #000 20%,
            #248 35%,
            #fff 50%,
            #111 50%,
            #111 55%,
            #94c 70%,
            #fff 80%
        );
        background-clip: text;
        color: transparent;
        -webkit-text-stroke-width: 0.02em;
        -webkit-text-stroke-color: #888;
    }

    /* .hard-glow {
        --glow-colour: #555;
        --outer-glow-colour: #888;
        --size: 0.02em;
        --nsize: calc(-1 * var(--size));
        top: 0.05em;
        text-shadow:
            var(--size) 0px 0px var(--glow-colour),
            0px var(--size) 0px var(--glow-colour),
            var(--nsize) 0px 0px var(--glow-colour),
            0px var(--nsize) 0px var(--glow-colour),
            var(--size) var(--size) 0px var(--glow-colour),
            var(--size) var(--nsize) 0px var(--glow-colour),
            var(--nsize) var(--nsize) 0px var(--glow-colour),
            var(--nsize) var(--size) 0px var(--glow-colour),
            0px 0px 0.2em var(--outer-glow-colour);
    } */
</style>
