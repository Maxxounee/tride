export const useIntersectionObserverLocal = ({ element, intersectedHandler, once }: any) => {
	class Observer {
		instance: any;
		once: boolean;
		handler: any;

		constructor({ element, intersectedHandler, once }: any) {
			this.handler = intersectedHandler;
			this.once = !!once;

			this.instance = new IntersectionObserver(this.observerHandler.bind(this), { threshold: 0.8 });
			this.instance.observe(element);
		}

		destroy() {
			if (this.instance) {
				this.instance.disconnect();
				this.instance = null;
			}
		}

		observerHandler([entry]: IntersectionObserverEntry[]) {
			if (entry.isIntersecting) {
				this.handler();
				if (this.once) {
					this.destroy();
				}
			}
		}
	}

	return new Observer({ element, intersectedHandler, once });
};
