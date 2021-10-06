
import React, { useRef, useState } from "react";
import Carousel from "react-spring-3d-carousel";
import Item from "./Item"
import { useNavigate } from "react-router";

export default function App() {
  const navigate = useNavigate();
  let slides = [   
    {
      key: 1,
      content: <Item img="https://i.imgur.com/LwG4Tg1.jpg" amount= 'PRESALE 10/01'/>,
      link: 'https://opensea.io/collection/tsanft',
      
    },
    {
      key: 2,
      content: <Item img="https://i.imgur.com/miBU6TC.jpg" amount= 'PRESALE 10/01'/>,
      link:  process.env.PUBLIC_URL + '/nft/products/vendor/264197',
      
    },   
    {
      key: 3,
      content: <Item img="https://i.imgur.com/WoHWbBf.jpg" amount= 'PRESALE 10/01'/>,
      link: 'https://opensea.io/collection/tsanft',
      
    },
    {
      key: 4,
      content: <Item img= {process.env.PUBLIC_URL  + '/nft/products/1.jpg'} amount= 'PRESALE 10/06' />,
      link: 'https://www.teaswap.art/staking',     
      
    },
    {
      key: 5,
      content: <Item img= {process.env.PUBLIC_URL  + '/nft/products/8.png'} amount= 'PRESALE 10/07' />,
      link: 'https://www.teaswap.art/nft/products/category/3',
      
    },
    {
      key: 6,
      content: <Item img= {process.env.PUBLIC_URL  + '/nft/products/0026.png'} amount= 'PRESALE 10/01' />,
      link: 'https://www.teaswap.art/nft/products/vendor/264202',
      
    },
    {
      key: 7,
      content: <Item img= {process.env.PUBLIC_URL  + '/nft/products/0027.png'} amount='PRESALE 10/10' />,
      link: 'https://www.teaswap.art/nft/products/vendor/264023',
     
    },
   
    
  ].map((slide, index) => {
    return { ...slide, onClick: () => {
      if (index == goToSlide) {
        window.open(slides[index].link)
        // if( slides[index].key==3 || slides[index].key==1)
        // {
        //   window.open('https://opensea.io/collection/tsanft')
        // }else{
        //   navigate('/nft/products/vendor/264197')
        // }
        
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