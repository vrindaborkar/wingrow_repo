// import React, { useState, useEffect } from "react";
// import "../styles/Slider.css";
// import { CarouselWrapper } from "react-pretty-carousel";
// import useWindowDimensions from "./useWindowDimensions";

// export default function Slider() {
//   const [items, setItems] = useState(3);
//   const {width} = useWindowDimensions();

//   useEffect(() => {
//     if (width < 576) setItems(1);
//         else setItems(3);
//     window.addEventListener("resize", () => {
//       if (width < 576) setItems(1);
//       else setItems(3);
//     });
//   }, [width]);

//   return (
//     <div className="Slide">
//       <CarouselWrapper items={items} mode="gallery">
//         <div className="image image1"></div>
//         <div className="image image2"></div>
//         <div className="image image3"></div>
//         <div className="image image4"></div>
//         <div className="image image5"></div>
//         <div className="image image6"></div>
//       </CarouselWrapper>
//     </div>
//   );
// }
