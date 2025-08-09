<script lang="ts">
    import type { Event } from "./[id]/+page";

    interface Props {
        event: Event;
    }

    const { event }: Props = $props();
    const { id, title, image, imageAlt, abstract, date } = event;
</script>

<a class="card bg-base-200 shadow-sm lg:card-side" href={`/event/${id}`}>
    {#if image}
        <figure class="md:h-64 md:w-[400px]">
            <img
                class="h-full object-cover transition-transform duration-500 hover:scale-120"
                src={image}
                alt={imageAlt ?? title}
            />
        </figure>
    {/if}
    <div class="card-body">
        <h2 class="card-title">{title}</h2>
        <p>{abstract}</p>
        <div class="card-actions">
            <p class="font-oxanium text-violet-400">
                {date.toLocaleDateString("en-CA")}
            </p>
        </div>
    </div>
</a>
