import React from "react";
import Application from "./Application";
import MainVisual from "../Components/MainVisual";
import Social from "../Components/Social";
import SliderHero from "../Components/SliderHero";

const home = (props) => {
  return (
    <Application
      title={"Xine - Trang Chủ"}
      description={"home"}
      keywords={"home"}
    >
      <main className="p-top">
        {/** Hero MainVisual */}
        <MainVisual />
        {/** end MainVisual */}

        <div className="p-top__inner">
          {/** Hero Social */}
          <Social />
          {/** end Social */}

          {/** Hero SliderHero */}
          <SliderHero autoPlay={false} speed={8000} />
          {/** end SliderHero */}
        </div>
      </main>
    </Application>
  );
};

export default home;
