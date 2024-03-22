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

                {/* <div className='odata'>
                                        <ul className='ul-data'>
                                            <li>Order Number </li>
                                            <li>Order Date</li>
                                            <li>Order email</li>
                                            <li>Order total</li>
                                            <li>Payment methode</li>
                                        </ul>
                                       <ul className='ul-data'>
                                        <li className=''>204</li>
                                        <li >10/2/2019</li>
                                        <li >yatin@gmail.com</li>
                                        <li >10/2/2019</li>
                                        <li >cash</li>
                                       </ul>
                                    </div> */}

                <div className='product-data'>
                    <h4>Product Details</h4>
                    {
                        cartdata.map((v) => {
                            console.log(v);
                            const totaldis = v.data.discount * v.data.pro_price / 100;
                            console.log(totaldis);
                            if(v.uid === auth.user.uid){
                                return (
                                    <>
    
                                        <div className='pro-img'>
                                            <div className='img-data'>
                                                <img src={v.data.file}></img>
                                            </div>
    
                                            <div className='pro-name'>
                                                <div>{v.data.pro_name}</div>
                                            </div>
                                        </div>
    
                                        <div className='row pro-detail'>
                                            <h5>Product</h5>
                                            <p>{v.data.pro_price}</p>
                                        </div>
                                        <div className='row pro-detail'>
                                            <h5>Freight</h5>
                                            <p>Free</p>
                                        </div>
                                        <div className='row pro-detail'>
                                            <h5>Discount</h5>
                                            <p>{v.data.discount}</p>
                                        </div>
                                        <div className='row pro-detail'>
                                            <h5>Discount Type of Payment:</h5>
                                            <p>{v.data.discount}</p>
                                        </div>
                                        <div className='row pro-detail'>
                                            <h5>Total Payment:</h5>
                                            <p>{v.data.discount}</p>
                                        </div>
                                        <div className='row pro-detail'>
                                            <h5>Total :</h5>
                                            <p>{v.data.pro_price - totaldis}</p>
                                        </div>
    
                                    </>
                                )
                            }
                            
                        })
                    }

                </div>

                <div className='user-detail'>
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
                    <div className='notifiction'>
                        <h4>SMS Notifiction</h4>
                        <h6>Celphone registered: <br></br> (00) 215-DUNSK</h6>
                        <input placeholder='enter name'></input>
                    </div>
                </div>

            </div>
        </div>
    );

}

export default Orderdata;