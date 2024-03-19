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
import { Style } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import { getOrder } from '../slice/cartform.slice';
import { getuser, getuserdata } from '../slice/auth.slice';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

function Details() {

    const [prodata, setProdata] = useState([]);
    const [value, setValue] = useState('')
    const [update, setUpdate] = useState(false)
    const product = useSelector(state => state.product)
    console.log(product);

    const order = useSelector(state => state.order);
    console.log(order);
    const cart = useSelector(state => state.cart);
    // console.log(cart);  
    const auth = useSelector(state => state.auth);
    console.log(auth);
    const review = useSelector(state => state.review);
    console.log(review);

    const user = useSelector(state => state.user);
    console.log(user);

    const commentdata = review.review.map((v) => {
        // console.log(v);
        let proid = product.product.filter((p) => v.pid === p.id)
        console.log(proid);
        return { ...proid, rating: v.rating }
    })
    console.log(commentdata);

    const totalComments = commentdata.length;
    console.log(totalComments);

    const total = commentdata.reduce((acc, v) => acc + v.rating, 0) / totalComments;
    console.log(total);
    const srt = total.toFixed(2);
    console.log(srt);

    const dispatch = useDispatch()
    const { id } = useParams();
    // console.log(id);

    useEffect(() => {
        dispatch(getreview())
        dispatch(getOrder())
        dispatch(getuser())
        const filteredData = product.product.filter((v) => v.id == id);
        console.log(filteredData);
        setProdata(filteredData);

    }, [id, product.product, dispatch])


    // const rdata = order.order.map((v) => {
    //     console.log(v);
    //     let oderdata = review.review.filter((o) => o.uid === v.uid);
    //     console.log(oderdata);
    //     return { ...v, ...oderdata}
    // })
    // console.log(rdata);

    const rdata = user.user.map((v) => {
        console.log(v);
        let reviewData = review.review.find((r) => r.uid === v.uid);
        return { ...reviewData, name: v.name }
    })
    console.log(rdata);


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

    const handleDelete = (id) => {
        console.log('ddddddddddddddddddddddddddd');
        console.log(id);
        dispatch(deletereview(id))
    }

    const handleEdite = (data) => {
        console.log('eeeeeeee');
        console.log(data);
        setUpdate(data)
        // setValue(data)
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
                                                    <Stack spacing={1}>
                                                        <Rating name="half-rating-read" defaultValue={srt} precision={0.5} readOnly />
                                                    </Stack>
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
                                                        rdata.map((r) => {
                                                            console.log(r);
                                                            // const stytle = { display: v.uid === auth.user.uid ? "block" : "none" }
                                                            return (
                                                                <>
                                                                    <div className='main-box'>
                                                                        <di className='review-box'>
                                                                            <di className="data-button">
                                                                                <p>{r.rating}<StarIcon /></p>
                                                                                <h6>{r.comment}</h6>
                                                                            </di>
                                                                            <di className="icon-button">
                                                                                {
                                                                                    r.uid !== auth.user.uid ||
                                                                                    <>
                                                                                        <button onClick={() => handleDelete(r.id)} className='button-one'><DeleteIcon /></button>
                                                                                        <button onClick={() => handleEdite(r)} disabled={r.uid === auth.user.uid ? false
                                                                                            : true} ><EditIcon /></button>
                                                                                    </>
                                                                                }
                                                                            </di>
                                                                        </di>
                                                                        <div className='data-box'>
                                                                            <h4>{r.name}</h4>
                                                                        </div>
                                                                    </div>
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