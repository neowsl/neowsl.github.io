<script lang="ts">
    import { T, useTask, useThrelte } from "@threlte/core";
    import { useGltf } from "@threlte/extras";
    import { TAU } from "$lib/config";
    import { mp } from "$lib/stores/mp.svelte";
    import { onDestroy, onMount } from "svelte";
    import * as THREE from "three";
    import gridFragmentShader from "../assets/grid.frag.glsl?raw";
    import gridVertexShader from "../assets/grid.vert.glsl?raw";
    import sunFragmentShader from "../assets/sun.frag.glsl?raw";
    import sunURL from "../assets/sun.png";
    import sunVertexShader from "../assets/sun.vert.glsl?raw";
    import { NOTE_SPAWN_DISTANCE } from "../game/config";
    import { Game } from "../game/game";
    import type { Note } from "../game/types";

    const { camera } = useThrelte();
    const gltf = useGltf("/models/toyota_corolla_ae86_trueno.glb");

    const game = new Game();

    let scale = $state(1);
    let time = $state(0);
    let peak = $state(0);
    let notes = $state<Note[]>([]);
    let carX = $state(0);
    let carY = $state(0);
    let carZ = $state(0);
    let carRotation = $state(0);

    let gridMaterial = $state(
        new THREE.ShaderMaterial({
            fragmentShader: gridFragmentShader,
            vertexShader: gridVertexShader,
            transparent: true,
            uniforms: {
                uTime: { value: 0 },
                uPeak: { value: 0 },
            },
        }),
    );

    let sunMaterial = $state(
        new THREE.ShaderMaterial({
            fragmentShader: sunFragmentShader,
            vertexShader: sunVertexShader,
            transparent: true,
            uniforms: {
                uTime: { value: 0 },
                uResolution: {
                    value: new THREE.Vector2(innerWidth, innerHeight),
                },
                uTexture: { value: null },
                uPeak: { value: 0 },
            },
        }),
    );

    let carScene: THREE.Group | undefined = $state();
    let carCollider = new THREE.Box3();

    onMount(async () => {
        game.init();

        const sunTexture = await new THREE.TextureLoader().loadAsync(sunURL);
        sunMaterial.uniforms.uTexture.value = sunTexture;
    });

    $effect(() => {
        game.restart();

        mp.waveform; // eslint-disable-line
    });

    onDestroy(() => {
        game.deinit();
    });

    useTask((delta) => {
        game.update(delta, camera.current, carCollider);

        scale = game.scale;
        time = game.time;
        peak = game.peak;
        notes = game.notes;
        carX = game.car.position.x;
        carY = game.car.position.y;
        carZ = game.car.position.z;
        carRotation = game.car.rotation;

        gridMaterial.uniforms.uTime.value = time;
        sunMaterial.uniforms.uTime.value = time;

        gridMaterial.uniforms.uPeak.value = peak;
        sunMaterial.uniforms.uPeak.value = peak;

        if (carScene) {
            carCollider.setFromObject(carScene);
        }
    });
</script>

<T.AmbientLight intensity={0.05} color="#00bafe" />
<T.DirectionalLight
    position={[0, 1, 30]}
    intensity={(10 * peak) / 100}
    color="#6c3baa"
/>

<T.Mesh position.y={0} position.z={-10} {scale} material={sunMaterial}>
    <T.PlaneGeometry args={[20 + peak / 100, 20 + peak / 100]} />
</T.Mesh>

<T.Group position={[0, -1.1, -carZ]} {scale} rotation.x={TAU * -0.25}>
    <T.Mesh material={gridMaterial}>
        <T.PlaneGeometry args={[30, 20]} />
    </T.Mesh>
    {#await $gltf then { scene }}
        <T
            position={[carX, -1.8, carY + 0.3]}
            rotation={[
                TAU * 0.25,
                TAU * 0.5 - carRotation * 0.5,
                carRotation * 0.5,
            ]}
            scale={0.25}
            is={scene}
            bind:ref={carScene}
        />
    {/await}
    <T.Group position={[0, -3.5 + 2.6, 0.1]}>
        {#each notes as note, i (i)}
            <T.Mesh position={note.position.toArray()}>
                <T.SphereGeometry
                    args={[
                        (0.1 * (NOTE_SPAWN_DISTANCE - note.position.y)) /
                            NOTE_SPAWN_DISTANCE,
                        16,
                        16,
                    ]}
                />
                <T.MeshToonMaterial
                    emissive={note.hit ? "yellow" : "red"}
                    emissiveIntensity={note.position.y < 0.25 ? 4 : 0.2}
                />
            </T.Mesh>
        {/each}
    </T.Group>
</T.Group>
