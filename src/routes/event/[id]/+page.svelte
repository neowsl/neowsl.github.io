<script lang="ts">
    import { ExternalLink } from "@lucide/svelte";

    const { data } = $props();
    const { event } = data;
    const {
        title,
        image,
        imageAlt,
        abstract,
        date,
        end,
        name,
        location,
        link,
    } = event;

    const LOCALE_TIME_STRING_OPTIONS: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: undefined,
    };
</script>

<div class="flex justify-center px-4">
    <article class="my-12 prose lg:prose-xl">
        <h1>{title}</h1>
        <p>{date.toDateString()}</p>
        {#if image}
            <img src={image} alt={imageAlt ?? title} />
        {/if}
        {#if link}
            <a
                class="not-prose btn btn-outline btn-primary"
                href={link}
                target="_blank"
            >
                <ExternalLink />Watch now
            </a>
        {/if}
        <h2>Abstract</h2>
        <p>{abstract}</p>
        <h2>Date</h2>
        <p>
            {date.toDateString()}
            {date.toLocaleTimeString("en-US", LOCALE_TIME_STRING_OPTIONS)}
            -
            {end.toLocaleTimeString("en-US", LOCALE_TIME_STRING_OPTIONS)}
        </p>
        <h2>Event</h2>
        <p>{name}</p>
        <h2>Location</h2>
        <p class="whitespace-pre-wrap">{location}</p>
    </article>
</div>
