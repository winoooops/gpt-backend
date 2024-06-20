export function isNotEmptyString(s: string | undefined): boolean {
	return typeof s === 'string' && s.trim().length > 0;
}