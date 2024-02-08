import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

function ProductList(props) {
    // console.log("asdasdasd");

    const [finalcategory, setFinalcategory] = useState([]);
    const { catName, id } = useParams();
    console.log(catName, id);
    const product = useSelector(state => state.product);
    console.log(product);

    useEffect(() => {
        const data = product.product.filter((v) => v.cart_id == id || v.sub_id == id);
        setFinalcategory(data);
    }, [id, product.product]);
    

    return (
        <div>
            <section className="shop_section layout_padding">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>Latest Products</h2>
                    </div>
                    <div className="row">
                        {finalcategory.map((v) => (
                            <div key={v.id} className="col-sm-6 col-md-4 col-lg-3">
                                <NavLink className="nav-link scrollto" to={`/${v.id}`}>
                                    <div className="box">
                                        <a href="#">
                                            <div className="img-box">
                                                <img src={v.file} alt={v.pro_name} />
                                            </div>
                                            
                                           
                                        </a>

                                    </div>
                                    <div className="detail-box">
                                                <h6>{v.pro_name}</h6>
                                                <p>{v.pro_des}</p>
                                                <h6>Price <span>{v.pro_price}</span></h6>
                                            </div>
                                </NavLink>
                            </div>
                        ))}
                    </div>
                    <div className="btn-box">
                        <a href="#">View All Products</a>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProductList;