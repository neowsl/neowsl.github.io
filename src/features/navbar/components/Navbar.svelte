<script>
    import { Github, Menu, X } from "@lucide/svelte";
    import { slide } from "svelte/transition";

    let menuOpen = $state(false);

    const toggleMenu = () => {
        menuOpen = !menuOpen;
    };

    const closeMenu = () => {
        menuOpen = false;
    };
</script>

<nav id="navbar" class="flex h-16 items-center bg-base-300 px-4">
    <a class="font-rocket-rinder text-xl text-secondary" href="/">
        Neal Wang
    </a>

    <div
        class="absolute left-1/2 hidden -translate-x-1/2 font-cascadia-code md:block"
    >
        <a class="link link-secondary link-hover" href="/bio">main</a>
        <span> :: </span>
        <a class="link link-secondary link-hover" href="/experience">
            Experience
        </a>
        <span> -> </span>
        <a class="link link-secondary link-hover" href="/publication">
            Research
        </a>
        <span> -> </span>
        <a class="link link-secondary link-hover" href="/event">Events</a>
        <span> -> </span>
        <a class="link link-secondary link-hover" href="/art" target="_blank">
            Creative
        </a>
        <span> -> </span>
        <a class="link link-secondary link-hover" href="/uses">Uses</a>
        <span class="text-primary">()</span>
    </div>

    <div class="flex-1"></div>

    <div class="tooltip tooltip-left" data-tip="GitHub repo">
        <a href="https://github.com/neowsl/neowsl.github.io" target="_blank">
            <Github />
        </a>
    </div>

    <div class="flex md:hidden">
        <div class="w-4"></div>
        <button class="hover:cursor-pointer" onclick={toggleMenu}>
            {#if !menuOpen}
                <Menu />
            {:else}
                <X />
            {/if}
        </button>
    </div>

    {#if menuOpen}
        <ul
            transition:slide
            class="absolute top-16 left-0 z-50 flex w-full flex-col items-center gap-4 bg-base-100 p-4 shadow-lg md:hidden"
        >
            <li><a href="/" onclick={closeMenu}>Synthwave</a></li>
            <li><a href="/bio" onclick={closeMenu}>Bio</a></li>
            <li><a href="/experience" onclick={closeMenu}>Experience</a></li>
            <li><a href="/publication" onclick={closeMenu}>Research</a></li>
            <li><a href="/event" onclick={closeMenu}>Events</a></li>
            <li><a href="/art" onclick={closeMenu}>Creative</a></li>
            <li><a href="/uses" onclick={closeMenu}>Uses</a></li>
        </ul>
    {/if}
</nav>

<style>
    #navbar {
        view-transition-name: navbar;
    }
</style>
