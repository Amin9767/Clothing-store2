"use client";
import { getSlider } from "@/services/api";
import React, { createContext, useContext, useEffect, useState } from "react";
import {  TSlides } from "../serverTypes/serverTypes";
interface ISliderContextProvider {
  children: React.ReactNode;
}


interface ISliderResponse {
  [key: string]: TSlides;
}
export const SliderContext = createContext<ISliderResponse | undefined>(undefined);
export const useSliderContext = () => {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error("No Context");
  }
  return context;
};
export const SliderContextProvider = ({ children }: ISliderContextProvider) => {
  const [slideData, setSlideData] = useState<TSlides>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response: ISliderResponse = await getSlider();
      console.log(response);
      if (response) {
        setSlideData(response.mainSlide);
      }
    };
    fetchData();
  }, []);
  return (
    <SliderContext.Provider value={{slideData}}>
      {children}
    </SliderContext.Provider>
  );
};
