import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementqty, incrementqty } from '../slice/cart.slice';


function Cart(props) {

    const product = useSelector(state => state.product)
    console.log(product);

    const cart = useSelector(state => state.cart)
    console.log(cart);

    const dispatch = useDispatch();

    const cartdata = cart.cart.map((v) => {
        console.log(v);
    })


    const handleincrementQty = (id) => {
        console.log(id);
        dispatch(incrementqty(id))
    }

    const handledecrementQty = (id) => {
        console.log(id);
        dispatch(decrementqty(id))
    }

    return (
        <div>
            <div className="card">
                <div className="row">

                    <div className="col-md-8 cart">
                        <div className="title">
                            <div className="row">
                                <div className="col"><h4><b>Shopping Cart</b></h4></div>
                                <div className="col align-self-center text-right text-muted">3 items</div>
                            </div>
                        </div>
                        {
                            product.product.map((v) => {
                                return (
                                    <>
                                        <div className="row border-top border-bottom">
                                            <div className="row main align-items-center">
                                                <div className="col-2"><img className="img-fluid" src={v.file} /></div>
                                                <div className="col">
                                                    <div className="row text-muted">{ }</div>
                                                    <div className="row">{v.pro_name}</div>
                                                </div>
                                                <div className="col">
                                                    <button className="plus-btn" type="button" name="button" onClick={() => handleincrementQty(v.id)}>
                                                        +
                                                    </button>
                                                    <span></span>
                                                    <button className="minus-btn" type="button" name="button" onClick={() => handledecrementQty(v.id)}>
                                                        -
                                                    </button>
                                                </div>
                                                <div className="col">€ {v.pro_price} <span className="close">✕</span></div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }



                    </div>
                    <div className="col-md-4 summary">
                        <div><h5><b>Summary</b></h5></div>
                        <hr />
                        <div className="row">
                            <div className="col" style={{ paddingLeft: 0 }}>ITEMS 3</div>
                            <div className="col text-right">€ 132.00</div>
                        </div>
                        <form>
                            <p>SHIPPING</p>
                            <select><option className="text-muted">Standard-Delivery- €5.00</option></select>
                            <p>GIVE CODE</p>
                            <input id="code" placeholder="Enter your code" />
                        </form>
                        <div className="row" style={{ borderTop: '1px solid rgba(0,0,0,.1)', padding: '2vh 0' }}>
                            <div className="col">TOTAL PRICE</div>
                            <div className="col text-right">€ 137.00</div>
                        </div>
                        <button className="btn">CHECKOUT</button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Cart;