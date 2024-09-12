<template>
	<div class="LocationMap">
		<LMap
			ref="map"
			v-model:zoom="zoom"
			:min-zoom="minZoom"
			:max-zoom="maxZoom"
			:center="mapCenter"
			:options="{
				scrollWheelZoom: false,
				zoomControl: false,
				doubleClickZoom: false,
			}"
			:use-global-leaflet="false"
			@ready="mapInitialized"
		>
			<LTileLayer
				url="https://tile{s}.maps.2gis.com/tiles?x={x}&y={y}&z={z}&ts=online_hd"
				:subdomains="['0', '1', '2', '3', '4']"
				attribution="<a href='http://www.2gis.ru' target='_blank' title='2ГИС — Городской информационный сервис'>&copy; 2ГИС</a>"
			/>

			<LMarker
				v-for="(marker, key) in markers"
				:key
				:lat-lng="marker.coords"
			>
				<LIcon
					:icon-url="marker.icon"
					:icon-size="marker.size"
					:icon-anchor="marker.anchor"
				/>
			</LMarker>
		</LMap>
		<div
			class="LocationMap__zoom-control"
		>
			<button
				class="LocationMap__zoom-btn LocationMap__zoom-btn_out"
				:class="{ 'LocationMap__zoom-btn_active': !isMinZoom }"
				@click="zoomOut"
			>
				<span></span>
			</button>
			<button
				class="LocationMap__zoom-btn LocationMap__zoom-btn_in"
				:class="{ 'LocationMap__zoom-btn_active': !isMaxZoom }"
				@click="zoomIn"
			>
				<span></span>
				<span></span>
			</button>
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>
import type L from 'leaflet';

interface Markers {
	[index: string]: {
		coords: L.LatLngExpression;
		icon: string;
		size: [number, number];
		anchor: [number, number];
	};
}

const map = ref<any>(null);
const leaflet = ref<any>(null);
const mapCenter = ref<L.PointExpression>([43.670472, 39.709098]);
const markers = ref<Markers>({
	alean: {
		coords: [43.776267, 39.487771],
		icon: '/images/location/map/alean.svg',
		size: [90, 98],
		anchor: [45, 98],
	},
	sochi: {
		coords: [43.610472, 39.739098],
		icon: '/images/location/map/sochi.svg',
		size: [44, 58],
		anchor: [22, 58],
	},
	airport: {
		coords: [43.442330, 39.940363],
		icon: '/images/location/map/airport.svg',
		size: [44, 58],
		anchor: [22, 58],
	},
	sky: {
		coords: [43.700233, 40.216991],
		icon: '/images/location/map/sky.png',
		size: [44, 58],
		anchor: [22, 58],
	},
});

const minZoom = ref(9);
const maxZoom = ref(17);
const zoom = ref(10);

function mapInitialized() {
	leaflet.value = map.value?.leafletObject;
	leaflet.value?.attributionControl.setPrefix(false);
}

const isMinZoom = computed(() => zoom.value === minZoom.value);
const isMaxZoom = computed(() => zoom.value === maxZoom.value);

function zoomIn() {
	leaflet.value?.zoomIn();
}

function zoomOut() {
	leaflet.value?.zoomOut();
}
</script>

<style lang="scss">
.LocationMap__ {
	@include container100;

	.leaflet-pane {
		z-index: unset;
	}

	.leaflet-tile-pane {
		img {
			// filter: grayscale(1);
			filter: invert(0) saturate(0.38) brightness(0.92) hue-rotate(13deg) contrast(1.33);
		}
	}

	.leaflet-control-attribution {
		background: none;

		a {
			font-size: 1rem;
			color: inherit;
			text-decoration: none;
		}
	}

	.leaflet-marker-icon {
		object-fit: contain;
	}

	&__zoom-control {
		@include center(x);
		@include flex(center);

		z-index: 1;
		bottom: 4.3rem;
		gap: 1rem;
	}

	&__zoom-btn {
		position: relative;

		aspect-ratio: 1 / 1;
		width: 4.6rem;

		color: var(--color-sun);

		background-color: var(--color-white);
		border: 1px solid var(--color-sea);
		border-radius: 100%;

		span {
			position: absolute;
			top: 50%;
			left: 50%;
			translate: -50% -50%;

			width: 1.8rem;
			height: 1px;

			background: var(--color-sun);
		}

		&_in {
			span:last-of-type {
				rotate: 90deg;
			}
		}
	}
}
</style>
