import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';

function Contact(props) {


    let Contactschema = yup.object().shape({
        name: yup.string()
            .required("Please Enter Name")
            .matches(/^[a-zA-Z]{2,30}$/, "Please Enter Valid Name"),
        email: yup.string()
            .email("Please Enter Valid Email")
            .required("Please Enter Email"),
        phone: yup.string()
            .required("Please Enter Phone Number")
            .matches(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/, "Please Enter Valid Phone Number")
            .typeError("Only Digit Number Allowed"),
        message: yup.string()
            .required("Please Enter Message"),
    })

    const formikObj = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            message: '',
        },

        onSubmit: (values, action) => {
            console.log(values);


            action.resetForm()
        },

        validationSchema: Contactschema
    })

    const { handleSubmit, handleChange, handleBlur, setFieldValue, values, errors, touched, setValues } = formikObj
    return (
        <div>
            <section className="contact_section layout_padding">
                <div className="container px-0">
                    <div className="heading_container ">
                        <h2 className>
                            Contact Us
                        </h2>
                    </div>
                </div>
                <div className="container container-bg">
                    <div className="row">
                        <div className="col-lg-7 col-md-6 px-0">
                            <div className="map_container">
                                <div className="map-responsive">
                                    <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Eiffel+Tower+Paris+France" width={600} height={300} frameBorder={0} style={{ border: 0, width: '100%', height: '100%' }} allowFullScreen />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-5 px-0">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <input type="text"
                                     placeholder="Name"
                                     onChange={handleChange}
                                     onBlur={handleBlur}
                                     value={values.name}
                                     />
                                     {errors.name && touched.name ? <span>{errors.name}</span> : ''}
                                </div>
                                <div>
                                    <input type="email" 
                                    placeholder="Email" 
                                    onChange={handleChange}
                                     onBlur={handleBlur}
                                     value={values.email}
                                     />
                                     {errors.email && touched.email ? <span>{errors.email}</span> : ''}
                                </div>
                                <div>
                                    <input type="number"
                                     placeholder="Phone" 
                                     onChange={handleChange}
                                     onBlur={handleBlur}
                                     value={values.phone}
                                     />
                                     {errors.phone && touched.phone ? <span>{errors.phone}</span> : ''}
                                </div>
                                <div>
                                    <input type="text" 
                                    className="message-box" 
                                    placeholder="Message" 
                                    onChange={handleChange}
                                     onBlur={handleBlur}
                                     value={values.message}
                                     />
                                     {errors.message && touched.message ? <span>{errors.message}</span> : ''}
                                </div>
                                <div className="d-flex ">
                                    <button type='submit'>
                                        SEND
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default Contact;