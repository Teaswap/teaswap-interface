import React from 'react'
import Carousel from 'nuka-carousel';

export default function HomeProducts({products}) {
	return(
		<Carousel
			style={{
				width: '100%',
				margin: '0 auto'
			}}
			className="page-banner drop-products"
			autoplay={true}
			wrapAround={true}
			scrollMode="remainder"
			slideWidth="330px"
			cellSpacing={20}
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
						<div className="drop-product">
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