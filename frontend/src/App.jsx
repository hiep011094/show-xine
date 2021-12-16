import React, { useEffect, useState } from "react";

import { Routes, Route } from "react-router-dom";
import { RingLoader } from "react-spinners";

import Header from "./Components/layout/Header";
import Home from "./pages/Home";
import Products from "./pages/Products";
import "./sass/index.scss";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timeLoading = setTimeout(() => {
      setIsLoading(true);
    }, 2000);
    return () => {
      clearTimeout(timeLoading);
    };
  }, []);

  return (
    <div className="l-wapper">
      {!isLoading ? (
        <div className="c-loading">
          <RingLoader size={100} />
        </div>
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/san-pham" element={<Products />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
