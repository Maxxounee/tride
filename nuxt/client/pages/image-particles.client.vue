<template>
	<div class="image-particles" ref="el">
	</div>
</template>

<script lang="ts" setup>
/* https://tympanus.net/codrops/2019/01/17/interactive-particles-with-three-js/ */
// import Particles from "@/assets/script/imageParticles/particles.js";
import WebGLView from "@/assets/script/imageParticles/main.js";

const el = ref();
// import * as THREE from "three";
//
// const NUM_POINTS = ref(100);
// const WIDTH = ref(300);
// const HEIGHT = ref(300);
//
// const geometry = ref();
//
// function loadImage(src) {
//
// }
//
// function createGeometry() {
// 	const geometry = new THREE.InstancedBufferGeometry();
//
// 	/** POSITIONS
// 	(-0.5, 0.5)  * ---- *  (0.5, 0.5)
// 				 |      |
// 	(-0.5, -0.5) * ---- *  (0.5, -0.5) */
//
// 	const positions = new THREE.BufferAttribute(new Float32Array(4 * 3), 3);
//
// 	positions.setXYZ(0, -0.5, 0.5, 0.0);
// 	positions.setXYZ(1, 0.5, 0.5, 0.0);
// 	positions.setXYZ(2, -0.5, -0.5, 0.0);
// 	positions.setXYZ(3, 0.5, -0.5, 0.0);
//
// 	geometry.setAttribute('position', positions);
//
// 	/** UV */
// 	const uvs = new THREE.BufferAttribute(new Float32Array(4 * 2), 2);
//
// 	uvs.setXY(0, 0.0, 0.0);
// 	uvs.setXY(1, 1.0, 0.0);
// 	uvs.setXY(2, 0.0, 1.0);
// 	uvs.setXY(3, 1.0, 1.0);
//
// 	geometry.setAttribute('uv', uvs);
//
// 	/** INDEXES */
// 	const triangleIndexes = new THREE.BufferAttribute(
// 		new Uint16Array([
// 			0, 2, 1, // Три точки первого треугольника. Positions[0], Positions[2], Positions[1],
// 			2, 3, 1, // Три точки второго треугольника. Positions[2], Positions[3], Positions[1],
// 		]), 1);
//
// 	geometry.setIndex(triangleIndexes);
//
// 	return geometry;
// }
//
// function createPoints() {
// 	const indices = new Uint16Array(NUM_POINTS.value);
// 	const offsets = new Float32Array(NUM_POINTS.value * 3);
// 	const angles = new Float32Array(NUM_POINTS.value);
//
// 	for (let i = 0; i < NUM_POINTS.value; i++) {
// 		offsets[i * 3 + 0] = i % this.width; // x
// 		offsets[i * 3 + 1] = Math.floor(i / this.width); // y
//
// 		indices[i] = i;
//
// 		angles[i] = Math.random() * Math.PI;
// 	}
// }


onMounted(() => {
	const webgl = new WebGLView();

	el.value.appendChild(webgl.renderer.domElement);
	webgl.resize();

	const test = () => {
	}

	setInterval(() => {
		webgl.update();
		webgl.draw();
		test();

	}, 1130);
	// test();

	// webgl.init();
})
</script>

<style lang="scss">

.image-particles {
}
</style>
