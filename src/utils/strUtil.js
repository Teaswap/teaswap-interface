export const truncStr = (str, len=10) => {
	if (!str) return ''
	if (str.length < 10) return str
	return str.slice(0, 10) + '...'
};
