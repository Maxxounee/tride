module.exports = {
	dataPath: 'htdocs/hydra/json_dev/living.json',
	resultPath: 'htdocs/hydra/map/living.json',
	folders: {
		floors: {
			path: 'nuxt/public/hydra/living/vector/floors',
			fileNames: ({ b, s, f }) => `b${b}-s${s}-f${f}`,
		},
		lots: {
			path: 'nuxt/public/hydra/living/vector/lots',
			fileNames: ({ b, s, f, $p }) => `b${b}-s${s}-f${f}-p${$p}`,
		},
	},
	mapValues: ({ $files, $p }) => ({
		apartment: {
			$floor: `/hydra/living/vector/floors/${$files.floors[0]}`,
			$lot: `/hydra/living/vector/lots/${$files.lots[0]}`,
			$p: $p,
		},
		floor: {
			$floor: `/hydra/living/vector/floors/${$files.floors[0]}`,
		},
	}),
};
