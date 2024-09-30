import * as THREE from 'three';

// const glslify = require('glslify');
import glslify from 'glslify';
import TouchTexture from './touchTexture';

export default class Particles {
	webgl;
	container;
	numPoints;

	constructor(webgl) {
		this.webgl = webgl;
		this.container = new THREE.Object3D();
	}

	init(src) {
		if (!src) {
			console.error('PARTICLES.JS INIT NO SRC');
			return;
		}

		const loader = new THREE.TextureLoader();

		loader.load(src, (texture)=>{
			this.texture = texture;
			this.texture.minFilter = THREE.LinearFilter;
			this.texture.magFilter = THREE.LinearFilter;
			this.texture.format = THREE.RGBFormat;

			this.width = texture.image.width;
			this.height = texture.image.height;

			this.initPoints();
			this.initHitArea();
			this.initTouch();
			this.resize();
			this.show();
		});
	}

	initPoints() {
		this.numPoints = this.width * this.height;

		let numVisible = this.numPoints;
		let threshold = 0;
		let originalColors;

		const uniforms = {
			uTime: { value: 0 },
			uRandom: { value: 1.0 },
			uDepth: { value: 2.0 },
			uSize: { value: 0.0 },
			uTextureSize: { value: new THREE.Vector2(this.width, this.height) },
			uTexture: { value: this.texture },
			uTouch: { value: null },
		};

		const material = new THREE.RawShaderMaterial({
			uniforms,
			vertexShader: glslify(import('/shaders/imageParticles/particle.vert')),
			fragmentShader: glslify(import('/shaders/imageParticles/particle.frag')),
			depthTest: false,
			transparent: true,
		});

		const geometry = new THREE.InstancedBufferGeometry();

		/** POSITIONS
		(-0.5, 0.5)  * ---- *  (0.5, 0.5)
					 |      |
		(-0.5, -0.5) * ---- *  (0.5, -0.5) */
		const positions = new THREE.BufferAttribute(new Float32Array(4 * 3), 3);

		positions.setXYZ(0, -0.5, 0.5, 0.0);
		positions.setXYZ(1, 0.5, 0.5, 0.0);
		positions.setXYZ(2, -0.5, -0.5, 0.0);
		positions.setXYZ(3, 0.5, -0.5, 0.0);

		geometry.setAttribute('position', positions);

		const createUv = ()=>{
			const uvs = new THREE.BufferAttribute(new Float32Array(4 * 2), 2);

			uvs.setXY(0, 0.0, 0.0);
			uvs.setXY(1, 1.0, 0.0);
			uvs.setXY(2, 0.0, 1.0);
			uvs.setXY(3, 1.0, 1.0);

			geometry.setAttribute('uv', uvs);
		};

		createUv();

		/** INDEXES */
		const triangleIndexes = new THREE.BufferAttribute(
			new Uint16Array([
				0, 2, 1, // Три точки первого треугольника. Positions[0], Positions[2], Positions[1],
				2, 3, 1, // Три точки второго треугольника. Positions[2], Positions[3], Positions[1],
			]), 1);

		geometry.setIndex(triangleIndexes);

		const indices = new Uint16Array(this.numPoints);
		const offsets = new Float32Array(this.numPoints * 3);
		const angles = new Float32Array(this.numPoints);

		for (let i = 0; i < this.numPoints; i++) {
			offsets[i * 3 + 0] = i % this.width; // x
			offsets[i * 3 + 1] = Math.floor(i / this.width); // y

			indices[i] = i;

			angles[i] = Math.random() * Math.PI;
		}

		geometry.setAttribute('pindex', new THREE.InstancedBufferAttribute(indices, 1));
		geometry.setAttribute('offset', new THREE.InstancedBufferAttribute(offsets, 3));
		geometry.setAttribute('angle', new THREE.InstancedBufferAttribute(angles, 1));

		this.object3D = new THREE.Mesh(geometry, material);
		
		this.container.add(this.object3D);
	}

	initHitArea() {
		const geometry = new THREE.PlaneGeometry(this.width, this.height, 1, 1);
		const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true, depthTest: false });
		material.visible = false;
		this.hitArea = new THREE.Mesh(geometry, material);
		this.container.add(this.hitArea);
	}

	initTouch() {
		// create only once
		if (!this.touch) this.touch = new TouchTexture(this);

		this.object3D.material.uniforms.uTouch.value = this.touch.texture;
	}

	resize() {
		if (!this.object3D) return;

		const scale = this.webgl.fovHeight / this.height;
		this.object3D.scale.set(scale, scale, 1);
		this.hitArea.scale.set(scale, scale, 1);
	}

	update(delta) {
		if (!this.object3D) return;
		if (this.touch) this.touch.update();

		this.object3D.material.uniforms.uTime.value += delta;
	}

	show(time = 1.0) {
		// reset
		this.object3D.material.uniforms.uSize = 0.5;
		this.object3D.material.uniforms.uRandom = 2.0;
		this.object3D.material.uniforms.uDepth = 40.0;

		// TweenLite.fromTo(this.object3D.material.uniforms.uSize, time, { value: 0.5 }, { value: 1.5 });
		// TweenLite.to(this.object3D.material.uniforms.uRandom, time, { value: 2.0 });
		// TweenLite.fromTo(this.object3D.material.uniforms.uDepth, time * 1.5, { value: 40.0 }, { value: 4.0 });
		//
		// this.addListeners();
	}
}
