<script lang="ts">
    import { onMount } from "svelte";
    import * as THREE from "three";

    let mouse = $state(new THREE.Vector2(0, 0));
    let top = $state(new THREE.Vector2(0, 0));
    let angle = $state(0);
    let animationId = $state(0);

    const onMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };

    const update = () => {
        top.x = THREE.MathUtils.lerp(top.x, mouse.x, 0.1);
        top.y = THREE.MathUtils.lerp(top.y, mouse.y - 32, 0.1);

        angle = -Math.atan2(mouse.x - top.x, mouse.y - top.y);
        angle = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, angle));

        requestAnimationFrame(update);
    };

    onMount(() => {
        window.addEventListener("mousemove", onMouseMove);

        mouse.x = window.innerWidth / 2;
        mouse.y = window.innerHeight / 2;

        animationId = requestAnimationFrame(update);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);

            cancelAnimationFrame(animationId);
        };
    });
</script>

<div
    class="pointer-events-none fixed top-0 left-0 z-100 h-screen w-screen overflow-hidden"
>
    <img
        class="absolute h-16 w-16 origin-center"
        src="/images/inception_top.svg"
        alt=""
        style="
		left: {top.x}px;
		top: {top.y}px;
		transform: translate(-50%, -50%) rotate({angle}rad);
	"
    />
</div>
