import * as THREE from "three";
import { NOTE_SPAWN_DISTANCE, NOTE_X_VARIANCE } from "./config";

export class Note {
    position: THREE.Vector3;
    hit = false;

    constructor(position?: THREE.Vector3) {
        this.position =
            position ??
            new THREE.Vector3(
                Math.random() * NOTE_X_VARIANCE - NOTE_X_VARIANCE / 2,
                NOTE_SPAWN_DISTANCE,
                0,
            );
    }
}
