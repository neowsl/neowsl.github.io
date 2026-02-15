<script lang="ts">
    import Banner from "$lib/components/Banner.svelte";
    import yaml from "js-yaml";
    import articlesRaw from "./articles.yaml?raw";
    import NewsCard, { type Article } from "./NewsCard.svelte";
    import WorkEntry, { type Work } from "./WorkEntry.svelte";
    import worksRaw from "./works.yaml?raw";

    const articles = yaml.load(articlesRaw) as Article[];
    const works = yaml.load(worksRaw) as Work[];
</script>

<Banner title="Experience" image="gears" smallerText />

<div class="mt-12 flex p-4 sm:p-8 md:justify-center">
    <article class="prose max-w-none md:w-2/3 lg:prose-xl">
        <h1>Work</h1>
        <div class="flex flex-col">
            {#each works as work, i (i)}
                <WorkEntry {work} />
            {/each}
        </div>
    </article>
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
