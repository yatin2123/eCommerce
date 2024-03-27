
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../../container/slice/cartform.slice';
import PreviewIcon from '@mui/icons-material/Preview';
import { IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { getproduct } from '../../../container/slice/product.slice';

function Order(props) {

    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()

    const order = useSelector(state => state.order);
    console.log(order);

    const auth = useSelector(state => state.auth);
    console.log(auth);

    const product = useSelector(state => state.product);
    console.log(product);

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getOrder());
        dispatch(getproduct())
    }, [])

    const cartdata = product.product.map((v) => {
        // console.log(v);
        let med = order.order.find((m) => m.cart.some((c) => c.id === v.id));
        // console.log(med);
        return { ...med, data: v };
    });
    console.log(cartdata);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const handlealldata = (data) => {
        console.log(data);
        navigate('/admin/address',{ state: {  proData: data, fdata : cartdata, id: order} })
    }

    const columns = [
        {
            field: 'uid', headerName: 'ID', width: 90,
            renderCell: (params) =>
                // console.log(params.row.name);
                `${params.row.id || ''} `,

        },
        {
            field: 'firstName',
            headerName: 'Name',
            width: 150,
            editable: true,
            renderCell: (params) => (
                <>
                    {params.row.address.map((v, index) => (
                        <p key={index}>{v.name}</p>
                    ))}
                </>
            ),
            // console.log(params.row.name);
            // `${params.row.address.map((v) => {
            //     return(
            //         <p>{v.name}</p>
            //     )
            // })} `,
        },
        {
            field: 'City',
            headerName: 'City',
            width: 150,
            editable: true,
            renderCell: (params) => (
                <>
                    {params.row.address.map((v, index) => (
                        <p key={index}>{v.city}</p>
                    ))}
                </>
            ),
        },
        {
            field: 'Area',
            headerName: 'Area',
            type: 'number',
            width: 110,
            editable: true,
            renderCell: (params) => (
                <>
                    {params.row.address.map((v, index) => (
                        <p key={index}>{v.area}</p>
                    ))}
                </>
            ),
        },
        {
            field: 'State',
            headerName: 'State',
            type: 'number',
            width: 110,
            editable: true,
            renderCell: (params) => (
                <>
                    {params.row.address.map((v, index) => (
                        <p key={index}>{v.state}</p>
                    ))}
                </>
            ),
        },

        {
            field: 'view',
            headerName: 'View',
            type: 'number',
            width: 110,
            editable: true,
            renderCell: (params) => {
                console.log(params);
                return (
                    <>
                        {/* <Link to={'/admin/address'}> */}
                            <IconButton
                                aria-label="delete"
                                onClick={() => handlealldata(params.row)}
                            >
                                <PreviewIcon />
                            </IconButton>
                        {/* </Link> */}
                    </>
                )
            }
        },

    ];

    // const rows = [
    //     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    //     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    //     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    //     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    // ];

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <React.Fragment>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Open form dialog
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            component: 'form',
                            onSubmit: (event) => {
                                event.preventDefault();
                                const formData = new FormData(event.currentTarget);
                                const formJson = Object.fromEntries(formData.entries());
                                const email = formJson.email;
                                console.log(email);
                                handleClose();
                            },
                        }}
                    >
                        <DialogTitle>Subscribe</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To subscribe to this website, please enter your email address here. We
                                will send updates occasionally.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="name"
                                name="email"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Subscribe</Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>


                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={order.order}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                </Box>
            </form>

        </div>
    );
}

export default Order;