import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getproduct } from '../slice/product.slice';
import { NavLink, useParams } from 'react-router-dom';

function View(props) {
    const product = useSelector(state => state.product);
    console.log(product);
    const [productdata, setProductData] = useState([]);

    const dispatch = useDispatch();
    const { catName, id } = useParams();
    console.log(catName, id);

    useEffect(() => {
        // dispatch(getproduct());

        const data = product.product.filter((v) => v.cart_id === id || v.sub_id === id);
        console.log(data);
        setProductData(data);
    
    }, [dispatch, id, product.product]);

    return (
        <div>
            <section className="shop_section layout_padding">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>Latest Products</h2>
                    </div>
                    <div className="row">
                        {productdata.map((v) => (
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
                                        <h6>Price <span>{v.pro_price}</span></h6>
                                        <h6>Stock: <span>{v.pro_stock}</span></h6>
                                    </div>
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default View;