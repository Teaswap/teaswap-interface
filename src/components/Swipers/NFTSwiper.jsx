import React from 'react';
// Import Swiper React components
import {Carousel} from '3d-react-carousal';
import Item from './Item'

const NFTSwiper = () => {
	let slides = [
    <Item src="https://i.Itemur.com/uVUrNwq.jpg" alt="1" />,
    <Item src="https://i.Itemur.com/LwG4Tg1.jpg" alt="2" />,
    <Item src="https://i.Itemur.com/miBU6TC.jpg" alt="3" />,
    <Item src="https://i.Itemur.com/NHsFjdK.jpg" alt="4" />,
    <Item src="https://i.Itemur.com/WoHWbBf.jpg" alt="5" />,
	];
	return (
		<Carousel arrows={true} slides={slides} autoplay={true} interval={1000}/>
	)
};
export default NFTSwiper;
