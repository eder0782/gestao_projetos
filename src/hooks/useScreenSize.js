import { useState, useEffect } from "react";

//RETORNA A LARGURA E ALTURA DA TELA
export function useScreenSize() {
  const [screenSize, getDimension] = useState({
    dynamicWidth: 0,
    dynamicHeight: 0,
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", setDimension);
    if (screenSize.dynamicHeight === 0) {
      setDimension();
    }

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  return screenSize;
}
