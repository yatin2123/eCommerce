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
            {
                cartdata.map((v) => {
                    if (v.uid) {
                        return (
                            <>
                                <div className='select-box'>
                                    <select value={selectedStatus} onChange={handleSelectChange}>
                                        <option value="">--select--</option>
                                        <option value="process">Process</option>
                                        <option value="complete">Complete</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                </div>
                                <div className="container-fluid">
                                    <div className="container">
                                        {/* Title */}
                                        <div className="d-flex justify-content-between align-items-center py-3">
                                            <h2 className="h5 mb-0"><a href="#" className="text-muted" /> Order </h2>
                                        </div>
                                        {/* Main content */}
                                        <div className="row">
                                            <div className="col-lg-8">
                                                {/* Details */}
                                                <div className="card-ad mb-4">
                                                    <div className="card-body">
                                                        <div className="mb-3 d-flex justify-content-between">

                                                            <div className="d-flex">

                                                                <div className="dropdown">
                                                                    <button className="btn btn-link p-0 text-muted" type="button" data-bs-toggle="dropdown">
                                                                        <i className="bi bi-three-dots-vertical" />
                                                                    </button>
                                                                    <ul className="dropdown-menu dropdown-menu-end">
                                                                        <li><a className="dropdown-item" href="#"><i className="bi bi-pencil" /> Edit</a></li>
                                                                        <li><a className="dropdown-item" href="#"><i className="bi bi-printer" /> Print</a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <table className="table table-borderless">
                                                            <tbody>

                                                                <tr>
                                                                    <td>
                                                                        <div className="d-flex mb-2">
                                                                            <div className="flex-shrink-0">
                                                                                <img src={v.data.file} alt width={35} className="img-fluid" />
                                                                            </div>
                                                                            <div className="flex-lg-grow-1 ms-3">
                                                                                <h6 className="small mb-0"><a href="#" className="text-reset">{v.data.pro_name}</a></h6>

                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>{v.cart.map((v) => v.qty)}</td>
                                                                    <td className="text-end">${v.data.pro_price}</td>
                                                                </tr>
                                                            </tbody>
                                                            <tfoot>

                                                                {/* <tr className="fw-bold">
                                                                <td colSpan={2}>TOTAL</td>
                                                                <td className="text-end">${v.data.amount}</td>
                                                            </tr> */}
                                                            </tfoot>
                                                        </table>
                                                    </div>
                                                </div>
                                                {/* Payment */}
                                                <div className="card-ad mb-4">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                                <h3 className="h6">Payment Method</h3>
                                                                <p>Visa -1234 </p>
                                                                    
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <h3 className="h6">Billing address</h3>
                                                                <address>
                                                                    <strong>John Doe</strong><br />
                                                                    1355 Market St, Suite 900<br />
                                                                    San Francisco, CA 94103<br />
                                                                    <abbr title="Phone">P:</abbr> (123) 456-7890
                                                                </address>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                {/* Customer Notes */}
                                                <div className="card-ad mb-4">
                                                    <div className="card-body">
                                                        <h3 className="h6">User Details</h3>
                                                        <p>{v.address.map((p) => {
                                                            return (
                                                                <>
                                                                    <p>{p.name}</p>
                                                                    <p>{p.email}</p>
                                                                </>
                                                            )
                                                        })}</p>
                                                    </div>
                                                </div>
                                                <div className="card-ad mb-4">
                                                    {/* Shipping information */}
                                                    <div className="card-body">
                                                        <h3 className="h6">Shipping Information</h3>
                                                        <strong>FedEx</strong>
                                                        <span><a href="#" className="text-decoration-underline" target="_blank">FF1234567890</a> <i className="bi bi-box-arrow-up-right" /> </span>
                                                        <hr />
                                                        <h3 className="h6">Address</h3>
                                                        <address>
                                                            <p>{v.address.map((p) => {
                                                                return (
                                                                    <>
                                                                        <strong>{p.name}</strong>
                                                                        <p>{p.email}</p>
                                                                        <p>{p.area}</p>
                                                                        <p>{p.city}</p>
                                                                        <p>{p.state}</p>
                                                                        <p>{p.pincode}</p>
                                                                        <p>{p.landmark}</p>
                                                                    </>
                                                                )
                                                            })}</p>
                                                        </address>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div className='btn-box'>
                                            <button onClick={handleSubmit(v.id)}>submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )

                    }

                })
            }
        </>
    )
}

export default Address;