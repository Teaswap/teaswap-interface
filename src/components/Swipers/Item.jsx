import React from 'react';
import styled from 'styled-components'

const SpanStyle = styled.span`
position: absolute;
top: 470px;
left: 0px;				
padding: 5px 10px;
color: #000000;
@media (max-width: 500px) {
	top: 230px;
	left: -8px;
	font-size: 8px;
  } 
`

const Item = ({img , amount}) => {
	return (
		<div className="nft-swiper" style={{
			position: 'relative'
		}}>
    	<img className="nft-swiper-img" src={img}/>
		<SpanStyle>🔥 {amount} </SpanStyle>
			{/* <span style={{
				position: 'absolute',
				top: 461,
				left: 10,				
				padding: '5px 10px',
				color: "#000000",
				
			}}>🔥 {amount}</span>
			{} */}
		</div>
	)
};
export default Item;
