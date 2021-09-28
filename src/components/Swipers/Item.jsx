import React from 'react';

const Item = ({img}) => {
	return (
		<div className="nft-swiper" style={{
			position: 'relative'
		}}>
    	<img className="nft-swiper-img" src={img}/>
			<span style={{
				position: 'absolute',
				top: 10,
				left: 10,				
				padding: '5px 10px',
				backgroundColor: "#ffffff"
			}}>🔥 PRESALE 10/01</span>
			<span style={{
				position: 'absolute',
				bottom: 5,
				right: -95,
				padding: '1px 4px',
				backgroundColor: "#ffffff"
			}}>sale price 0.18 ETH</span>
		</div>
	)
};
export default Item;
