import React from 'react';
import { useSelector } from 'react-redux';
import './Orderdata.css'

function Orderdata(props) {

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
                    if (v.uid) {
                        return (
                            <>
                                <section className="order">
                                    {/* <h1 className="order__title no-margin">Order summary</h1> */}
                                    <svg id="svg-summary" width={24} height={24} viewBox="0 0 24 24">
                                        <path d="M7,8V6H5V19H19V6H17V8H7M9,4A3,3 0 0,1 12,1A3,3 0 0,1 15,4H19A2,2 0 0,1 21,6V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V6A2,2 0 0,1 5,4H9M12,3A1,1 0 0,0 11,4A1,1 0 0,0 12,5A1,1 0 0,0 13,4A1,1 0 0,0 12,3Z" />
                                    </svg>
                                    <section className="order__sub-sections order__subtotal clearfix ">
                                        <h2 className="order__subtitles no-margin">Subtotal</h2>
                                        <table id="values" className="order__subtotal__table">
                                            <tbody>
                                                <div className="row main align-items-center">
                                                    <div className="col-4">
                                                        <img className="img-fluid" src={v.data.file} />
                                                    </div>
                                                    <div className="col-6">
                                                        {/* <div className="row text-muted">{ }</div> */}
                                                        <div className="pro_name">{v.data.pro_name}</div>
                                                    </div>
                                                </div>

                                                <tr>
                                                    <td className="first-row">Product (<a href="#">{v.cart.map((c) => c.qty)} item</a>)</td>
                                                    <td className="first-row" align="right">R$ {v.address.map((v) => v.amount)}</td>
                                                </tr>
                                                <tr>
                                                    <td>Freight</td>
                                                    <td align="right">Free</td>
                                                </tr>
                                                <tr className="values--discounts">
                                                    <td>Discount plus:</td>
                                                    <td align="right">-R$ {v.data.discount}</td>
                                                </tr>
                                                <tr className="values--discounts">
                                                    <td>Discount by type of payment:</td>
                                                    <td align="right">-R$ {v.address.map((v) => v.amount) * (v.data.discount) / 100}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                {/* <tr>
                                        <td className="values__total">Total</td>
                                        <td className="values--total-price">R$ 152,10</td>
                                    </tr> */}
                                                <tr>
                                                    <td colSpan={2} align="right">1x interest-free - R$ {v.address.map((v) => v.amount) - (v.data.discount)}(with discount)</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </section>

                                    <section className="order__sub-sections order__address">

                                        <h2 className="order__subtitles no-margin">Delivery address</h2>
                                        <p className="address--client no-margin">Name: {v.address.map((v) => v.name)}</p>
                                        <p className="address--street no-margin">Area: {v.address.map((v) => v.area)}</p>
                                        <p className="address--region no-margin">City: {v.address.map((v) => v.city)}</p>
                                        <p className="address--region no-margin">Flat no. : {v.address.map((v) => v.flat_no)}</p>
                                        <p className="address--region no-margin">Email: {v.address.map((v) => v.email)}</p>
                                        <p className="address--zipcode no-margin">Pincode: {v.address.map((v) => v.pincode)}</p>
                                    </section>
                                    <section className="order__sub-sections order__sms clearfix">
                                        <div className="sms__svg">
                                            <svg width={32} height={32} viewBox="0 0 24 24">
                                                <path d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9Z" />
                                            </svg>
                                        </div>
                                        <div className="sms__info">
                                            <h2 className="order__subtitles no-margin">SMS Notification</h2>
                                            <p className="no-margin">Celphone registered:</p>
                                            <span>(00) 215-DUSK</span>
                                            {/* <form action>
                                                <input type="number" className="info__celphone" />
                                                <button>Ok</button>
                                            </form> */}
                                        </div>
                                        <button className="btn-primary">Remover</button>
                                    </section>
                                </section>
                            </>
                        )
                    }
                })
            }
        </div>
    );
}

export default Orderdata;