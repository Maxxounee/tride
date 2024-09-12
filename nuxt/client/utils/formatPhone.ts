export default (tel: string) => `tel:${tel.replace(/[^\d+]/g, '')}`;
