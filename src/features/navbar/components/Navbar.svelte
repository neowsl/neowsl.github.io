<script>
    import { Github } from "@lucide/svelte";
</script>

<nav class="flex h-16 items-center bg-base-300 px-4">
    <a class="font-rocket-rinder text-xl text-secondary" href="/">
        Neal Wang
    </a>
    <div class="absolute left-1/2 -translate-x-1/2 font-cascadia-code">
        <a class="link link-secondary link-hover" href="/">main</a>
        <span> :: </span>
        <a class="link link-secondary link-hover" href="/experience">
            Experience
        </a>
        <span> -> </span>
        <a class="link link-secondary link-hover" href="/publication">
            Research
        </a>
        <span> -> </span>
        <a class="link link-secondary link-hover" href="/event">Talks</a>
        <span> -> </span>
        <a class="link link-secondary link-hover" href="/art" target="_blank">
            Creative
        </a>
        <span> -> </span>
        <a class="link link-secondary link-hover" href="/uses">Uses</a>
        <span> -> </span>
        <a class="link link-secondary link-hover" href="/contact">IO</a>
        <span class="text-primary">()</span>
    </div>
    <div class="flex-1"></div>
    <a href="https://github.com/neowsl/neowsl.github.io" target="_blank">
        <Github />
    </a>
</nav>
