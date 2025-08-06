<script lang="ts">
    import "../app.css";
    import { page } from "$app/state";
    import InceptionTop from "$features/inception-top/components/InceptionTop.svelte";
    import Navbar from "$features/navbar/components/Navbar.svelte";
    import favicon from "$lib/assets/favicon.svg";

    let { children } = $props();

    const main = $derived(page.url.pathname === "/");
</script>

<svelte:head>
    <link rel="icon" href={favicon} />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin="anonymous"
    />
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
        rel="stylesheet"
    />
    <link
        href="https://fonts.googleapis.com/css2?family=Cascadia+Code:ital@0;1&display=swap"
        rel="stylesheet"
    />
    <link
        href="https://fonts.googleapis.com/css2?family=Zhi+Mang+Xing&display=swap"
        rel="stylesheet"
    />
    <link
        href="https://fonts.googleapis.com/css2?family=Oxanium&display=swap"
        rel="stylesheet"
    />
</svelte:head>

{#if main}
    <InceptionTop />

    {@render children?.()}
{:else}
    <div class="flex min-h-screen flex-col">
        <Navbar />

        <div class="flex-1">
            {@render children?.()}
        </div>

        <footer
            class="footer-center footer p-4 text-base-content sm:footer-horizontal"
        >
            <aside>
                <p class="font-oxanium">
                    © {new Date().getFullYear()} Neal Wang. Code licensed under
                    GPLv3.
                </p>
            </aside>
        </footer>
    </div>
{/if}
