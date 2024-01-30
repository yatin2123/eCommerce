import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Header(props) {
  let auth = useSelector((state) => state.auth);

  const shop = useSelector((state) => state.shop);
  console.log(shop);

  const sbucategory = useSelector((state) => state.sbucategory);
  console.log(sbucategory);

  const handleLogout = () => {
    console.log("yyyyyyyy");
  };
  return (
    <div>
      <header class="header_section">
        <nav class="navbar navbar-expand-lg custom_nav-container ">
          <a class="navbar-brand" href="index.html">
            <span>Giftos</span>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class=""></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav  ">
              {/* <li><NavLink className="nav-link scrollto" to="/">Home</NavLink></li> */}
              <li>
                <NavLink className="nav-link scrollto" to="/">
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink className="nav-link scrollto" to="shop">
                  {" "}
                  <div className="container">
                    <div className="row">
                      <div className="col-12">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
                          <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbar"
                            aria-controls="navbars"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                          >
                            <span className="navbar-toggler-icon" />
                          </button>
                          <div className="collapse navbar-collapse" id="navbar">
                            <ul className="navbar-nav mr-auto">
                              <li className="nav-item dropdown megamenu-li">
                                <a
                                  className="nav-link dropdown-toggle"
                                  href
                                  id="dropdown01"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  product
                                </a>
                                <div
                                  className="dropdown-menu megamenu"
                                  aria-labelledby="dropdown01"
                                >
                                  <div className="row">
                                    <div className="col-sm-6 col-lg-3">
                                      <h5>Men's</h5>
                                      {sbucategory.sbucategory &&
                                        sbucategory.sbucategory.map(
                                          (sbucategoryItem, index) => {
                                            console.log(
                                              "sbucategoryItem:",
                                              sbucategoryItem
                                            ); // Debugging
                                            const mencategory = shop.shop.find(
                                              (category) =>
                                                category.cat_name === "MENS"
                                            );
                                            console.log(
                                              "mencategory:",
                                              mencategory
                                            ); // Debugging
                                            if (
                                              mencategory &&
                                              sbucategoryItem.cart_id ===
                                                mencategory.id
                                            ) {
                                              return (
                                                <li key={index}>
                                                  {sbucategoryItem.sub_name}
                                                </li> // Ensure unique key prop
                                              );
                                            }
                                          }
                                        )}
                                    </div>
                                    {/* <div className="col-sm-6 col-lg-3">
                                      <h5>Woman's</h5>
                                      <a className="dropdown-item" href="#">
                                        Another action
                                      </a>
                                      <a className="dropdown-item" href="#">
                                        Something else here
                                      </a>
                                      <a className="dropdown-item" href="#">
                                        Another action
                                      </a>
                                    </div>
                                    <div className="col-sm-6 col-lg-3">
                                      <h5>Kid's</h5>
                                      <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipisicing elit. Necessitatibus in
                                        veritatis, facilis eligendi sunt, culpa
                                        autem harum porro earum.
                                      </p>
                                    </div> */}
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </nav>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link scrollto" to="why">
                  Why Us
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="nav-link scrollto" to="testimonial">
                  Testimonial
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link scrollto" to="contact">
                  Contact
                </NavLink>
              </li>
            </ul>

            <div class="user_option">
              {auth.user ? (
                <NavLink to={"/"}>
                  <span onClick={handleLogout()}>Logout</span>
                </NavLink>
              ) : (
                <NavLink to={"/auth"}>
                  <span>Login/ Signup</span>
                </NavLink>
              )}
              <a href="">
                <i class="fa fa-shopping-bag" aria-hidden="true"></i>
              </a>
              <form class="form-inline ">
                <button class="btn nav_search-btn" type="submit">
                  <i class="fa fa-search" aria-hidden="true"></i>
                </button>
              </form>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
