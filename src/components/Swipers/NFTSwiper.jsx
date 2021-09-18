import React from 'react';
// Import Swiper React components
import {Carousel} from '3d-react-carousal';

const NFTSwiper = () => {
	let slides = [
    <img className="nft-swiper-img" src="https://i.imgur.com/uVUrNwq.jpg" alt="1" />,
    <img className="nft-swiper-img" src="https://i.imgur.com/LwG4Tg1.jpg" alt="2" />,
    <img className="nft-swiper-img" src="https://i.imgur.com/miBU6TC.jpg" alt="3" />,
    <img className="nft-swiper-img" src="https://i.imgur.com/NHsFjdK.jpg" alt="4" />,
    <img className="nft-swiper-img" src="https://i.imgur.com/WoHWbBf.jpg" alt="5" />,
	];
	return (
		<Carousel arrows={true} slides={slides} autoplay={true} interval={1000}/>
	)
};
export default NFTSwiper;
