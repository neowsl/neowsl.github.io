import { DELAY, FADE, MESSAGE_RATE, MESSAGES } from "./config";
import { Stream } from "./stream";
import type { Mouse } from "./types";

export class MatrixRain {
    private CHAR_HEIGHT = 0;
    private CHAR_WIDTH = 0;
    private SPAWN_RATE = 0;

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private animationId?: number;

    private streams: Stream[] = [];
    private frame = 0;
    private lastTick = Date.now();
    private mouse: Mouse = { x: -1000, y: -1000, acc: 0 };

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
    }

    update = () => {
        this.animationId = requestAnimationFrame(this.update);

        if (Date.now() > this.lastTick + DELAY) {
            this.mouse.acc *= FADE;

            if (Math.random() < this.SPAWN_RATE) {
                const message =
                    Math.random() < MESSAGE_RATE
                        ? MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
                        : undefined;

                this.streams.push(
                    new Stream(
                        this.canvas,
                        this.ctx,
                        Math.floor(
                            (Math.random() * this.canvas.width) /
                                this.CHAR_WIDTH,
                        ) * this.CHAR_WIDTH,
                        message,
                    ),
                );
            }

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            for (let i = 0; i < this.streams.length; i++) {
                if (
                    this.streams[i].update(
                        this.frame,
                        this.mouse,
                        this.CHAR_HEIGHT,
                        this.CHAR_WIDTH,
                    )
                ) {
                    this.streams.splice(i, 1);
                    i--;
                }
            }

            this.frame++;
            this.lastTick = Date.now();
        }
    };

    resize = () => {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;

        this.CHAR_HEIGHT = this.canvas.width < 768 ? 16 : 24;
        this.CHAR_WIDTH = 0.75 * this.CHAR_HEIGHT;
        this.SPAWN_RATE = this.canvas.width / 2500;

        this.ctx.font = `${this.CHAR_HEIGHT * 1.25}px Matrix Code NFI`;
    };

    mousemove = (e: MouseEvent) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
        this.mouse.acc += e.movementX ** 2 + e.movementY ** 2;
    };

    init = () => {
        this.resize();

        window.addEventListener("resize", this.resize);
        window.addEventListener("mousemove", this.mousemove);
    };

    deinit = () => {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        window.removeEventListener("resize", this.resize);
        window.removeEventListener("mousemove", this.mousemove);
    };
}
