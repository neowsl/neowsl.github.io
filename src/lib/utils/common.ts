export const ON_MOBILE =
    typeof window !== "undefined"
        ? !window.matchMedia("(max-width: 768px)").matches
        : false;
