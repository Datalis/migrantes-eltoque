import { elasticOut } from 'svelte/easing'

export function trimString(s: string) {
	let l = 0,
		r = s.length - 1;
	while (l < s.length && s[l] == ' ') l++;
	while (r > l && s[r] == ' ') r -= 1;
	return s.substring(l, r + 1);
}

export function compareObjects(o1: any, o2: any) {
	let k = '';
	for (k in o1) if (o1[k] != o2[k]) return false;
	for (k in o2) if (o1[k] != o2[k]) return false;
	return true;
}

export function inViewport(node: HTMLElement, params: any = {}) {
	let observer: any;

	const handleIntersect = (e: any) => {
		const v = e[0].isIntersecting ? "enter" : "exit";
		node.dispatchEvent(new CustomEvent(v));
	};

	const setObserver = (params: any) => {
		const { root, threshold } = params;
		const options = { root, threshold };
		if (observer) observer.disconnect();
		observer = new IntersectionObserver(handleIntersect, options);;
		observer.observe(node);
	}

	setObserver(params);

	return {
		update(params: { root: any; threshold: any; }) {
			setObserver(params);
		},

		destroy() {
			if (observer) observer.disconnect();
		}
	};
}


export function parseDate(v: string) {
	if (!v || v == '' || v == '-') return null;
	const match = v.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
	// console.log(match);
	if (!match) return null;
	return new Date(+match[3],  // year
		+match[2] - 1,  // monthIndex
		+match[1],  // day
	);
}

export const imageLoader = (url: string) => {
	if (url.indexOf('imagedelivery.net') !== -1) {
		return url;
	}
	return `https://api.eltoque.com${url}`;
}