import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toBeEnabled } from '@testing-library/jest-dom/matchers';
// import { forgetReqwest, loginReqwest, signupReqwest, signupreqwest } from '../../reducx/action/auth.action';
import { useDispatch, useSelector } from 'react-redux';
import { forgetReqwest, loginReqwest, signupReqwest } from '../../redux/action/auth.action';
import './Auth.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

function Auth(props) {
    const [type, setType] = useState('login')
    const auth = useSelector(state => state.auth)
    console.log(auth);
    const navigate = useNavigate();
    
    let authobj, inival;
    if (type === 'login') {
        authobj = {
            email: yup.string().email("please enter valid email").required("please enter email"),
        }
        inival = {
            email: '',
        }
    } else if (type === 'signup') {
        authobj = {
            name: yup.string().required("please enter name").matches(/^([a-zA-Z ]){2,30}$/, "plase enter valid name"),
            email: yup.string().email("please enter valid email").required("please enter email"),
            phone: yup.string().required("please enter phone"),
            con_phone: yup.string().required("please enter confirm phone").test("con_phone", "confirm phonr", function (v) {
                if (v === this.parent.phone) {
                    return true
                } else {
                    return false
                }
            })
        }
        inival = {
            name: '',
            email: '',
            phone: '',
            con_phone: ''
        }
    } else {
        authobj = {
            email: yup.string().email("please enter valid email").required("please enter email"),
        }
        inival = {
            email: ''
        }
    }
    let authSchema = yup.object().shape(authobj);
    const dispatch = useDispatch()
    const handlesignup = (data) => {
        console.log(data);
        dispatch(signupReqwest(data))
    }
    const handlelogin = (data) => {
        console.log(data);
        dispatch(loginReqwest(data))
        navigate("/")
    }
    const handleforget = (data) => {
        console.log(data);
        dispatch(forgetReqwest(data))
    }
    const formikobj = useFormik({
        initialValues: inival,
        validationSchema: authSchema,
        onSubmit: values => {
            if (type === 'login') {
                handlelogin(values)
            } else if (type === 'signup') {
                handlesignup(values)
            } else {
                handleforget(values)
            }
        },
        enableReinitialize: true
    })
    const { handleChange, handleBlur, handleSubmit, errors, values, touched } = formikobj;
    return (
        <div>
            <main>
                <section id="appointment" className="appointment">
                    <div className="container">
                        <div className="section-title">
                            {
                                type === 'login' ? null : type === 'signup' ? null : <h2>Forget</h2>
                            }
                        </div>
                        <form onSubmit={handleSubmit} role="form" className="php-email-form">
                            <div className='login-design'>
                                <div className="sign-design">
                                    {
                                        type === 'signup' ? <div className="col-md-8 form-group">
                                            <h4>Signup</h4>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                id="name"
                                                placeholder="Your Name"
                                                value={values.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                errorText={errors.name && touched.name ? <span>{errors.name}</span> : ''}
                                            />
                                        </div>
                                            : ''
                                    }
                                    <div className="col-md-8 form-group mt-3 mt-md-0">
                                        
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            id="email"
                                            placeholder="Your Email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.email && touched.email ? <span>{errors.email}</span> : null}
                                    </div>
                                    {
                                        type === 'login' || type === 'signup' ? <div className="col-md-8 form-group mt-3 mt-md-0">
                                            <input
                                                type="tel"
                                                className="form-control"
                                                name="phone"
                                                id="phone"
                                                placeholder="Your Phone"
                                                value={values.phone}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.phone && touched.phone ? <span>{errors.phone}</span> : null}
                                        </div>
                                            : null
                                    }
                                    {
                                        type === 'signup' ? <div className="col-md-8 form-group mt-3 mt-md-0">

                                            <input
                                                type="tel"
                                                className="form-control"
                                                name="con_phone"
                                                id="con_phone"
                                                placeholder="Your confirm Phone"
                                                value={values.con_phone}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.con_phone && touched.con_phone ? <span>{errors.con_phone}</span> : null}
                                        </div>
                                            : null
                                    }
                                </div>
                                <div className="text-center">
                                    {

                                        type === 'login' ? <button type="submit" >Login</button> :
                                            type === 'signup' ? <button btntype='secondry' type="submit" >Signup</button> : <button btntype='outline' type="submit">Submit</button>
                                    }
                                </div>
                                <div className='account'>
                                    {
                                        type === 'login' ?
                                            <span>creat an account:<a href='#' onClick={() => setType('signup')}>Signup</a></span> :
                                            <span>creat an account:<a href='#' onClick={() => setType('login')}>Login</a></span>
                                    }
                                    <br></br>
                                    <div className='forgrtbtn'>
                                        {
                                            type === 'login' ? <a href='#' onClick={() => setType('forget')}>Forget</a> : null
                                        }
                                    </div>
                                </div>
                                <div className='iconbtn'>
                                    <a href='#' className='one'> <i class="fa-brands fa-facebook-f"></i></a>
                                    <a href='#'><i class="fa-brands fa-instagram"></i></a>
                                    <a href='#'><i class="fa-brands fa-google"></i></a>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Auth;