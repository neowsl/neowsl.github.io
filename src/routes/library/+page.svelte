<script lang="ts">
    import Banner from "$lib/components/Banner.svelte";
    import Library from "./library.svx";
</script>

<Banner title="Library" image="wood" />

<div class="mt-12 flex p-4 sm:p-8 md:justify-center">
    <article class="prose max-w-none md:w-2/3 lg:prose-lg">
        <Library />
    </article>
</div>
