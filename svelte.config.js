import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";

/** @type {import("@sveltejs/kit").Config} */
const config = {
    preprocess: [vitePreprocess(), mdsvex()],
    kit: {
        adapter: adapter({
            fallback: "index.html",
        }),
        paths: {
            base: "/",
        },
        prerender: {
            entries: ["*"],
        },
        alias: {
            $features: "./src/features",
        },
    },
    extensions: [".svelte", ".svx"],
};

export default config;
