import React, { useState } from "react";
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
// import Mens from "../container/Mens/Mens";
import ProductList from "../container/ProductList/ProductList";
import Cart from "../container/Cart/Cart";

function Userroute(props) {

  const [cart, setCart] = useState([])
  return (
    <div>
      <Header />

      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route exact path="/shop" element={<Shop />} />
        <Route exact path="/shop/:id" element={<ProductList />} />
        <Route exact path="/shop/:catName/:id" element={<ProductList />} />
        <Route exact path="/shopdata/:id" element={<Shopdata />} />
        <Route exact path="/:id" element={<Details cart={cart} setCart={setCart}/>} />
        <Route exact path="/why" element={<Why />} />
        <Route exact path="/testimonial" element={<Testimonial />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/auth" element={<Auth />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default Userroute;
