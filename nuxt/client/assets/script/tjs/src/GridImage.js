import * as THREE from 'three';
import {
	getCathetus,
	getHypotenuse,
} from './utils';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Renderer from './Renderer';
import Camera from './Camera';
import Scene from './Scene';
import Controls from './Controls';
import SpotLight from './light/SpotLight';
import Logger from './Logger';
import Squares from './Squares';

export default class GridImage {
	container;

	/** IMAGE */
	material;

	/** SCR */
	scene;
	camera;
	renderer;

	/** LIGHT */
	spotLight;

	/** SQUARES */
	squares = [];

	constructor(opt = {}) {
		if (!opt.container) {
			console.error('GridImage no container');
			return;
		}

		if (!window.THREE) {
			window.THREE = THREE;
		}

		this.container = opt.container;

		return this;
	}

	init() {
		this.createSCR();
		this.createLight();

		this.scene.add(this.spotLight);

		return {
			scene: this.scene,
			camera: this.camera,
			renderer: this.renderer,
			controls: this.controls,
			spotLight: this.spotLight,
		};
	}

	/** SCENE CAMERA RENDERER */
	createSCR(options = {}) {
		const opt = {
			...options,
		};

		this.scene = new Scene();
		this.camera = new Camera();
		this.renderer = new Renderer();

		this.container.appendChild(this.renderer.domElement);

		return this;
	}

	/** CONTROLS */
	createControls(options = {}) {
		this.controls = new Controls(this.camera, this.container);
	}

	/** LIGHT */
	createLight() {
		this.spotLight = new SpotLight();
	}

	async addSquares(opt = {}) {
		if (!opt.src || !opt.hCount || !opt.vCount) return;
		console.log('aasadasads', this);
		this.squares = await new Squares({
			src: opt.src,
			hCount: opt.hCount,
			vCount: opt.vCount,
			// renderer: this.renderer,
			...this,
		});
	}

	initDevMode() {
		new Logger(this.camera, this.scene, this.squares);
	}

	animate() {
		requestAnimationFrame(this.animate.bind(this));
		setTimeout(()=>{
			this.renderer.render(this.scene, this.camera);
		}, 500);
		this.renderer.render(this.scene, this.camera);
		this.controls?.update();
	}
}
