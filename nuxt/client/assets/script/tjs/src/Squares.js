import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

export default class Squares {
	src;
	texture;
	imageHeight;
	imageWidth;

	squares = [];

	hSquare;
	vSquare;
	hCount;
	vCount;

	constructor(opt = {}) {
		this.src = opt.src;
		this.hCount = opt.hCount;
		this.vCount = opt.vCount;
		this.scene = opt.scene;
		this.renderer = opt.renderer;
		this.camera = opt.camera;

		return this.init();
	}

	async init() {
		await this.loadImage();
		this.createSquares();
		this.setProperties();

		return this.squares;
	}

	async loadImage() {
		const onLoadHandler = (texture)=>{
			this.texture = texture;
			this.imageWidth = this.texture.image.width;
			this.imageHeight = this.texture.image.height;
		};
		console.log('thishisihsih', this.src);

		return new Promise((resolve, reject)=>{
			new THREE.TextureLoader().load(this.src, (texture)=>{
				onLoadHandler(texture);

				resolve(texture);
			});
		});
	}

	createSquares() {
		this.hSquare = Math.round(this.imageWidth / this.hCount);
		this.vSquare = Math.round(this.imageHeight / this.vCount);

		for (let i = 0; i < this.hCount; i++) {
			for (let j = 0; j < this.vCount; j++) {
				const geometry = new THREE.BufferGeometry();

				const positions = new Float32Array([
					-this.hSquare / 2, -this.vSquare / 2, 0,
					this.hSquare / 2, -this.vSquare / 2, 0,
					this.hSquare / 2, this.vSquare / 2, 0,
					-this.hSquare / 2, this.vSquare / 2, 0,
				]);

				const indices = new Uint16Array([
					0, 1, 2,
					0, 2, 3,
				]);

				const uvs = new Float32Array([
					i / this.hCount, j / this.vCount,
					(i + 1) / this.hCount, j / this.vCount,
					(i + 1) / this.hCount, (j + 1) / this.vCount,
					i / this.hCount, (j + 1) / this.vCount,
				]);

				geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
				geometry.setIndex(new THREE.BufferAttribute(indices, 1));
				geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

				const material = new THREE.MeshBasicMaterial({ map: this.texture, transparent: true });

				const square = new THREE.Mesh(geometry, material);

				square.position.set(
					i * this.hSquare - this.imageWidth / 2,
					j * this.vSquare - this.imageHeight / 2,
				);

				let blurMaterial;
				let blurSquare;
				const addBlur = ()=>{

					const vertexShader = `
						varying vec2 vUv;

						void main() {
							vUv = uv;
							gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
						}
					`;

					const fragmentShader = `
					uniform sampler2D map;
					uniform float blurSize;
					varying vec2 vUv;

					void main() {
						vec4 sum = vec4(0.0);
						float blur = blurSize / 1000.0;

						// Horizontal blur
						sum += texture2D(map, vec2(vUv.x - 4.0 * blur, vUv.y)) * 0.05;
						sum += texture2D(map, vec2(vUv.x - 3.0 * blur, vUv.y)) * 0.09;
						sum += texture2D(map, vec2(vUv.x - 2.0 * blur, vUv.y)) * 0.12;
						sum += texture2D(map, vec2(vUv.x - blur, vUv.y)) * 0.15;
						sum += texture2D(map, vec2(vUv.x, vUv.y)) * 0.16;
						sum += texture2D(map, vec2(vUv.x + blur, vUv.y)) * 0.15;
						sum += texture2D(map, vec2(vUv.x + 2.0 * blur, vUv.y)) * 0.12;
						sum += texture2D(map, vec2(vUv.x + 3.0 * blur, vUv.y)) * 0.09;
						sum += texture2D(map, vec2(vUv.x + 4.0 * blur, vUv.y)) * 0.05;

						// Vertical blur
						sum += texture2D(map, vec2(vUv.x, vUv.y - 4.0 * blur)) * 0.05;
						sum += texture2D(map, vec2(vUv.x, vUv.y - 3.0 * blur)) * 0.09;
						sum += texture2D(map, vec2(vUv.x, vUv.y - 2.0 * blur)) * 0.12;
						sum += texture2D(map, vec2(vUv.x, vUv.y - blur)) * 0.15;
						sum += texture2D(map, vec2(vUv.x, vUv.y)) * 0.16;
						sum += texture2D(map, vec2(vUv.x, vUv.y + blur)) * 0.15;
						sum += texture2D(map, vec2(vUv.x, vUv.y + 2.0 * blur)) * 0.12;
						sum += texture2D(map, vec2(vUv.x, vUv.y + 3.0 * blur)) * 0.09;
						sum += texture2D(map, vec2(vUv.x, vUv.y + 4.0 * blur)) * 0.05;

						gl_FragColor = sum / 2.0;
					}
				`;

					const blurMaterial = new THREE.ShaderMaterial({
						uniforms: {
							// map: { value: this.texture },
							blurSize: { value: 10.0 },
						},
						vertexShader: vertexShader,
						fragmentShader: fragmentShader,
						transparent: true,
					});

					blurSquare = new THREE.Mesh(geometry, blurMaterial);
					blurSquare.position.set(
						i * this.hSquare - this.imageWidth / 2,
						j * this.vSquare - this.imageHeight / 2,
						10, 10,
					);
				};
				addBlur();
				this.scene.add(blurSquare);

				this.squares.push(square);

				this.scene.add(square);
			}
		}

		return this.squares;
	}

	addBlur(geometry) {

	}

	setProperties() {
		// Создаем EffectComposer и добавляем RenderPass
		const composer = new EffectComposer(this.renderer);
		const renderPass = new RenderPass(this.scene, this.camera);
		composer.addPass(renderPass);

		// const blurPass = new THREE.BlurPass();
		// composer.addPass(blurPass);

		new THREE.MeshPhysicalMaterial({
			transmission: 1,
			roughness: 0.4,
		});

		this.squares.forEach((square, index)=>{
		});
	}
}
