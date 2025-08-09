<script lang="ts">
    import MetallicText from "$lib/components/MetallicText.svelte";
    import EventCard from "./EventCard.svelte";

    const { data } = $props();
    const { events } = data;
</script>

<div id="hero" class="hero h-64">
    <div class="hero-overlay bg-black/70"></div>
    <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
            <a href="/">
                <h1 id="name" class="mb-4 text-5xl md:text-6xl">
                    <MetallicText>Events</MetallicText>
                </h1>
            </a>
        </div>
    </div>
</div>

<div class="mt-12 flex p-4 sm:p-8 md:justify-center">
    <article class="prose max-w-none md:max-w-2/3 lg:prose-xl">
        <h1>Recent & Upcoming Events</h1>
        <div class="not-prose flex flex-col gap-4">
            {#each events as event, i (i)}
                <EventCard {event} />
            {/each}
        </div>
    </article>
</div>

<style>
    #hero {
        background-image: url("/images/water_drop.png");
    }

    #name {
        view-transition-name: name;
    }
</style>
