import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StarIcon from '@mui/icons-material/Star';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { addreview } from '../slice/review.slice';
import { NavLink, useParams } from 'react-router-dom';
import './Review.css'

function Review({ id }) {
    const product = useSelector(state => state.product);
    console.log(product);

    // console.log(data);
    const auth = useSelector(state => state.auth);
    console.log(auth.user);

    const cart = useSelector(state => state.cart);
    console.log(cart);

    const [value, setValue] = useState(0);
    console.log(value);

    const dispatch = useDispatch();

    let reviewschema = yup.object({
        comment: yup.string().defined(),
        rating: yup.number(),
    });

    const formik = useFormik({
        initialValues: {
            comment: '',
            rating: 0,
        },
        validationSchema: reviewschema,
        onSubmit: (data, action) => {
            data.rating = value;
            console.log('gggggggggggggg');
            console.log(data);
            dispatch(addreview({...data, pid:id, uid:auth.user.uid}))
        },
    });

    const { handleSubmit, handleBlur, handleChange, values } = formik

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="comment"
                    name="comment"
                    placeholder='enter comment'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.comment}
                />
                {/* {errors.comment && touched.comment && errors.comment} */}
                
                <Box
                    sx={{
                        '& > legend': { mt: 0 },
                    }}
                >
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, values) => {
                            setValue(values);
                        }}
                    />
                </Box>
                {
                    auth.user ? (<button type="submit">
                        Submit
                    </button>) : <NavLink to={'/auth'}><button type="submit">
                        Submit
                    </button></NavLink>
                }
            </form>
        </div>
    );
}

export default Review;