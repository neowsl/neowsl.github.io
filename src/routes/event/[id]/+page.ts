import { error } from "@sveltejs/kit";
import yaml from "js-yaml";
import talksRaw from "../events.yaml?raw";
import type { EntryGenerator, PageLoad } from "./$types";

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

export const entries: EntryGenerator = () => {
    return events.map((event) => ({ id: event.id }));
};

export const prerender = true;

export const load: PageLoad = ({ params }) => {
    const event = events.find((event) => event.id === params.id);
    if (!event) {
        throw error(404, "Event not found");
    }

    return { event };
};
