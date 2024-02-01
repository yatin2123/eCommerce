import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';


function Shopdata(props) {
    const [finaldata, setFinaldata] = useState([]);

    const dispatch = useDispatch();
    const subcategory = useSelector(state => state.sbucategory)
    console.log(subcategory);

    const { id } = useParams()
    console.log(id);

    useEffect(() => {
        if (subcategory.subcategory.length > 0) {

            const subdata = subcategory.subcategory.filter((v) => v.id === id);
            console.log(subdata);

            setFinaldata(subdata);
        }
    }, [id, subcategory.subcategory]);
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
                                                                {v.sub_name}
                                                            </h6>
                                                            <h6>
                                                                Price
                                                                <span>
                                                                    {v.p}
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