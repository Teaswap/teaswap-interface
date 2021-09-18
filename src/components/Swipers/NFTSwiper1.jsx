
import React, { useRef, useState } from "react";
import Carousel from "react-spring-3d-carousel";

export default function App() {
  let slides = [
    {
      key: 1,
      content: <img className="nft-swiper-img" src="https://i.imgur.com/uVUrNwq.jpg" alt="1" />,
    },
    {
      key: 2,
      content: <img className="nft-swiper-img" src="https://i.imgur.com/LwG4Tg1.jpg" alt="2" />,
    },
    {
      key: 3,
      content: <img className="nft-swiper-img" src="https://i.imgur.com/miBU6TC.jpg" alt="3" />,
    },
    {
      key: 4,
      content: <img className="nft-swiper-img" src="https://i.imgur.com/NHsFjdK.jpg" alt="4" />,
    },
    {
      key: 5,
      content: <img className="nft-swiper-img" src="https://i.imgur.com/WoHWbBf.jpg" alt="5" />,

    },
    
  ].map((slide, index) => {
    return { ...slide, onClick: () => setGoToSlide(index), onMouseOver: () => setGoToSlide(index) };
  }); 
  const[goToSlide, setGoToSlide] = useState(0)
  return (
    <div className="nft-swiper">
      <Carousel
          autoplay={true}
          slides={slides}
          goToSlide={goToSlide}
          offsetRadius={2}
          showNavigation={false}
        />
    </div>
  )
}