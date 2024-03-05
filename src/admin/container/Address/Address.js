import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../../container/slice/cartform.slice';
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

function Address(props) {
    const orderdata = useSelector(state => state.order);
    console.log(orderdata);
    const cart = useSelector(state => state.cart);
    console.log(cart);

    // const Data = orderdata.push(cart);

    const product = useSelector(state => state.product);
    console.log(product);

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrder());

    }, [dispatch]);

    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">select</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={age}
                    label="select"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            {
                orderdata.order.map((v) => {
                    return (
                        <>
                        <h3>Order list</h3>
                            {v.address.map((n) => (
                                <Card key={n.id} sx={{ maxWidth: 345 }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            Name: {n.name}
                                        </Typography>

                                        <Typography gutterBottom variant="h6" component="div">
                                            Email: {n.email}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="div">
                                           City: {n.city}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="div">
                                           Area: {n.area}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="div">
                                           State: {n.state}
                                        </Typography>

                                        <Typography gutterBottom variant="h6" component="div">
                                        Pincode: {n.pincode}
                                        </Typography>

                                        <Typography gutterBottom variant="h6" component="div">
                                           Amount: {n.amount}
                                        </Typography>

                                        <Typography gutterBottom variant="h6" component="div">
                                        Landmark: {n.landmark}
                                        </Typography>
                                        {/* You can add more details about the address here */}
                                    </CardContent>
                                </Card>
                            ))}
                        </>
                    );
                })
            }
        </>
    )
}

export default Address;