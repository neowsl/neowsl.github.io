import { mp } from "$lib/stores/mp.svelte";
import { score } from "$lib/stores/score.svelte";
import { getPeak } from "$lib/utils/music";
import * as THREE from "three";
import {
    CAR_JUMP,
    CAR_JUMP_DECAY,
    CAR_KEYBOARD_SPEED,
    CAR_MAX_X,
    CAR_SPEED,
    CAR_TURN_SPEED,
    MP_OFFSET,
    NOTE_PEAK_DECAY,
    NOTE_SPAWN_OFFSET,
    NOTE_SPEED,
    PEAK_DECAY,
} from "./config";
import { Note } from "./types";
import { getWorldPosFromNDC } from "./utils";

export class Game {
    scale = 1;
    time = 0;
    peak = 0;
    notes: Note[] = [];
    prevNotePeak = 0;
    car = {
        target: new THREE.Vector2(),
        position: new THREE.Vector3(),
        rotation: 0,
    };
    mouse = new THREE.Vector2();
    keys: Record<string, boolean> = {
        ArrowLeft: false,
        ArrowRight: false,
        ArrowUp: false,
        ArrowDown: false,
    };
    useMouse = true;

    update = (delta: number, camera: THREE.Camera, carCollider: THREE.Box3) => {
        this.time += delta;

        if (this.useMouse) {
            this.handleMouse(camera);
        } else {
            this.handleKeyboard();
        }

        this.updateCar(delta);

        this.updatePeak(delta);

        this.updateNotes(delta, carCollider);
    };

    updateCar = (delta: number) => {
        this.car.target.x = THREE.MathUtils.clamp(
            this.car.target.x,
            -CAR_MAX_X / 2,
            CAR_MAX_X / 2,
        );
        this.car.target.y = THREE.MathUtils.clamp(this.car.target.y, -0.5, 1.5);

        this.car.position.x = THREE.MathUtils.lerp(
            this.car.position.x,
            this.car.target.x,
            (CAR_SPEED * delta) / this.scale,
        );
        this.car.position.z = THREE.MathUtils.lerp(
            this.car.position.z,
            this.car.target.y,
            (CAR_SPEED * delta) / this.scale,
        );

        const dx = this.car.target.x - this.car.position.x;
        this.car.rotation = THREE.MathUtils.lerp(
            this.car.rotation,
            -dx * 0.2,
            CAR_TURN_SPEED * delta,
        );

        this.car.position.y = THREE.MathUtils.lerp(
            this.car.position.y,
            0,
            CAR_JUMP_DECAY * delta,
        );
    };

    updatePeak = (delta: number) => {
        if (!mp.audioEl) {
            return;
        }

        let nextPeak = 0;
        if (!mp.paused) {
            nextPeak = getPeak(mp.audioEl.currentTime + MP_OFFSET);
            if (nextPeak === -1) {
                return;
            }
        }

        if (nextPeak > this.peak) {
            this.peak = nextPeak;
        } else {
            this.peak += (nextPeak - this.peak) * PEAK_DECAY * delta;
        }
    };

    updateNotes = (delta: number, carCollider: THREE.Box3) => {
        if (!mp.audioEl) {
            return;
        }

        for (let i = 0; i < this.notes.length; i++) {
            const note = this.notes[i];
            const carSize = new THREE.Vector3();
            carCollider.getSize(carSize);
            if (
                !note.hit &&
                note.position.y < 0.5 &&
                Math.abs(note.position.x - this.car.position.x) < carSize.x / 2
            ) {
                score.hit++;
                note.hit = true;
                this.car.position.y = CAR_JUMP;
            }

            note.position.y -= NOTE_SPEED * delta;
            // if (note.hit) {
            //     note.position.z += 40 * delta;
            // }

            // force reactivity
            this.notes[i] = {
                ...note,
                position: note.position.clone(),
            };
        }
        const prevCount = this.notes.length;
        this.notes = this.notes.filter((note) => note.position.y >= 0);
        score.total += prevCount - this.notes.length;

        if (mp.paused) {
            return;
        }

        const nextPeak = getPeak(
            mp.audioEl.currentTime + MP_OFFSET + NOTE_SPAWN_OFFSET,
        );
        if (nextPeak === -1) {
            return;
        }

        // spawn new note
        if (nextPeak > this.prevNotePeak) {
            this.notes.push(new Note());
            this.prevNotePeak = nextPeak;
        } else {
            this.prevNotePeak +=
                (nextPeak - this.prevNotePeak) * NOTE_PEAK_DECAY * delta;
        }
    };

    handleMouse = (camera: THREE.Camera) => {
        const worldMouse = getWorldPosFromNDC(this.mouse, camera);
        this.car.target.x = worldMouse.x;
        this.car.target.y = worldMouse.y;
    };

    handleKeyboard = () => {
        if (this.keys.ArrowLeft) {
            this.car.target.x -= CAR_KEYBOARD_SPEED;
        }
        if (this.keys.ArrowRight) {
            this.car.target.x += CAR_KEYBOARD_SPEED;
        }
        if (this.keys.ArrowUp) {
            this.car.target.y += CAR_KEYBOARD_SPEED;
        }
        if (this.keys.ArrowDown) {
            this.car.target.y -= CAR_KEYBOARD_SPEED;
        }
    };

    init = () => {
        window.addEventListener("mousemove", this.onMouseMove);
        window.addEventListener("keydown", this.onKeyDown);
        window.addEventListener("keyup", this.onKeyUp);
        window.addEventListener("resize", this.onResize);

        this.onResize();
    };

    restart = () => {
        this.notes = [];
        this.prevNotePeak = 0;
    };

    deinit = () => {
        window.removeEventListener("mousemove", this.onMouseMove);
        window.removeEventListener("keydown", this.onKeyDown);
        window.removeEventListener("keyup", this.onKeyUp);
        window.removeEventListener("resize", this.onResize);
    };

    onMouseMove = (e: MouseEvent) => {
        this.mouse = new THREE.Vector2(
            (e.clientX / innerWidth) * 2 - 1,
            -(e.clientY / innerHeight) * 2 + 1,
        );
        this.useMouse = true;
    };

    onKeyDown = (e: KeyboardEvent) => {
        this.keys[e.key] = true;
        this.useMouse = false;
    };

    onKeyUp = (e: KeyboardEvent) => {
        this.keys[e.key] = false;
    };

    onResize = () => {
        if (window.innerWidth < 800) {
            this.scale = Math.sqrt(window.innerWidth / 800);
        } else {
            this.scale = 1;
        }
    };
}
