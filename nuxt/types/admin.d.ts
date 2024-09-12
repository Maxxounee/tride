declare global {
	type AdminDB = {
		pageInfo: PageInfo;
		pageContent?: any;
	};

	type AdminRequestParams = {
		url?: string;
		deep?: number;
	};

	interface PageInfo {
		params: {
			id: string;
			url: string;
			slug: string;
			title: string;
			pageTitle: string;
			created: string;
		};
		meta: {
			description: string | null;
			keywords: string | null;
		};
		content: any;

		childrens?: PageInfo[];
	}
}

export {};
