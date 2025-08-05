import * as THREE from "three";

export const getWorldPosFromNDC = (
    ndc: THREE.Vector2,
    camera: THREE.Camera,
) => {
    const vec = new THREE.Vector3(ndc.x, ndc.y, 0.5);
    vec.unproject(camera);

    const dir = vec.sub(camera.position).normalize();
    const dist = -camera.position.z / dir.z;
    const pos = camera.position.clone().add(dir.multiplyScalar(dist));

    return new THREE.Vector2(pos.x, pos.y);
};
