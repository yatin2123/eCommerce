import React from "react";
import Header from "../component/Header/Header";
import Footer from "../component/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Index from "../container/Index/Index";
import Shop from "../container/Shop/Shop";
import Why from "../container/Why/Why";
import Testimonial from "../container/Testimonial/Testimonial";
import Contact from "../container/Contact/Contact";
import Auth from "../container/Auth/Auth";

import Shopdata from "../container/Shopdata/Shopdata";
import Details from "../container/Details/Details";
import Mens from "../container/Mens/Mens";

function Userroute(props) {
  return (
    <div>
      <Header />

      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route exact path="/shop" element={<Shop />} />
        <Route exact path="/shop/mens/:id" element={<Mens />} />
        <Route exact path="/shopdata/:id" element={<Shopdata />} />
        <Route exact path="/details/:id" element={<Details />} />
        <Route exact path="/why" element={<Why />} />
        <Route exact path="/testimonial" element={<Testimonial />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/auth" element={<Auth />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default Userroute;
