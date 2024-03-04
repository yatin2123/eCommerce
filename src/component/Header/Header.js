import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getShopdata } from "../../container/slice/shop.slice";
import { getsubcategory } from "../../container/slice/subcategory.slice";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import "./Header.css";

function Header({ cart }) {
  const auth = useSelector(state => state.auth);
  const shop = useSelector((state) => state.shop);
  console.log(auth);
  const sbucategory = useSelector((state) => state.sbucategory);
  console.log(sbucategory);

  const cartdata = useSelector((state) => state.cart);
  console.log(cartdata);

  const cartCount = cartdata.cart.reduce((acc, v) => acc + v.qty, 0);
  console.log(cartCount);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getsubcategory());
    dispatch(getShopdata());
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  return (
    <div>
      <header class="header">
        <div class="container">
          <div class="row v-center">
            <div class="header-item item-left">
              <div class="logo">
                {/* <a href="#">logo</a> */}
                <img src="https://www.shutterstock.com/image-vector/shop-logo-good-260nw-1290022027.jpg"></img>
              </div>
            </div>

            <div class="header-item item-center">
              <div class="menu-overlay"></div>
              <nav class="menu">
                <div class="mobile-menu-head">
                  <div class="go-back"><i class="fa fa-angle-left"></i></div>
                  <div class="current-menu-title"></div>
                  <div class="mobile-menu-close">&times;</div>
                </div>
                <ul class="menu-main">
                  <li>
                    <NavLink className="nav-link scrollto" to="/">
                      Home
                    </NavLink>
                  </li>

                  <li class="menu-item-has-children">
                    <NavLink >Shop <i class="fa fa-angle-down"></i></NavLink>
                    <div class="sub-menu mega-menu mega-menu-column-5">

                      {
                        shop.shop.map((v) => {
                          console.log(v);
                          return (
                            <div class="list-item">
                              <NavLink to={`/shop/${v.id}`}><h4 className="title">{v.cat_name}</h4></NavLink>
                              <ul>
                                {
                                  sbucategory.subcategory.map((m) => {
                                    // console.log(m);
                                    if (m.cart_id === v.id) {
                                      return (
                                        <li>
                                          <NavLink
                                            key={m.id}
                                            to={`/shop/${v.cat_name}/${m.id}`}
                                            className="menu-title"
                                          >
                                            {m.sub_name}
                                          </NavLink>
                                        </li>
                                      )
                                    } else {
                                      return null
                                    }
                                  })
                                }
                              </ul>
                            </div>
                          )
                        })
                      }
                    </div>

                  </li>
                  <li>
                    <NavLink className="nav-link scrollto" to="/why">
                      Why Us
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link scrollto" to="/testimonial">
                      Testimonial
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link scrollto" to="/cart">
                      Cart
                    </NavLink>
                  </li>

                  <li>
                    <NavLink className="nav-link scrollto" to="/contact">
                      Contact
                    </NavLink>
                  </li>

                  <Link to={"/cart"}>
                    <IconButton aria-label="cart">
                      <StyledBadge badgeContent={cartCount} color="secondary">
                        <AddShoppingCartIcon />
                      </StyledBadge>
                    </IconButton>
                  </Link>

                </ul>

              </nav>
            </div>
            <div class="header-item item-right">
              <form className="form-inline">
                <input type="text" placeholder="Search"></input>
              </form>

              {auth.user ? (
                <NavLink to={"/"}>
                  <span onClick={handleLogout}>Logout</span>
                </NavLink>
              ) : (
                <NavLink to={"/auth"}>
                  <span> Signup</span>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </header >
    </div >
  );
}

export default Header;
