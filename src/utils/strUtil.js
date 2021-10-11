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

export const LastBid = (Carts) => {
	if (!Carts || Carts.length == 0) 
		return 'no bid';
	let Cart = Carts[0];
	Carts.forEach(v => {
		if (v.bidprice > Cart.bidprice) {
			Cart=v
		}
	})	
	return Cart.bidprice
}