import * as React from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import Item from './item.js'
import './index.css'

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
  { width: 1200, itemsToShow: 5 },
  { width: 1200, itemsToShow: 6 },
];


export default function CarousalCard() {
 

  return (
    <div className="App">
    <Carousel breakPoints={breakPoints}>
      <Item className="single-game">CAT</Item>
      <Item className="single-game">IIT</Item>
      <Item className="single-game">GATE</Item>
      <Item className="single-game">GRE</Item>
      <Item className="single-game">NEET</Item>
      <Item className="single-game">GMAT</Item>

    </Carousel>
  </div>
  );
}
