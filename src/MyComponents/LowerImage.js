import React, { Fragment, useRef, useEffect } from 'react'
import lowerleft from "./Images/lowerleft.png";
import lowerright from "./Images/lowerright.png";

export default function LowerImage() {
    const lowerImage = useRef();
    const lowerRightImage = useRef();
  
    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY || window.pageYOffset;
    
        if (scrollY > 100) {
          lowerImage.current.style.opacity = "1";
          lowerRightImage.current.style.opacity = "1";
        } else {
          lowerImage.current.style.opacity = "0";
          lowerRightImage.current.style.opacity = "0";
        }
      };
    
      window.addEventListener("scroll", handleScroll);
    
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
    
  return (
    <Fragment>
        <img
        src={lowerleft}
        alt="Lower Left"
        ref={lowerImage}
        style={{
          position: "fixed",
          bottom: 0,
          transition: "transform 0.3s ease-in-out",
        }}
      />

      <img
        src={lowerright}
        alt="Lower Right"
        ref={lowerRightImage}
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          transition: "opacity 0.3s ease-in-out",
        }} />
    </Fragment>
  )
}
