import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getShopdata } from "../../container/slice/shop.slice";
import { getsubcategory } from "../../container/slice/subcategory.slice";

function Header(props) {
  const auth = useSelector((state) => state.auth);
  const shop = useSelector((state) => state.shop);
  console.log(shop);
  const sbucategory = useSelector(state => state.sbucategory);
  console.log(sbucategory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getsubcategory());
    dispatch(getShopdata());
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div>
      <header className="header_section">
        <nav className="navbar navbar-expand-lg custom_nav-container">
          <a className="navbar-brand" href="index.html">
            <span>Giftos</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className=""></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li>
                <NavLink className="nav-link scrollto" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link scrollto dropdown-toggle"
                  // to={"/shopdata"}
                  id="dropdown01"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Shop
                </NavLink>
                <div className="dropdown-menu megamenu" aria-labelledby="dropdown01">
                  <div className="row">
                    <ul>
                      {shop.shop.map((v) => {
                        console.log(v);
                        const subcat = sbucategory.subcategory.filter((c) => c.cart_id === v.id);
                        console.log(subcat);

                        // const mencategory = shop.shop.find((category) =>category.cat_name === "Man's");
                        // console.log(mencategory);

                        // if (mencategory && subcat.cart_id === mencategory.id ) {
                        //   return (
                        //     <li key={index}>
                        //       {sbucategoryItem.sub_name}
                        //     </li> // Ensure unique key prop
                        //   );
                        // }

                        return (
                          <div key={v.id}>
                            <div className="box">

                              <NavLink key={v.id} className="menu-title category" to={`/shop/${v.id}`}>
                                {v.cat_name}
                              </NavLink>

                            </div>

                            {subcat.map((sub) => (
                              <NavLink key={sub.id} to={`/shop/${v.cat_name}/${sub.id}`} className="menu-title">
                                {sub.sub_name}
                              </NavLink>
                            ))}
                          </div>
                        );
                      })}
                    </ul>
                  </div>
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
                <NavLink className="nav-link scrollto" to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>

            <div className="user_option">
              {auth.user ? (
                <NavLink to={"/"}>
                  <span onClick={handleLogout}>Logout</span>
                </NavLink>
              ) : (
                <NavLink to={"/auth"}>
                  <span>Login/ Signup</span>
                </NavLink>
              )}
              <a href="">
                <i className="fa fa-shopping-bag" aria-hidden="true"></i>
              </a>
              <form className="form-inline">
                <button className="btn nav_search-btn" type="submit">
                  <i className="fa fa-search" aria-hidden="true"></i>
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