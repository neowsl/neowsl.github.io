<script lang="ts">
    import MetallicText from "$lib/components/MetallicText.svelte";
    import yaml from "js-yaml";
    import articlesRaw from "./articles.yaml?raw";
    import NewsCard from "./NewsCard.svelte";
    import type { Article } from "./NewsCard.svelte";

    const articles = yaml.load(articlesRaw) as Article[];
</script>

<div id="hero" class="hero h-64">
    <div class="hero-overlay bg-black/70"></div>
    <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
            <a href="/">
                <h1 id="name" class="mb-4 text-4xl md:text-6xl">
                    <MetallicText>Experience</MetallicText>
                </h1>
            </a>
        </div>
    </div>
</div>

<div class="mt-12 flex p-4 sm:p-8 md:justify-center">
    <article class="prose max-w-none md:max-w-2/3 lg:prose-xl">
        <h1>News</h1>
        <div class="not-prose flex flex-col gap-4">
            {#each articles as article, i (i)}
                <NewsCard {article} />
            {/each}
        </div>
    </article>
</div>

<style>
    #hero {
        background-image: url("/images/gears.png");
    }

    #name {
        view-transition-name: name;
    }
</style>
