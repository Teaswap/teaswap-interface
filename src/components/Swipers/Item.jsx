import React from 'react';

const Item = ({img , amount}) => {
	return (
		<div className="nft-swiper" style={{
			position: 'relative'
		}}>
    	<img className="nft-swiper-img" src={img}/>
			<span style={{
				position: 'absolute',
				top: 461,
				left: 10,				
				padding: '5px 10px',
				color: "#000000"
				//backgroundColor: "#ffffff"
			}}>🔥 {amount}</span>
			{/* <span style={{
				position: 'absolute',
				bottom: 5,
				right: -95,
				padding: '1px 4px',
				backgroundColor: "#ffffff"
			}}>sale price 0.18 ETH</span> */}
		</div>
	)
};
export default Item;
