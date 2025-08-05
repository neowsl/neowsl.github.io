<script lang="ts">
    import "../app.css";
    import InceptionTop from "$features/inception-top/components/InceptionTop.svelte";
    import favicon from "$lib/assets/favicon.svg";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<InceptionTop />

{@render children?.()}
