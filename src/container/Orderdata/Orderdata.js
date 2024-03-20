import React from 'react';
import { useSelector } from 'react-redux';
import './Orderdata.css'
import { Link } from 'react-router-dom';

function Orderdata({orderData}) {
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

    return (
        <div>
            
            {
                cartdata.map((v) => {
                    console.log(v);
                    const totaldis =  v.data.discount * v.data.pro_price  / 100;
                    console.log(totaldis);
                    if (v.uid ) {
                        return (
                            <>
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
                                        <div className='pro-img'>
                                            <div className='img-data'>
                                                <img  src={v.data.file}></img>
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
                                            <p>{ v.data.pro_price - totaldis}</p>
                                        </div>
                                        
                                    </div>

                                    <div className='user-detail'>
                                        <div className='detail'>
                                            <h4>Delivery address</h4>
                                            <p><spann>Name:</spann> {v.address.map((v) => v.name)}</p>
                                            <p><spann>City:</spann> {v.address.map((v) => v.city)}</p>
                                            <p><spann>Area:</spann> {v.address.map((v) => v.area)}</p>
                                            <p><spann>Email:</spann> {v.address.map((v) => v.email)}</p>
                                            <p><spann>Flat no. :</spann> {v.address.map((v) => v.flat_no)}</p>
                                            <p><spann>Pincode:</spann> {v.address.map((v) => v.pincode)}</p>
                                            <p><spann>Landmark:</spann> {v.address.map((v) => v.landmark)}</p> 
                                            </div>
                                            <div className='notifiction'>
                                                <h4>SMS Notifiction</h4>
                                                <h6>Celphone registered: <br></br> (00) 215-DUNSK</h6>
                                                <input placeholder='enter name'></input>      
                                            </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                })
            }
        </div>
    );
}

export default Orderdata;