<script lang="ts">
    import Banner from "$lib/components/Banner.svelte";
    import EventCard from "./EventCard.svelte";

    const { data } = $props();
    const { events } = data;
</script>

<Banner title="Events" image="water_drop" />

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
