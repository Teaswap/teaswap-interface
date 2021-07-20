export const truncStr = (str, len=10) => {
	if (!str) return ''
	if (str.length < 10) return str
	return str.slice(0, 10) + '...'
};

export const hideAddr = (str) => {
	if (!str) return ''
	if (str.length < 16) return str
	return str.slice(0, 8) + '...' + str.slice(-8)
};