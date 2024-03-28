import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder, updateorder } from '../../../container/slice/cartform.slice';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getproduct } from '../../../container/slice/product.slice';
import { CardText, CardTitle } from 'reactstrap';
import './Address.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase';
import { getuser } from '../../../container/slice/auth.slice';
import { setAlert } from '../../../container/slice/alert.slice';

function Address(props) {
    const location = useLocation()
    console.log(location);

    const prostatus = location.state && location.state.proData.id;
    console.log(prostatus);

    const fdata = location.state && location.state.fdata;
    console.log(fdata);

    const orderdata = useSelector(state => state.order);
    console.log(orderdata);
    const navigate = useNavigate()

    const [selectedStatus, setSelectedStatus] = useState('');
    console.log(selectedStatus);
    const auth = useSelector(state => state.auth);
    console.log(auth);
    const user = useSelector(state => state.user);
    console.log(user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrder());
        dispatch(getproduct());
        dispatch(getuser())
    }, [dispatch]);

    const handleSelectChange = (event) => {
        const value = event.target.value;
        console.log('Selected Status:', value);
        setSelectedStatus(value);
    }

    const handleSubmit = (prostatus) => {
        console.log(prostatus);
        console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');

        if (!selectedStatus) {
            console.log('pppppppppppppppppppppp');
            return;
        }
        dispatch(updateorder({ id: prostatus, status: selectedStatus }));
        dispatch(setAlert({ text: 'status change', color: 'success' }));
        navigate('/admin/ordermessage')
    }
    return (
        <>

            <div className='select-box'>
                <select onChange={handleSelectChange}>
                    <option value="">--select--</option>
                    <option value="process">Process</option>
                    <option value="complete">Complete</option>
                    <option value="pending">Pending</option>
                </select>
            </div>
            <div class="row">
                <div class="col ">
                    <div class="card ">
                        <div className='header'>
                            <h5 class="mb-0">Biling details</h5>

                            <h5>Quantity</h5>
                            <h5>Price</h5>
                        </div>
                       
                        {
                            fdata.length > 0 &&
                            fdata?.map((v) => {
                                console.log(v);
                                const total = v.data.discount * v.data.pro_price / 100;
                                console.log(total);
                                const isValidURL = (url) => {
                                    return url && url.startsWith('http');
                                };

                                if (v.id === prostatus) {
                                    return (
                                        <>
                                            <div class="card-body">
                                                <form>
                                                    <div class="row-des">
                                                        <div class="form-outline">
                                                            {/* <label class="form-label" for="form7Example1">product image</label> */}
                                                            {v.data.file && isValidURL(v.data.file) ? (
                                                                <img src={v.data.file} alt="Product" />
                                                            ) : (
                                                                <span>Invalid image URL</span>
                                                            )}
                                                        </div>
                                                        <div class=" form-outline mb-4">
                                                            {/* <label class="form-label" for="form7Example5">qty:</label> */}
                                                            <span>
                                                                {v.cart.map((c) => {
                                                                    if (v.data.id === c.id) {
                                                                        return (
                                                                            <p>{c.qty}</p>
                                                                        )
                                                                    }
                                                                }
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div class=" form-outline mb-4">
                                                            <label class="form-label" for="form7Example5"></label>
                                                            <span>{v.data.pro_price}</span>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                        </>
                                    )
                                }
                            })
                        }

                    </div>
                </div>
            </div>
            <div className='btn-box'>
                <button onClick={() => handleSubmit(prostatus)}>submit</button>
            </div>
            {
                location.state.proData.address.map((v) => {
                    console.log(v);
                    return (
                        <>
                            <div className='m-box'>
                                <div className='add-box'>
                                    <h3>Address</h3>
                                    <div className='add-d-box'>
                                        <div className='name-box'><b>Name:</b> <span>{v.name}</span></div>
                                        <div className='email-box'><b>Email:</b> <span>{v.email}</span></div>
                                        <div className='city-box'><b>City:</b><span>{v.city}</span></div>
                                        <div className='pincode-box'><b>Pincode:</b> <span>{v.pincode}</span></div>
                                    </div>
                                </div>
                                <div className='user-box'>
                                    <h3>User Detail</h3>
                                    <div>
                                        {
                                            user.user.map((v) => {
                                                console.log(v);
                                                if (v.uid === auth.user.uid) {
                                                    return (
                                                        <>
                                                            <div className='user-d-box'>
                                                                <div className='user-n-box'><b>Name:</b><span>{v.name}</span></div>
                                                                <div className='user-r-box'><b>Email:</b> <span>{v.email}</span></div>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })
            }
        </>
    )
}

export default Address;