<script lang="ts">
    import { ExternalLink } from "@lucide/svelte";

    export interface Article {
        image: string;
        imageAlt?: string;
        title: string;
        description: string;
        date: Date;
        repo?: string;
        link: string;
    }

    interface Props {
        article: Article;
    }

    const { article }: Props = $props();
    const { image, imageAlt, title, description, date, repo, link } = article;
</script>

<div class="card bg-base-200 shadow-sm lg:card-side">
    <a href={link} target="_blank">
        <figure class="md:h-64 md:w-[400px] lg:h-full">
            <img
                class="h-full object-cover transition-transform duration-500 hover:scale-120"
                src={image}
                alt={imageAlt ?? "Featured image"}
            />
        </figure>
    </a>
    <div class="card-body">
        <h2 class="card-title">{title}</h2>
        <p>{description}</p>
        <div class="card-actions">
            <p class="font-oxanium text-violet-400">
                {date.toLocaleDateString("en-CA")}
            </p>
            <div class="flex-1"></div>
            {#if repo}
                <a
                    class="btn btn-outline btn-sm btn-secondary md:btn-md"
                    href={repo}
                    target="_blank"
                >
                    <ExternalLink class="hidden md:block" />View code
                </a>
            {/if}
            <a
                class="btn btn-outline btn-sm btn-primary md:btn-md"
                href={link}
                target="_blank"
            >
                <ExternalLink class="hidden md:block" />Read more
            </a>
        </div>
    </div>
</div>
