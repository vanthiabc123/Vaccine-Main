import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./post/Footer";

const Layoutmain = () => {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Layoutmain;
