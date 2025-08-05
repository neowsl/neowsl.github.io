import {
    CHARSET,
    ERROR_GLITCH_RATE,
    ERROR_OPACITY,
    ERROR_RATE,
    GLITCH_RATE,
    GOLD,
    GOLD_OPACITY,
    OPACITY,
} from "./config";
import type { Mouse } from "./types";

export class Stream {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private chars: string[] = [];
    private length: number;
    private speed: number;
    private x: number;
    private error: boolean;
    private message: string | undefined;
    private stop: number;

    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        x: number,
        message?: string,
    ) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.length = Math.floor(Math.random() * 40) + 4;
        this.speed = Math.floor(Math.random() * 2) + 1;
        this.x = x;

        this.error = Math.random() < ERROR_RATE;
        this.message = message;

        this.stop = Math.random() * 0.25 + 0.75;
    }

    update(
        frame: number,
        mouse: Mouse,
        CHAR_HEIGHT: number,
        CHAR_WIDTH: number,
    ) {
        if (frame % this.speed === 0) {
            if (!this.message) {
                this.chars.push(
                    CHARSET[Math.floor(Math.random() * CHARSET.length)],
                );
            } else {
                this.chars.push(
                    this.message[
                        Math.floor(frame / this.speed) % this.message.length
                    ],
                );
            }

            if (this.chars.length >= this.length) {
                this.chars[this.chars.length - this.length] = " ";
            }
        }

        const stop = this.stop * this.canvas.height;

        if (this.chars.length - this.length > stop / CHAR_HEIGHT) {
            return true;
        }

        for (let i = 0; i < this.chars.length; i++) {
            let x = this.x + CHAR_WIDTH / 2;
            let y = i * CHAR_HEIGHT - CHAR_HEIGHT / 2;

            if (y > stop) {
                break;
            }

            if (
                Math.random() <
                    (this.error ? ERROR_GLITCH_RATE : GLITCH_RATE) &&
                this.chars[i] !== " " &&
                !this.message
            ) {
                this.chars[i] =
                    CHARSET[Math.floor(Math.random() * CHARSET.length)];
            }

            if (this.chars[i] === " ") continue;

            const isGold =
                (x - mouse.x) ** 2 + (y - mouse.y) ** 2 < mouse.acc * GOLD ||
                this.message;
            const isLast = i === this.chars.length - 1;

            this.ctx.fillStyle = isGold
                ? isLast
                    ? "#c6d2ff"
                    : "#fede1c"
                : this.error
                  ? isLast
                      ? "#500323"
                      : "#f861b4"
                  : isLast
                    ? "#c6d2ff"
                    : "#00bafe";

            this.ctx.globalAlpha =
                (isGold ? GOLD_OPACITY : this.error ? ERROR_OPACITY : OPACITY) *
                ((i - (this.chars.length - this.length)) / this.length);

            this.ctx.fillText(this.chars[i], this.x, i * CHAR_HEIGHT);
        }

        return false;
    }
}
