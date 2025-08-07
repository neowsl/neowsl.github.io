<script>
    import {
        ChartNoAxesColumn,
        Github,
        Linkedin,
        Mail,
        Youtube,
    } from "@lucide/svelte";
    import MetallicText from "$lib/components/MetallicText.svelte";
    import Contact from "./Contact.svelte";
</script>

<div id="hero" class="hero h-[50vh]">
    <div class="hero-overlay bg-black/70"></div>
    <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
            <a href="/">
                <h1 id="name" class="mb-4 text-6xl">
                    <MetallicText>Neal Wang</MetallicText>
                </h1>
            </a>
            <p class="text-xl font-bold">
                Lead Software Engineer / UX Researcher
            </p>
            <p class="mb-4 text-xl">Schweitzer Engineering Laboratories</p>
            <div class="flex justify-center gap-4">
                <Contact href="mailto:nealwang.sh@protonmail.com" tip="Email">
                    <Mail />
                </Contact>
                <Contact href="https://github.com/neowsl" tip="GitHub">
                    <Github />
                </Contact>
                <Contact href="https://youtube.com/@neowsl" tip="YouTube">
                    <Youtube />
                </Contact>
                <Contact
                    href="https://www.linkedin.com/in/nealwang-sh"
                    tip="LinkedIn"
                >
                    <Linkedin />
                </Contact>
                <Contact
                    href="https://codeforces.com/profile/mathletedev"
                    tip="Codeforces"
                >
                    <ChartNoAxesColumn />
                </Contact>
            </div>
        </div>
    </div>
</div>

<style>
    #hero {
        background-image: url("/images/lamppost.png");
    }

    #name {
        view-transition-name: name;
    }
</style>
