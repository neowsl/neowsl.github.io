<script lang="ts">
    export interface Work {
        title: string;
        employer: string;
        dates: string;
        description: string[];
    }

    interface Props {
        work: Work;
    }

    const { work }: Props = $props();
    const { title, employer, dates, description } = work;
</script>

<h2>{title}</h2>
<i>{employer}</i>
<div>{dates}</div>
<ul>
    {#each description as d, i (i)}
        <li>{d}</li>
    {/each}
</ul>
