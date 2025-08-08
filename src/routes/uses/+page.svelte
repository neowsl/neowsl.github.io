<script lang="ts">
    import MetallicText from "$lib/components/MetallicText.svelte";
</script>

<div id="hero" class="hero h-64">
    <div class="hero-overlay bg-black/70"></div>
    <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
            <a href="/">
                <h1 id="name" class="mb-4 text-5xl md:text-6xl">
                    <MetallicText>Uses</MetallicText>
                </h1>
            </a>
        </div>
    </div>
</div>

<style>
    #hero {
        background-image: url("/images/bee.png");
    }

    #name {
        view-transition-name: name;
    }
</style>
