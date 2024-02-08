import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementqty, incrementqty } from "../slice/cart.slice";
import "./Cart.css";

// import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
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

  const initialValues = {
    pro_name: '',
    category: '',
    description: '',
    price: '',
    discount: '',
    productImage: null,
  };

  const handleNextStep = () => {
    console.log('fffff');
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  return (
    // <div>
    //   <div className="card">
    //     <div className="row">
    //       {cartdata.map((v) => {
    //         return (
    //           <>
    //             <div className="col-md-8 cart">
    //               <div className="title11">
    //                 <div className="row">
    //                   <div className="col">
    //                     <h4>
    //                       <b>Shopping Cart</b>
    //                     </h4>
    //                   </div>
    //                   <div className="col align-self-center text-right text-muted">
    //                     3 items
    //                   </div>
    //                 </div>
    //               </div>

    //               <div className="row border-top border-bottom">
    //                 <div className="row main align-items-center">
    //                   <div className="col-2">
    //                     <img className="img-fluid" src={v.file} />
    //                   </div>
    //                   <div className="col">
    //                     <div className="row text-muted">{}</div>
    //                     <div className="row">{v.pro_name}</div>
    //                   </div>
    //                   <div className="col">
    //                     <button
    //                       className="plus-btn"
    //                       type="button"
    //                       name="button"
    //                       onClick={() => handleincrementQty(v.id)}
    //                     >
    //                       +
    //                     </button>
    //                     <span>{v.qty}</span>
    //                     <button
    //                       className="minus-btn"
    //                       type="button"
    //                       name="button"
    //                       onClick={() => handledecrementQty(v.id)}
    //                     >
    //                       -
    //                     </button>
    //                   </div>
    //                   <div className="col">
    //                     € {v.qty * v.pro_price} <span className="close">✕</span>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="col-md-4 summary">
    //               <div>
    //                 <h5>
    //                   <b>Summary</b>
    //                 </h5>
    //               </div>
    //               <hr />
    //               <div className="row">
    //                 <div className="col" style={{ paddingLeft: 0 }}>
    //                   ITEMS {v.qty}
    //                 </div>
    //                 <div className="col text-right">{}</div>
    //               </div>
    //               <form>
    //                 <p>SHIPPING</p>
    //                 <select>
    //                   <option className="text-muted">
    //                     Standard-Delivery- €5.00
    //                   </option>
    //                 </select>
    //                 <p>GIVE CODE</p>
    //                 <input id="code" placeholder="Enter your code" />
    //               </form>
    //               <div
    //                 className="row"
    //                 style={{
    //                   borderTop: "1px solid rgba(0,0,0,.1)",
    //                   padding: "2vh 0",
    //                 }}
    //               >
    //                 <div className="col">TOTAL PRICE</div>
    //                 <div className="col text-right">€ {totalPrice}</div>
    //               </div>
    //               <button className="btn">CHECKOUT</button>
    //             </div>
    //           </>
    //         );
    //       })}
    //     </div>
    //   </div>
    // </div>

<div>
      <h1>Product Submission Form - Step {step}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          // Simulate API call here (e.g., using setTimeout)
          setTimeout(() => {
            alert('Form submitted successfully');
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {({ isSubmitting, values, errors, touched }) => (
            console.log(values),
          <Form>
            <div>
              {step === 1 && (
                <div>
                  <label htmlFor="pro_name">Product Name</label>
                  <Field type="text" name="pro_name" />
                  <ErrorMessage name="pro_name" component="div" />
                  <label htmlFor="category">Category</label>
                  <Field as="select" name="category">
                    <option value="" label="Select a category" />
                    {categoryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                        
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="category" component="div" />
                </div>
              )}

              {step === 2 && (
                <div>
                  <label htmlFor="price">Price</label>
                  <Field type="number" name="price" />
                  <ErrorMessage name="price" component="div" />
                  <label htmlFor="discount">Discount (optional)</label>
                  <Field type="number" name="discount" />
                  <ErrorMessage name="discount" component="div" />
                </div>
              )}

              {step === 3 && (
                <div>
                  <label htmlFor="productImage">Product Image</label>
                  <input
                    type="file"
                    name="productImage"
                    accept="image/*"
                    // onChange={(event) => {
                    //   setFieldValue('productImage', event.currentTarget.files[0]);
                    // }}
                  />
                  <ErrorMessage name="productImage" component="div" />
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
                        (!values.pro_name || !values.category)) ||
                      (step === 2 && (!values.price || !values.discount))
                    }
                  >
                    Next
                  </button>
                )}
                {step === 3 && (
                  <button type="submit" disabled={isSubmitting}>
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
