module.exports = {
	apps: [
		{
			name: '%stage%',
			port: '%port%',
			exec_mode: 'cluster',
			instances: '1',
			script: './.output/server/index.mjs',
			args: 'start',
			env: {
				NUXT_PUBLIC_ADMIN_URL: 'https://%stage%',
			},
		},
		{
			name: '%production%',
			port: '%port%',
			exec_mode: 'cluster',
			instances: '1',
			script: './.output/server/index.mjs',
			args: 'start',
			env: {
				NUXT_PUBLIC_ADMIN_URL: 'https://%production%',
				NUXT_PUBLIC_COUNTERS: 'true',
				BUILD_DIR: '.nuxt-temp',
			},
		},
	],
};
