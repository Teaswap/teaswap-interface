
import React, { useRef, useState } from "react";
import Carousel from "react-spring-3d-carousel";
import Item from "./Item"
import { useNavigate } from "react-router";

export default function App() {
  const navigate = useNavigate();
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
    return { ...slide, onClick: () => {
      if (index == goToSlide) {
        if(slides[index].key==4 || slides[index].key==2 || slides[index].key==1)
        {
          window.open('https://opensea.io/collection/tsanft')
        }else{
          navigate('/nft/products/vendor/264197')
        }
        
      }else
        setGoToSlide(index)
    }, onMouseOver: () => setGoToSlide(index) };
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