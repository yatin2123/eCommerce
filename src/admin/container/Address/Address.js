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

function Address(props) {
    const [selectedStatus, setSelectedStatus] = useState('');
    const orderdata = useSelector(state => state.order);
    console.log(orderdata);
    const cart = useSelector(state => state.cart);
    // console.log(cart);
    // console.log(selectedStatus);

    // const Data = orderdata.push(cart);
    const product = useSelector(state => state.product);
    // console.log(product);
    // const [data, setData] = useState([]);
    // console.log(data);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrder());
        dispatch(getproduct())
    }, [dispatch]);

    const cartdata = product.product.map((v) => {
        // console.log(v);
        let med = orderdata.order.find((m) => m.cart.some((c) => c.id === v.id));
        // console.log(med);
        return { ...med, data: v };
    });
    console.log(cartdata);

    const handleSelectChange = (event) => {
        const value = event.target.value;
        console.log('Selected Status:', value);
        setSelectedStatus(value);
    }

    const handleSubmit = (id) => {
        console.log('Selected Status:', selectedStatus);

        if (!selectedStatus) {
            console.log('Please select a status');
            return;
        }

        dispatch(updateorder({ id: id, status: selectedStatus }));
    }
    return (
        <>
            <form>
                {
                    cartdata.map((v) => {
                        if (v.uid) {
                            return (
                                <>
                                    <div className="cart">

                                        <div className="row border-top border-bottom">
                                            <div className="row main align-items-center">
                                                <div className="col-2 img-box">
                                                    <img className="img-fluid" src={v.data.file} />
                                                </div>
                                                <div className="col">
                                                    <div className="row text-muted">{ }</div>
                                                    <div className="row">{v.pro_name}</div>

                                                </div>

                                                <div className="col">
                                                    € {v.data.pro_price} <span className="close">✕</span>
                                                </div>
                                                <div className="col">
                                                    € {v.cart.map((v) => v.qty)} <span className="close"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='card-one'>
                                        <h5>Address</h5>
                                        <p>{v.address.map((p) => {
                                            return (
                                                <>
                                                    <p>{p.name}</p>
                                                    <p>{p.email}</p>
                                                    <p>{p.area}</p>
                                                    <p>{p.city}</p>
                                                    <p>{p.state}</p>
                                                    <p>{p.pincode}</p>
                                                    <p>{p.landmark}</p>
                                                </>
                                            )
                                        })}</p>
                                    </div>

                                    <div className='card-one'>
                                        <h5>User Details</h5>
                                        <p>{v.address.map((p) => {
                                            return (
                                                <>
                                                    <p>{p.name}</p>
                                                    <p>{p.email}</p>
                                                </>
                                            )
                                        })}</p>
                                    </div>

                                    <div className='select-box'>
                                        <select value={selectedStatus} onChange={handleSelectChange}>
                                            <option value="">--select--</option>
                                            <option value="process">Process</option>
                                            <option value="complete">Complete</option>
                                            <option value="pending">Pending</option>
                                        </select>
                                    </div>

                                    <button onClick={handleSubmit(v.id)}>submit</button>
                                </>
                            )
                            
                        }
                        
                    })
                }
                
            </form>
        </>
    )
}

export default Address;