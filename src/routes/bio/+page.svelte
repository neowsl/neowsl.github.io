<script>
    import {
        ChartNoAxesColumn,
        Github,
        Linkedin,
        Mail,
        Star,
        UserRoundCheck,
        Youtube,
        Zap,
    } from "@lucide/svelte";
    import MetallicText from "$lib/components/MetallicText.svelte";
    import Contact from "./Contact.svelte";
</script>

<div id="hero" class="hero h-[50vh]">
    <div class="hero-overlay bg-black/70"></div>
    <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
            <a href="/">
                <h1 id="name" class="mb-4 text-5xl md:text-6xl">
                    <MetallicText>Neal Wang</MetallicText>
                </h1>
            </a>
            <p class="font-bold md:text-xl">Lead AI Engineer / UX Researcher</p>
            <p class="mb-4 md:text-xl">Schweitzer Engineering Laboratories</p>
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
                    href="https://codeforces.com/profile/neowsl"
                    tip="Codeforces"
                >
                    <ChartNoAxesColumn />
                </Contact>
            </div>
        </div>
    </div>
</div>

<div class="flex justify-center bg-base-200">
    <div class="stats shadow">
        <div class="stat">
            <div class="stat-figure hidden text-secondary md:block">
                <UserRoundCheck />
            </div>
            <div class="stat-title">Subscribers</div>
            <div class="stat-value text-2xl sm:text-4xl">1.3K</div>
            <div class="stat-desc">@neowsl</div>
        </div>

        <div class="stat">
            <div class="stat-figure hidden text-secondary md:block">
                <Star />
            </div>
            <div class="stat-title">GitHub Stars</div>
            <div class="stat-value text-2xl sm:text-4xl">2</div>
            <div class="stat-desc">Thanks Mom!</div>
        </div>

        <div class="stat">
            <div class="stat-figure hidden text-secondary md:block">
                <Zap />
            </div>
            <div class="stat-title w-20 text-xs">Neovim Config</div>
            <div class="stat-value text-2xl sm:text-4xl">906</div>
            <div class="stat-desc">Lines of Code</div>
        </div>
    </div>
</div>

<div class="mt-16 flex flex-col items-center">
    <div class="w-full px-4 md:w-xl md:px-0">
        <h1
            class="mb-8 text-center font-rocket-rinder text-2xl text-violet-400"
        >
            Hello, I'm Neal! 🐬
        </h1>
        <div class="md:text-lg">
            <p class="mb-4">
                <strong>Specialties:</strong> Full-Stack Development, UX Research,
                Machine Learning, Computer Vision, Leadership, Problem Solving
            </p>
            <p>
                <strong>Languages:</strong> Haskell, Rust, C/C++, Go, TypeScript,
                Python, C#
            </p>
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
