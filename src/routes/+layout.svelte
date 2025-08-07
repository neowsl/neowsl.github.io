<script lang="ts">
    import "../app.css";
    import { onNavigate } from "$app/navigation";
    import { page } from "$app/state";
    import InceptionTop from "$features/inception-top/components/InceptionTop.svelte";
    import Navbar from "$features/navbar/components/Navbar.svelte";

    let { children } = $props();

    const main = $derived(page.url.pathname === "/");

    onNavigate((navigation) => {
        if (!document.startViewTransition) {
            return;
        }

        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });
        });
    });
</script>

<svelte:head>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />

    <title>Neal Wang</title>

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
            id="footer"
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

<style>
    #footer {
        view-transition-name: footer;
    }
</style>
