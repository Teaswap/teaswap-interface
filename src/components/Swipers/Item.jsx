import React from 'react';

const Item = ({img}) => {
	return (
		<div className="nft-swiper" style={{
			position: 'relative'
		}}>
    	<img className="nft-swiper-img" src={img}/>
			<span style={{
				position: 'absolute',
				bottom: 20,
				left: 20,
				padding: '5px 20px',
				backgroundColor: "#ffffff"
			}}>0.18 ETH</span>
		</div>
	)
};
export default Item;
