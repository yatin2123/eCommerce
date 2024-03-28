import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Orderdata.css'
import { Link, useLocation, useRoutes } from 'react-router-dom';


function Orderdata() {
    const location = useLocation()
    console.log(location);

    const status = location.state && location.state.fdata;
    console.log(status);
    const order = useSelector(state => state.order);
    console.log(order);

    const product = useSelector(state => state.product);
    console.log(product);
    const auth = useSelector(state => state.auth);
    console.log(auth);

    const cartdata = product.product.map((v) => {
        // console.log(v);
        let med = order.order.find((m) => m.cart.some((c) => c.id === v.id));
        // console.log(med);
        return { ...med, data: v };
    });
    console.log(cartdata);

    // const totaldis = cartdata.data.discount * cartdata.data.pro_price / 100;
    // console.log(totaldis);

    return (
        <div >
            <div className='container'>
                <div class="container">
                    <div class="title">
                        <h2>Product Order Form</h2>
                    </div>
                    <div class="d-flex">
                        <form action="" method="">
                            {
                                cartdata.map((v) => {
                                    console.log(v);
                                    const totaldis = v.data.discount * v.data.pro_price / 100;
                                    console.log(totaldis);
                                    if (v.uid === auth.user.uid) {
                                        return (
                                            <>
                                                <label>
                                                    <span>Product Image <span class="required">*</span></span>
                                                    <img src={v.data.file}></img>
                                                </label>

                                                <label>
                                                    <span>Product Price<span class="required">*</span></span>
                                                    <h6>{v.data.pro_price}</h6>
                                                </label>
                                                <label>
                                                    <span>Freight<span class="required">*</span></span>

                                                    <h6>Free</h6>
                                                </label>
                                                <label>
                                                    <span>Discount <span class="required">*</span></span>

                                                    <h6>{v.data.discount}</h6>
                                                </label>
                                                <label>
                                                    <span>Discount Type of Payment: <span class="required">*</span></span>

                                                    <h6>{v.data.discount}</h6>
                                                </label>
                                                <label>
                                                    <span>Total Payment: <span class="required">*</span></span>

                                                    <h6>{v.data.discount}</h6>
                                                </label>
                                                <label>
                                                    <span>Total : <span class="required">*</span></span>

                                                    <h6>{v.data.pro_price - totaldis}</h6>
                                                </label>
                                            </>
                                        )
                                    }
                                })
                            }


                            <div className='detail'>
                                <h4>Delivery address</h4>
                                <p><spann>Name:</spann> {location.state.fdata.address.map((v) => v.name)}</p>
                                <p><spann>City:</spann> {location.state.fdata.address.map((v) => v.city)}</p>
                                <p><spann>Area:</spann> {location.state.fdata.address.map((v) => v.area)}</p>
                                <p><spann>Email:</spann> {location.state.fdata.address.map((v) => v.email)}</p>
                                <p><spann>Flat no. :</spann> {location.state.fdata.address.map((v) => v.flat_no)}</p>
                                <p><spann>Pincode:</spann> {location.state.fdata.address.map((v) => v.pincode)}</p>
                                <p><spann>Landmark:</spann> {location.state.fdata.address.map((v) => v.landmark)}</p>
                            </div>
                        </form>
                        <div class="Yorder">
                            <table>
                                <tr>
                                    <th colspan="2">Your order</th>
                                </tr>

                                <tr>
                                    <td>Shipping</td>
                                    <td>{location.state.fdata.status}</td>
                                </tr>
                            </table><br />
                            <div>
                                <input type="radio" name="dbt" value="dbt" checked /> Direct Bank Transfer
                            </div>
                            <p>
                                Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                            </p>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );

}

export default Orderdata;