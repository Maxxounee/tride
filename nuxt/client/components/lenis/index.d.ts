import type { Lenis } from '#components';

declare global {
	type LenisComponent = InstanceType<typeof Lenis>;
}
