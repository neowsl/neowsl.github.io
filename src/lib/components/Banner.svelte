<script lang="ts">
    import MetallicText from "./MetallicText.svelte";

    interface Props {
        title: string;
        image: string;
        smallerText: boolean;
    }

    const { title, image, smallerText }: Props = $props();
</script>

<div
    id="hero"
    class="hero h-64"
    style="--bg-url: url({`/images/${image}.png`})"
>
    <div class="hero-overlay bg-black/70"></div>
    <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
            <a href="/">
                <h1
                    id="name"
                    class={`mb-4 ${smallerText ? "text-4xl" : "text-5xl"} md:text-6xl`}
                >
                    <MetallicText>{title}</MetallicText>
                </h1>
            </a>
        </div>
    </div>
</div>

<style>
    #hero {
        background-image: var(--bg-url);
    }

    #name {
        view-transition-name: name;
    }
</style>
