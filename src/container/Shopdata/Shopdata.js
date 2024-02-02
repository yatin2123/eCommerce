import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';


function Shopdata(props) {
    const [finaldata, setFinaldata] = useState([]);

    const dispatch = useDispatch();
    const product = useSelector(state => state.product)
    console.log(product);

    const { id } = useParams()
    console.log(id);

    useEffect(() => {
        // Ensure product data is available before filtering
        if (product.product.length > 0) {
            const filteredData = product.product.filter((v) => v.sub_id == id);
            console.log(filteredData);
            setFinaldata(filteredData);
        }
    }, [id, product.product])
    return (
        <div>
            <section className="shop_section layout_padding">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>
                            Latest Products
                        </h2>
                    </div>
                    <div className="row">
                        {
                            finaldata.map((v) => {

                                return (
                                    <>
                                        <NavLink className="nav-link scrollto"  to={`/details/${v.id}`}>


                                            <div className="col-sm-6 col-md-4 col-lg-3">
                                                <div className="box">
                                                    <a href>
                                                        <div className="img-box">
                                                            <img src="images/p1.png" alt />
                                                        </div>
                                                        <div className="detail-box">
                                                            <h6>
                                                                {v.pro_name}
                                                            </h6>
                                                            <h6>
                                                                Price
                                                                <span>
                                                                    {v.pro_price}
                                                                </span>
                                                            </h6>
                                                        </div>
                                                        <div className="new">
                                                            <span>
                                                                New
                                                            </span>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </NavLink>
                                    </>
                                )
                            })
                        }


                    </div>
                    <div className="btn-box">
                        <a href>
                            View All Products
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Shopdata;