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
import { useLocation } from 'react-router-dom';
import { auth } from '../../../firebase';

function Address(props) {
    const location = useLocation()
    console.log(location);

    const prostatus = location.state && location.state.proData.id;
    console.log(prostatus);

    const fdata = location.state && location.state.fdata;
    console.log(fdata);
    const Data = location.state && location.state.id.order;
    console.log(Data)
    const odata = Data.map((v) => {
        let med = fdata.find((c) => c.id === v.id);
        console.log(med);
        return { ...med, ...v }
    })
    console.log(odata);

    const [selectedStatus, setSelectedStatus] = useState('');
    const orderdata = useSelector(state => state.order);
    console.log(orderdata);
    const cart = useSelector(state => state.cart);
    // console.log(cart);
    // console.log(selectedStatus);

    const auth = useSelector(state => state.auth);
    console.log(auth);

    // const Data = orderdata.push(cart);
    const product = useSelector(state => state.product);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrder());
        dispatch(getproduct())
    }, [dispatch]);

    const handleSelectChange = (value) => {
        setSelectedStatus(value);
    }

    const handleSubmit = (id) => {
        // console.log(selectedStatus);
        if (!selectedStatus) {
            // console.log('Please select a status');
            return;
        }
        dispatch(updateorder({ id: id, status: selectedStatus }));
    }
    return (
        <>
            {/* <div className='select-box'>
                <select value={selectedStatus} onChange={handleSelectChange}>
                    <option value="">--select--</option>
                    <option value="process">Process</option>
                    <option value="complete">Complete</option>
                    <option value="pending">Pending</option>
                </select>
            </div> */}

            <div class="row">
                {
                    odata.map((v) => {
                        const totaldis = v.data.discount * v.data.pro_price / 100;
                        console.log(totaldis);
                        console.log(v);
                        if (v.id == prostatus) {
                            return (
                                <>
                                    <div class="col ">
                                        <div class="card ">
                                            <div class="card-header py-3">
                                                <h5 class="mb-0">Biling details</h5>
                                            </div>
                                            <div class="card-body">
                                                <form>
                                                    <div class="row mb-4">
                                                        <div class="col">
                                                            <div class="form-outline">
                                                                <label class="form-label" for="form7Example1">product image</label>
                                                                <span>{v.data.file}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row form-outline mb-4">
                                                        <label class="form-label" for="form7Example3">product name:</label>
                                                        <span>{v.data.pro_name}</span>
                                                    </div>

                                                    <div class="row form-outline mb-4">
                                                        <label class="form-label" for="form7Example4">price:</label>
                                                        <span>{v.data.pro_price}</span>
                                                    </div>

                                                    <div class="row form-outline mb-4">
                                                        <label class="form-label" for="form7Example5">discount:</label>
                                                        <span>{v.data.discount}</span>
                                                    </div>

                                                    <div class="row form-outline mb-4">
                                                        <label class="form-label" for="form7Example5">Total:</label>
                                                        <span>{v.data.pro_price - totaldis}</span>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    })
                }

                {
                    location.state.proData.address.map((v) => {
                        console.log(v);
                        return (
                            <>
                                <div class="col-md-4 mb-4">
                                    <div class="card mb-4">
                                        <div class="card-header py-3">
                                            <h5 class="mb-0">Address</h5>
                                        </div>
                                        <div class="card-body">
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                    Name:
                                                    <span>{v.name}</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                                    Email:
                                                    <span>{v.email}</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                                    City:
                                                    <span>{v.city}</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                                    Area:
                                                    <span>{v.area}</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                                    Landmark:
                                                    <span>{v.landmark}</span>
                                                </li>

                                                <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                                    Address;
                                                    <span>{v.house}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className='btn-box'>
                                    <button onClick={handleSubmit(v.id)}>submit</button>
                                </div> */}
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Address;