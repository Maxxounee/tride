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
				const geometry2 = new THREE.BufferGeometry();

				const positions = new Float32Array([
					-this.hSquare / 2, -this.vSquare / 2, 0,
					this.hSquare / 2, -this.vSquare / 2, 0,
					this.hSquare / 2, this.vSquare / 2, 0,
					-this.hSquare / 2, this.vSquare / 2, 0,
				]);

				const positions2 = new Float32Array([
					-this.hSquare / 2, -this.vSquare / 2, 1,
					this.hSquare / 2, -this.vSquare / 2, 1,
					this.hSquare / 2, this.vSquare / 2, 1,
					-this.hSquare / 2, this.vSquare / 2, 1,
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

				geometry2.setAttribute('position', new THREE.BufferAttribute(positions2, 3));
				geometry2.setIndex(new THREE.BufferAttribute(indices, 1));
				geometry2.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

				const material = new THREE.MeshBasicMaterial({ map: this.texture, transparent: true });

				const blurMaterial = new THREE.MeshPhysicalMaterial({
					transmission: 0.3,
					roughness: 0.3,
					opacity: 0.3,
				});

				const square = new THREE.Mesh(geometry, material);
				const blurSquare = new THREE.Mesh(geometry2, blurMaterial);

				square.position.set(
					i * this.hSquare - this.imageWidth / 2,
					j * this.vSquare - this.imageHeight / 2,
				);

				blurSquare.position.set(
					i * this.hSquare - this.imageWidth / 2,
					j * this.vSquare - this.imageHeight / 2,
					10,
				);

				this.squares.push(square);
				this.scene.add(square);
				// this.scene.add(blurSquare);
			}
		}

		return this.squares;
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
