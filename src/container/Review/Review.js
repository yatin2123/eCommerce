import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StarIcon from '@mui/icons-material/Star';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { addreview, updatereview } from '../slice/review.slice';
import { NavLink, useParams } from 'react-router-dom';
import './Review.css'
import { setConsent } from 'firebase/analytics';

function Review({ id, onupdate }) {
    const [comment, setComment] = useState('');
    const [dupdate, setDupdate] = useState(false);
    const [value, setValue] = useState(0);
    // console.log(value);
    const auth = useSelector(state => state.auth);
    console.log(auth.user.uid);
    const cart = useSelector(state => state.cart);
    // console.log(cart);
    const review = useSelector(state => state.review);
    console.log(review);

    const dispatch = useDispatch();
    useEffect(() => {
        if (onupdate) {
            setValues(onupdate)
        }
    }, [onupdate])

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
            // console.log('gggggggggggggg');
            // console.log(data);
            if (onupdate) {
                dispatch(updatereview(data))
            } else {
                dispatch(addreview({ ...data, pid: id, uid: auth.user.uid }))
            }
            action.resetForm();
        },
    });

    const { handleSubmit, handleBlur, handleChange, values, setValues } = formik;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {
                    review.review.map((v) => {
                        if (v.uid === auth.user.uid) {
                            return (
                                <input
                                    type="comment"
                                    name="comment"
                                    placeholder='enter comment'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.comment}
                                    disabled={onupdate ? false : true}
                                />
                            )
                        }
                    })
                }
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