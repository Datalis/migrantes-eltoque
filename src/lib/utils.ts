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
