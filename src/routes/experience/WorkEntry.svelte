<script lang="ts">
    export interface Work {
        title: string;
        employer: string;
        link: string;
        dates: string;
        description: string[];
    }

    interface Props {
        work: Work;
    }

    const { work }: Props = $props();
    const { title, employer, link, dates, description } = work;
</script>

<h2>{title}</h2>
<a href={link}><i>{employer}</i></a>
<div>{dates}</div>
<ul>
    {#each description as d, i (i)}
        <li>{d}</li>
    {/each}
</ul>
