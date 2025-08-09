import yaml from "js-yaml";
import type { PageLoad } from "./$types";
import talksRaw from "./events.yaml?raw";

export interface Event {
    id: string;
    title: string;
    image?: string;
    imageAlt?: string;
    abstract: string;
    date: Date;
    end: Date;
    name: string;
    location: string;
    link?: string;
}

const events: Event[] = yaml.load(talksRaw) as Event[];

export const prerender = true;

export const load: PageLoad = () => {
    return { events };
};
