import { logDOM } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addtocart, decrementqty, incrementqty } from '../slice/cart.slice';
import './Details.css'
// import mg from '../../../public/assetes/images/shoping.jpg'

import ReactImageMagnify from 'react-image-magnify';
import { getproduct } from '../slice/product.slice';

function Details() {

    const [prodata, setProdata] = useState([]);
    const product = useSelector(state => state.product)
    console.log(product);
    const shop = useSelector(state => state.shop);
    console.log(shop);

    const cart = useSelector(state => state.cart);
    console.log(cart);

    const dispatch = useDispatch()

    const { id } = useParams();
    console.log(id);

    useEffect(() => {

        const filteredData = product.product.filter((v) => v.id == id);
        console.log(filteredData);
        setProdata(filteredData);

    }, [id, product.product])


    const handleaddtocart = (id) => {
        console.log(id);
        dispatch(addtocart(id))

        // dispatch(({id: id, qty: 1}))
    }

    const handleincrement = (id) => {
        console.log(id);
        dispatch(incrementqty(id))
    }

    const handledecrement = (id) => {
        console.log(id);
        dispatch(decrementqty(id))
    }
    return (
        <div>
            <div className="card-wrapper">
                <div className="card-one">
                    {
                        prodata.map((v) => {
                            console.log(v);
                            return (
                                <>
                                    <div className="perimeter">
                                        <div className="image">
                                            <ReactImageMagnify
                                                {...{
                                                    smallImage: {
                                                        alt: "Wristwatch by Ted Baker London",
                                                        isFluidWidth: true,
                                                        src: v.file,
                                                        srcSet: v.srcSet,
                                                        sizes:
                                                            "(min-width: 800px) 33.5vw, (min-width: 415px) 50vw, 100vw"
                                                    },
                                                    largeImage: {
                                                        alt: "",
                                                        src: v.file,
                                                        width: 1200,
                                                        height: 1800
                                                    },
                                                    isHintEnabled: true
                                                }}
                                            />
                                        </div>
                                        <div className="copy">
                                        <div className="product-content">
                                        <h2 className="product-title">{v.pro_name}</h2>
                                        {/* <a href="#" className="product-link">visit nike store</a> */}
                                        <div className="product-rating">
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star-half-alt" />
                                            <span>4.7(21)</span>
                                        </div>
                                        <div className="product-price">
                                            <p className="last-price">Old Price: <span>{v.pro_price}</span></p>
                                            <p className="new-price">New Price: <span>{v.pro_price - (v.pro_price * v.discount / 100)}</span></p>
                                        </div>
                                        <div className="product-detail">
                                            <h2>about this item: </h2>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eveniet veniam tempora fuga tenetur placeat sapiente architecto illum soluta consequuntur, aspernatur quidem at sequi ipsa!</p>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.</p>
                                            
                                        </div>
                                        <div className="purchase-info">
                                            <button onClick={() => handleincrement(v.id)}>+</button>
                                            <span>{cart.cart.find(item => item.id === v.id)?.qty || 0}</span>
                                            <button onClick={() => handledecrement(v.id)}>-</button>
                                            {/* <button type="button" className="btn" onClick={() => handleaddtocart(v.id)}>
                                                Add to Cart
                                            </button> */}
                                            <button type="button" className="btn" onClick={() => handleaddtocart(v.id)}>Add to Cart</button>
                                        </div>
                                    </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    );
}

export default Details;