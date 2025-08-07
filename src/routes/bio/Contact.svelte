<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        href: string;
        tip: string;
        children: Snippet;
    }

    const { href, tip, children }: Props = $props();
</script>

<div class="tooltip tooltip-bottom" data-tip={tip}>
    <a
        class="inline-block transition-transform duration-100 hover:scale-110"
        {href}
        target="_blank"
    >
        {@render children?.()}
    </a>
</div>
