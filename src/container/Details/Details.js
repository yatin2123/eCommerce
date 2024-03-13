import { logDOM } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { addtocart, decrementqty, incrementqty } from '../slice/cart.slice';
import './Details.css'
// import mg from '../../../public/assetes/images/shoping.jpg'

import ReactImageMagnify from 'react-image-magnify';
import { getproduct } from '../slice/product.slice';
import Review from '../Review/Review';
import { deletereview, getreview, updatereview } from '../slice/review.slice';


function Details() {

    const [prodata, setProdata] = useState([]);
    const [value, setValue] = useState('')
    const [update, setUpdate] = useState(false)
    const product = useSelector(state => state.product)
    console.log(product);
    const shop = useSelector(state => state.shop);
    // console.log(shop);
    const cart = useSelector(state => state.cart);
    // console.log(cart);
    const auth = useSelector(state => state.auth);
    // console.log(auth);
    const review = useSelector(state => state.review);
    console.log(review);

    const commentdata = review.review.map((v) => {
        // console.log(v);
        let proid = product.product.filter((p) => v.pid == p.id)
        console.log(proid);
        return { ...proid, rating: v.rating }
    })
    console.log(commentdata);

    const totalComments = commentdata.length;
    console.log(totalComments);

    const total = commentdata.reduce((acc, v) => (acc + v.rating) / totalComments, 0);
    console.log(total);
    const srt = total.toFixed(2);
    console.log(srt);

    const dispatch = useDispatch()
    const { id } = useParams();
    // console.log(id);

    useEffect(() => {
        dispatch(getreview())

        const filteredData = product.product.filter((v) => v.id == id);
        console.log(filteredData);
        setProdata(filteredData);

    }, [id, product.product])

    const handleaddtocart = (id) => {
        // console.log(id);
        dispatch(addtocart(id))
    }

    const handleincrement = (id) => {
        // console.log(id);
        dispatch(incrementqty(id))
    }

    const handledecrement = (id) => {
        // console.log(id);
        dispatch(decrementqty(id))
    }

    const  handleDelete = (id) => {
        // console.log('ddddddddddddddddddddddddddd');
        console.log(id);
        dispatch(deletereview(id))
    }

    const handleEdite = (data) => {
        console.log('eeeeeeee');
        console.log(data);
        setUpdate(data)
    }
    return (
        <div>
            <div className="card-wrapper">
                <div className="card-one">
                    {
                        prodata.map((v) => {
                            console.log(v.id);
                            return (
                                
                                <>
                                {/* <Review onupdate={update}></Review> */}
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
                                                    <span>{srt}({totalComments})</span>
                                                </div>
                                                <div className="product-price">
                                                    <p className="last-price">Old Price: <span>{v.pro_price}</span></p>
                                                    <p className="new-price">New Price: <span>{v.pro_price - (v.pro_price * v.discount / 100)}</span></p>
                                                </div>
                                                <div className="product-detail">
                                                    <h2>about this item: </h2>
                                                    <p>Lorem ipsum dolor sit amet consederghrthe tenetur placeat sapiente architecto illum soluta consequuntur, aspernatur quidem at sequi ipsa!</p>

                                                </div>
                                                <div className="purchase-info">
                                                    <button onClick={() => handleincrement(v.id)}>+</button>
                                                    <span>{cart.cart.find(item => item.id === v.id)?.qty || 0}</span>
                                                    <button onClick={() => handledecrement(v.id)}>-</button>
                                                    <button type="button" className="btn" onClick={() => handleaddtocart(v.id)}>
                                                        Add to Cart
                                                    </button>
                                                </div>

                                                <Review id={v.id} onupdate={update} >

                                                </Review>
                                                <div>
                                                    {
                                                        review.review.map((r) => {
                                                            console.log(r);
                                                            return (
                                                                <>
                                                                    <p>{r.rating}</p>
                                                                    <p>{r.comment}</p>
                                                                    <button onClick={() => handleDelete(r.id)}>X</button>
                                                                    <button onClick={() => handleEdite(r)}>E</button>
                                                                    {/* <Review commentd = {r.comment} /> */}
                                                                </>
                                                            )
                                                        })
                                                    }
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