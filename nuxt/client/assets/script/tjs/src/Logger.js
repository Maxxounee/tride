import RayCaster from './raycaster';

export default class Logger {
	camera;
	items;
	scene;
	rayCaster;
	pointer = {};
	config = {};
	table;
	tableInner;
	defaultItem = {
		opacity: 1,
	};
	localStorageKey = 'TJS_CONFIG';

	constructor(camera, scene, items) {
		if (!items || !scene || !camera) return this;
		console.log('123', items, scene, camera);

		this.items = items;
		this.camera = camera;
		this.scene = scene;

		this.create();

		return this;
	}

	create() {
		this.pointer = new THREE.Vector2();

		this.rayCaster = new RayCaster({
			onClick: (event)=>{
				this.onClick(event);
			},
		});

		this.config = JSON.parse(localStorage.getItem(this.localStorageKey) ?? '{}');

		this.createTable();
		this.updateTable();
		this.updateItemsProperties();
	}

	updateItemsProperties() {
		Object.entries(this.config).forEach(([index, value])=>{
			this.items[index].material.opacity = value.opacity;
		});
	}

	download() {
		const dataStr = this.getJson();

		const dataBlob = new Blob([dataStr], { type: 'text/plain' });

		const dataUrl = URL.createObjectURL(dataBlob);

		const downloadLink = document.createElement('a');
		downloadLink.href = dataUrl;
		downloadLink.download = 'tjs.txt';

		document.body.appendChild(downloadLink);
		downloadLink.click();

		document.body.removeChild(downloadLink);

		URL.revokeObjectURL(dataUrl);
	}

	createTable() {
		this.table?.remove();

		this.table = document.createElement('div');
		this.tableInner = document.createElement('div');

		this.table.appendChild(this.tableInner);

		const button = document.createElement('button');
		button.addEventListener('click', ()=>this.download());

		button.innerText = 'download';

		this.table.appendChild(button);

		Object.assign(this.table.style, {
			position: 'fixed',
			top: 0,
			right: 0,
			background: 'black',
			color: 'white',
			padding: '20px',
		});

		this.table.classList.add('logger-table');

		document.body.append(this.table);
	}

	getJson() {
		return JSON.stringify(this.config, null, 2);
	}

	createBlock(index, value) {
		const block = document.createElement('div');

		Object.assign(block.style, {
			display: 'flex',
			alignItems: 'center',
			gap: '10px',
		});
		const indexSpan = document.createElement('span');
		const inputOpacity = document.createElement('input');

		indexSpan.innerHTML = index;

		inputOpacity.classList.add('tjs-opacity');

		inputOpacity.setAttribute('type', 'range');
		inputOpacity.setAttribute('min', '0');
		inputOpacity.setAttribute('max', '1');
		inputOpacity.setAttribute('step', '0.01');

		inputOpacity.value = value.opacity;

		block.appendChild(indexSpan);
		block.appendChild(inputOpacity);

		inputOpacity.addEventListener('mouseover', (event)=>{
			this.items[index].material.color.setRGB(0, 0.5, 1);
			setTimeout(()=>(this.items[index].material.color.setRGB(1, 1, 1)), 600);
		});

		inputOpacity.addEventListener('input', (event)=>{
			this.writeConfig({ index, opacity: event.target.value });
		});

		return block;
	}

	updateTable() {
		this.tableInner.innerHTML = '';

		Object.entries(this.config).forEach(([index, value])=>{
			const block = this.createBlock(index, value);
			this.tableInner.appendChild(block);
		});
	}

	writeConfig({ index, opacity }) {
		if (!this.config[index]) this.config[index] = { ...this.defaultItem };

		if (opacity !== undefined) {
			this.config[index].opacity = opacity;

			this.items[index].material.opacity = opacity;
		}

		localStorage.setItem(this.localStorageKey, this.getJson());
	}

	render() {
		this.rayCaster.setFromCamera(this.pointer, this.camera);

		const intersects = this.rayCaster.intersectObjects(this.scene.children);

		for (let i = 0; i < intersects.length; i++) {
			const object = intersects[i].object;

			const index = this.items.indexOf(object);
			this.writeConfig({ index });
			this.updateTable();
		}
	}

	onClick(event) {
		this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
		this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

		this.render();
	};

}
