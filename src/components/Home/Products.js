import React from 'react'
import Carousel from 'nuka-carousel';
import { useNavigate } from 'react-router';

export default function HomeProducts({products}) {
	const isMobile = window.innerWidth <= 500
	const navigate = useNavigate()
	return(
		<Carousel
			style={{
				width: isMobile ? '90%' : '100%',
				margin: '0 auto'
			}}
			className="page-banner drop-products"
			autoplay={true}
			wrapAround={true}
			scrollMode="remainder"
			slideWidth="330px"
			cellSpacing={isMobile ? 0 : 20}
			defaultControlsConfig={{
				nextButtonText: '>',
				prevButtonText: '<',
				pagingDotsStyle: {
					fill: 'white',
					margin: '0 5px',
				},
			}}
		>
			{products.map((product) => {
					return (
						<div onClick={() => navigate(product.link)} key={product.id} className="drop-product">
							{product.mediaType == 1 && (
								<img src={product.picture_url} />
							)}
							{product.mediaType == 2 && (
								<video autoPlay={true} muted src={product.picture_url} />
							)}
							<div>
								{product.title} {product.number}
							</div>
							<div>
								{product.desc}
							</div>
						</div>
					);
				})}

		</Carousel>
	)
}