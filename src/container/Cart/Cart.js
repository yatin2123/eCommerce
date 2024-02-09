import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementqty, incrementqty } from "../slice/cart.slice";
import "./Cart.css";

// import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';




function Cart(props) {
  const product = useSelector((state) => state.product);
  console.log(product);

  const categoryOptions = [];
  categoryOptions.push(product.product)

  const validationSchema = Yup.object().shape({
    pro_name: Yup.string().required('Product Name is required'),
    category: Yup.string().required('Category is required'),
    price: Yup.number()
      .required('Price is required')
      .positive('Price must be positive'),
    discount: Yup.number().positive('Discount must be positive'),
    productImage: Yup.mixed().required('Product Image is required'),
  });

  const cart = useSelector((state) => state.cart);
  console.log(cart);

  const dispatch = useDispatch();

  const cartdata = cart.cart.map((v) => {
    let med = product.product.find((m) => v.id == m.id);
    console.log(med);

    return { ...med, qty: v.qty };
  });

  const totalPrice = cartdata.reduce(
    (acc, item) => acc + item.pro_price * item.qty,
    0
  );
  console.log(totalPrice);

  const handleincrementQty = (id) => {
    console.log(id);
    dispatch(incrementqty(id));
  };

  const handledecrementQty = (id) => {
    console.log(id);
    dispatch(decrementqty(id));
  };

  const [step, setStep] = useState(1);



  const handleNextStep = () => {
    console.log('fffff');
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  let cartSchema = Yup.object().shape({
    name: Yup.string().required("please enter your name."),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      pincode: '',
      city: '',
      state: '',
      flat_no: '',
      landmark: '',
    },
    validationSchema: cartSchema,

    onSubmit: (data, action) => {
      console.log(data);

    },
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched, setValues } = formik;

  return (
    <div>
      {/* <h1>P {step}</h1> */}
      <Formik
      // initialValues={initialValues}
      // validationSchema={validationSchema}
      // onSubmit={(values, actions) => {
      //   // Simulate API call here (e.g., using setTimeout)
      //   setTimeout(() => {
      //     alert('Form submitted successfully');
      //     actions.setSubmitting(false);
      //   }, 1000);
      // }}
      >
        {({ isSubmitting, }) => (
          console.log(values),
          <Form>
            <div>
              {step === 1 && (
                <div className="card">
                  <div className="row">
                    {cartdata.map((v) => {
                      return (
                        <>
                          <div className="col-md-8 cart">
                            <div className="title11">
                              <div className="row">
                                <div className="col">
                                  <h4>
                                    <b>Shopping Cart</b>
                                  </h4>
                                </div>
                                <div className="col align-self-center text-right text-muted">
                                  3 items
                                </div>
                              </div>
                            </div>

                            <div className="row border-top border-bottom">
                              <div className="row main align-items-center">
                                <div className="col-2">
                                  <img className="img-fluid" src={v.file} />
                                </div>
                                <div className="col">
                                  <div className="row text-muted">{ }</div>
                                  <div className="row">{v.pro_name}</div>
                                </div>
                                <div className="col">
                                  <button
                                    className="plus-btn"
                                    type="button"
                                    name="button"
                                    onClick={() => handleincrementQty(v.id)}
                                  >
                                    +
                                  </button>
                                  <span>{v.qty}</span>
                                  <button
                                    className="minus-btn"
                                    type="button"
                                    name="button"
                                    onClick={() => handledecrementQty(v.id)}
                                  >
                                    -
                                  </button>
                                </div>
                                <div className="col">
                                  € {v.qty * v.pro_price} <span className="close">✕</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4 summary">
                            <div>
                              <h5>
                                <b>Summary</b>
                              </h5>
                            </div>
                            <hr />
                            <div className="row">
                              <div className="col" style={{ paddingLeft: 0 }}>
                                ITEMS {v.qty}
                              </div>
                              <div className="col text-right">{ }</div>
                            </div>
                            <form>
                              <p>SHIPPING</p>
                              <select>
                                <option className="text-muted">
                                  Standard-Delivery- €5.00
                                </option>
                              </select>
                              <p>GIVE CODE</p>
                              <input id="code" placeholder="Enter your code" />
                            </form>
                            <div
                              className="row"
                              style={{
                                borderTop: "1px solid rgba(0,0,0,.1)",
                                padding: "2vh 0",
                              }}
                            >
                              <div className="col">TOTAL PRICE</div>
                              <div className="col text-right">€ {totalPrice}</div>
                            </div>
                            <button className="btn">CHECKOUT</button>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  {errors.name && touched.name ? <span>{errors.name}</span> : null}

                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email && touched.email ? <span>{errors.email}</span> : null}

                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    placeholder="pincode"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.pincode}
                  />
                  {errors.pincode && touched.pincode ? <span>{errors.pincode}</span> : null}

                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="city"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                  />
                  {errors.city && touched.city ? <span>{errors.city}</span> : null}

                  <input
                    type="text"
                    id="state"
                    name="state"
                    placeholder="state"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.state}
                  />
                  {errors.state && touched.state ? <span>{errors.state}</span> : null}

                  <input
                    type="text"
                    id="area"
                    name="area"
                    placeholder="area"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.area}
                  />
                  {errors.area && touched.area ? <span>{errors.area}</span> : null}

                  <input
                    type="text"
                    id="flat_no"
                    name="flat_no"
                    placeholder="flat_no"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.flat_no}
                  />
                  {errors.flat_no && touched.flat_no ? <span>{errors.flat_no}</span> : null}

                  <input
                    type="text"
                    id="landmark"
                    name="landmark"
                    placeholder="landmark"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.landmark}
                  />
                  {errors.landmark && touched.landmark ? <span>{errors.landmark}</span> : null}



                </div>
              )}

              {step === 3 && (
                <div>
                  <div className="card">
                    <div className="row">
                      {cartdata.map((v) => {
                        return (
                          <>
                            <div className="col-md-8 cart">
                              <div className="title11">
                                <div className="row">
                                  <div className="col">
                                    <h4>
                                      <b>Shopping Cart</b>
                                    </h4>
                                  </div>
                                  <div className="col align-self-center text-right text-muted">
                                    3 items
                                  </div>
                                </div>
                              </div>

                              <div className="row border-top border-bottom">
                                <div className="row main align-items-center">
                                  <div className="col-2">
                                    <img className="img-fluid" src={v.file} />
                                  </div>
                                  <div className="col">
                                    <div className="row text-muted">{ }</div>
                                    <div className="row">{v.pro_name}</div>
                                  </div>
                                  <div className="col">
                                    <button
                                      className="plus-btn"
                                      type="button"
                                      name="button"
                                      onClick={() => handleincrementQty(v.id)}
                                    >
                                      +
                                    </button>
                                    <span>{v.qty}</span>
                                    <button
                                      className="minus-btn"
                                      type="button"
                                      name="button"
                                      onClick={() => handledecrementQty(v.id)}
                                    >
                                      -
                                    </button>
                                  </div>
                                  <div className="col">
                                    € {v.qty * v.pro_price} <span className="close">✕</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4 summary">
                              <div>
                                <h5>
                                  <b>Summary</b>
                                </h5>
                              </div>
                              <hr />
                              <div className="row">
                                <div className="col" style={{ paddingLeft: 0 }}>
                                  ITEMS {v.qty}
                                </div>
                                <div className="col text-right">{ }</div>
                              </div>
                              <form>
                                <p>SHIPPING</p>
                                <select>
                                  <option className="text-muted">
                                    Standard-Delivery- €5.00
                                  </option>
                                </select>
                                <p>GIVE CODE</p>
                                <input id="code" placeholder="Enter your code" />
                              </form>
                              <div
                                className="row"
                                style={{
                                  borderTop: "1px solid rgba(0,0,0,.1)",
                                  padding: "2vh 0",
                                }}
                              >
                                <div className="col">TOTAL PRICE</div>
                                <div className="col text-right">€ {totalPrice}</div>
                              </div>
                              <button className="btn">CHECKOUT</button>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              <div>
                {step > 1 && (
                  <button type="button" onClick={handlePreviousStep}>
                    Previous
                  </button>
                )}
                {step < 3 && (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={
                      (step === 1 &&
                        (cart.length > 0 ? true : false)) ||
                      (step === 2 && (cart.length === 0 || !values.name || !values.email || !values.pincode || !values.city || !values.state || !values.area || !values.flat_no || !values.landmark))
                    }
                  >
                    Next
                  </button>
                )}
                {step === 3 && (
                  <button type="submit" disabled={isSubmitting} onSubmit={handleSubmit}>
                    Submit
                  </button>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>


  );
}

export default Cart;
