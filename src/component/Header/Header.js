import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getShopdata } from "../../container/slice/shop.slice";
import { getsubcategory } from "../../container/slice/subcategory.slice";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import "./Header.css";
import { getproduct } from "../../container/slice/product.slice";
import { logoutReqwest } from "../../redux/action/auth.action";
import { getOrder } from "../../container/slice/cartform.slice";
import SearchIcon from '@mui/icons-material/Search';

function Header({ cart }) {
  const [search, setSearch] = useState('')
  const auth = useSelector(state => state.auth);
  const shop = useSelector((state) => state.shop);

  // console.log(auth);
  const sbucategory = useSelector((state) => state.sbucategory);
  // console.log(sbucategory);

  const cartdata = useSelector((state) => state.cart);
  // console.log(cartdata);

  const cartCount = cartdata.cart.reduce((acc, v) => acc + v.qty, 0);
  // console.log(cartCount);

  const product = useSelector(state => state.product);
  console.log(product);

  const order = useSelector(state => state.order);
  console.log(order);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getsubcategory());
    dispatch(getShopdata());
    dispatch(getproduct());
    dispatch(getOrder())
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    dispatch(logoutReqwest())
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const handleSearch = (event) => {
    // event.preventDefault()
    console.log('kkkkkkkkkkkkkkkk');
    console.log(search);
    // let data = product.product.filter((v) => {
    //   console.log(v);
    //   v.pro_name.toLowerCase().includes(search.toLowerCase()) ||
    //     v.pro_price.toString().includes(search.toString())
    // })


    // data = data.filter((v) => {
    //   // console.log(v);
    // })

  }

  const final = handleSearch()

  // const handleclick = () => {
  //   navigate('/orderdata')
  // }

  return (
    <div>
      <header class="header">
        <div class="container">


          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            {/* <a class="navbar-brand" href="#">Navbar</a> */}
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <div class="row v-center">
                  <div class="header-item item-left">
                    <div class="logo nav-item">
                      {/* <a href="#">logo</a> */}
                      <img src="https://www.shutterstock.com/image-vector/creative-modern-abstract-ecommerce-logo-260nw-2134594701.jpg"></img>
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
                      <ul class="menu-main navbar-nav mr-auto">
                        <li className="nav-item">
                          <NavLink className="nav-link scrollto" to="/">
                            Home
                          </NavLink>
                        </li>

                        <li class="menu-item-has-children nav-item">
                          <NavLink className="nav-link">Shop </NavLink>
                          <div class="sub-menu mega-menu mega-menu-column-5">

                            {
                              shop.shop.map((v) => {
                                // console.log(v);
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
                        <li className="nav-item">
                          <NavLink className="nav-link scrollto" to="/why">
                            Whyus
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink className="nav-link scrollto" to="/testimonial">
                            Testimonial
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink className="nav-link scrollto" to="/cart">
                            Cart
                          </NavLink>
                        </li>

                        <li className="nav-item">
                          <NavLink className="nav-link scrollto" to="/contact">
                            Contact
                          </NavLink>
                        </li>

                        <li className="nav-item">
                          <NavLink className="nav-link scrollto" to="/orderlist">
                            Orderlist
                          </NavLink>
                        </li>

                        {/* <li>
                    <NavLink className="nav-link scrollto" to="/quiz">
                      Quiz
                    </NavLink>
                  </li> */}
                        <li className="nav-item">
                          <Link to={"/cart"}>
                            <IconButton aria-label="cart">
                              <StyledBadge badgeContent={cartCount} color="secondary">
                                <AddShoppingCartIcon />
                              </StyledBadge>
                            </IconButton>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div className="select-box-one">
                    {/* <select value="select">
                      <option value="0">select</option>
                      {order.order.map((v) => {
                        if (v.uid === auth.user.uid) {
                          console.log(v);
                          return (
                            <>
                              <option value={v.id}>{v.status}</option>
                            </>
                          )
                        }
                      })}
                    </select> */}
                  </div>
                  <div class="header-item item-right">
                    <form className="form-inline">
                      <span  onChange={(event) => setSearch(event.target.value)}><SearchIcon/></span>
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
              </ul>
            </div>
          </nav>
        </div>
      </header >
    </div >
  );
}

export default Header;
