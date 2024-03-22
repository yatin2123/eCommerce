import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './Orderlist.css'

function Orderlist() {

    const order = useSelector(state => state.order);
    console.log(order);
    const navigate = useNavigate()

    const product = useSelector(state => state.product);
    console.log(product);
    const auth = useSelector(state => state.auth);
    console.log(auth);

    // const cartdata = product.product.map((v) => {
    //     // console.log(v);
    //     let med = order.order.find((m) => m.cart.some((c) => c.id === v.id));
    //     // console.log(med);
    //     return { ...med, data: v };
    // });
    // console.log(cartdata);

    const handleclick = (v) => {
        navigate('/orderdata', { state: { fdata: v } });
    }

    return (
        <div>
            <h1>The Order of Operations</h1>
            {
                order.order.map((v) => {
                    console.log(v);
                    if (v.uid === auth.user.uid) {
                        return (
                            // console.log(v),
                            <div className='order-list'>
                                <div className='my-list'>
                                    <h3 onClick={() => handleclick(v)}>order list</h3>
                                </div>
                            </div>

                        )
                    }
                    return null;
                })
            }

        </div>
    );
}
export default Orderlist;