
import React, { useRef, useState } from "react";
import Carousel from "react-spring-3d-carousel";
import Item from "./Item"

export default function App() {
  let slides = [
    {
      key: 1,
      content: <Item img="https://i.imgur.com/uVUrNwq.jpg" />,
    },
    {
      key: 2,
      content: <Item img="https://i.imgur.com/LwG4Tg1.jpg" />,
    },
    {
      key: 3,
      content: <Item img="https://i.imgur.com/miBU6TC.jpg" />,
    },
    {
      key: 4,
      content: <Item img="https://i.imgur.com/NHsFjdK.jpg" />,
    },
    {
      key: 5,
      content: <Item img="https://i.imgur.com/WoHWbBf.jpg" />,
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