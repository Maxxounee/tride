export default defineNuxtConfig({
	devtools: {enabled: false},
	app: {
		head: {
			htmlAttrs: {
				lang: 'ru',
			},
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1, user-scalable=no',
			meta: [
				{name: 'format-detection', content: 'telephone=no'},
				{name: 'msapplication-TileColor', content: '#2d89ef'},
			],
			link: [
				{rel: 'manifest', href: '/site.webmanifest'},
			],
			noscript: [{children: 'JavaScript is required'}],
		},
	},

	runtimeConfig: {
		public: {
			counters: false,
		},
	},

	modules: [
		'@nuxt/image',
		'@nuxt/eslint',
		'@nuxt/fonts',
		'@nuxt/icon',
		'nuxt-icons',

		'@pinia/nuxt',
		'@vueuse/nuxt',
		'@nuxtjs/device',
		'@nuxtjs/leaflet',

		'@hypernym/nuxt-gsap',
		'@tresjs/nuxt',
	],
	icon: {
		mode: 'svg',
		class: 'icon',
		fallbackToApi: false,
		attrs: {
			'stroke-width': '0',
		},
		customCollections: [],
	},

	plugins: [],

	image: {
		quality: 80,
		format: ['webp'],

		presets: {
			default: {
				quality: 80,
				format: 'webp',
			},
		},
	},

	fonts: {
		defaults: {
			weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
		},
	},

	gsap: {
		composables: true,
		extraPlugins: {
			scrollTrigger: true,
		},
	},

	eslint: {
		config: {
			stylistic: {
				indent: 'tab',
				semi: true,
			},
		},
	},

	css: ['@/assets/styles/global.scss'],

	future: {
		compatibilityVersion: 4,
	},
	compatibilityDate: '2024-08-23',
	srcDir: './client',

	nitro: {
		// logLevel: 1,
		compressPublicAssets: {gzip: true, brotli: true},
	},
	vite: {
		// logLevel: 'warn',
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
					@use "@/assets/styles/vars/mixins.scss" as *;
					`,
				},
			},
		},
	},

	vue: {
		compilerOptions: {
			isCustomElement: (tag: string): boolean => tag.includes('-'),
		},
	},
	devServer: {
		host: '0.0.0.0',
	},
	features: {
		devLogs: true,
		inlineStyles: false,
	},
	experimental: {
		typedPages: true,
	},

	telemetry: false,
});
