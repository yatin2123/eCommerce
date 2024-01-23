
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog, { dialogClasses } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { addproduct, deleteproduct, getproduct, updateproduct } from '../../../container/slice/product.slice';

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';



const ProductForm = () => {

    const [open, setOpen] = React.useState(false);

    const [update, setUpdate] = useState([]);
    const [subdata, setSubdata] = useState([])

    const dispatch = useDispatch([])
    const product = useSelector((state => state.product));
    console.log(product);

    const shop = useSelector((state => state.shop));
    console.log(shop);

    const subcategory = useSelector((state => state.sbucategory));
    console.log(subcategory);

    useEffect(() => {
        dispatch(getproduct())
    }, [dispatch])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    let productschema = yup.object().shape({
        pro_name: yup.string().required("please enter name"),
        pro_des: yup.string().required("please enter des"),
        pro_price: yup.number(),
        file: yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            pro_name: '',
            pro_des: '',
            pro_price: '',
            file: ''
        },
        validationSchema: productschema,
        onSubmit: (data, action) => {
           
            console.log(data);

            // if (update) {
            //     dispatch(updateproduct(data))
            // } else {
            //     dispatch(addproduct(data))
            // }

            dispatch(addproduct(data))

            setValues(update)
            handleClose()
            action.resetForm()
        },
    });

    const handleDelete = (data) => {
        dispatch(deleteproduct(data))
    }

    const handleEdite = (data) => {
        setUpdate(data)
        handleClickOpen();
        setValues(data)
    }
    const columns = [

        {
            field: 'car_id',
            headerName: 'product name',
            width: 150,
            editable: true,
            renderCell: (params) => {
                console.log(params);
                let pData = shop.shop.filter((v) => v.id === params.row.cart_id)
                console.log(pData);

                if (pData.length > 0) {
                    return pData[0].cat_name
                } else {
                    return null
                }
            },
        },
        {
            field: 'sub_id',
            headerName: 'subcategory name',
            width: 150,
            editable: true,
            renderCell: (params) => {
                console.log(params);
                let sData = subcategory.subcategory.filter((v) => v.id === params.row.sub_id)
                console.log(sData);

                if (sData.length > 0) {
                    return sData[0].sub_name
                } else {
                    return null
                }
            },
        },
        {
            field: 'pro_price',
            headerName: 'price',
            type: 'number',
            width: 110,
            editable: true,
        },

        {
            field: 'file',
            headerName: 'image',
            width: 110,
            editable: true,
            renderCell: (params) => {
                return (
                   <img height={"100px"} src={(params.row.file)}/>
                )

            },
        },
        {
            field: 'action',
            headerName: 'action',
            renderCell: (params) => {
                return (
                    <>

                        <IconButton
                            aria-label="delete"
                            onClick={() => handleDelete(params.row)}
                        >
                            <DeleteIcon />

                        </IconButton>

                        <IconButton
                            aria-label="edite"
                            onClick={() => handleEdite(params.row)}
                        >
                            <EditIcon />
                        </IconButton>
                        {/* <button onClick={() => handleDelete(params.row.id)}>X</button> */}
                    </>
                )

            },
        }
    ];

    const subcat = (value) => {
        console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');
        console.log(value);

        let fdata = subcategory.subcategory.filter((v) => v.cart_id === value)
        console.log(fdata);

        setSubdata(fdata)
    }
    
    const { handleSubmit, handleChange, handleBlur, setFieldValue, values, errors, setValues } = formik;

    return (
        <form onSubmit={handleSubmit}>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Product
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Product</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address
                            here. We will send updates occasionally.
                        </DialogContentText>

                        <select

                            id="cart_id"
                            onChange={(event) => {
                               
                                handleChange(event); 
                                subcat(event.target.value);
                                // handlesubcat(event.target.value);
                            }}
                            onBlur={handleBlur}
                            value={values.cart_id}
                        >
                            <option value="0">select</option>

                            {shop.shop.map((v) => {
                                console.log(v);
                                return <option value={v.id}>{v.cat_name}</option>
                              
                            })}
                        </select>

                        <select

                            id="sub_id"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.sub_id}
                        >
                            <option value="0">select</option>

                            {subdata.map((v) => {
                                console.log(v);
                                return <option value={v.id}>{v.sub_name}</option>
                               
                            })}
                        </select>

                        <TextField
                            margin="dense"
                            id="pro_name"
                            label="Product Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.pro_name}
                        />

                        <TextField
                            name='file'
                            type='file'
                            fullWidth
                            variant="standard"
                            onChange={(event) => setFieldValue("file", event.target.files[0])}
                        />

                        {values.file && (
                            <img
                                src={typeof values.file === 'string' ? values.file : URL.createObjectURL(values.file)}
                                width={"50px"}
                                height={"50px"}
                            />
                        )}
                        <TextField
                            margin="dense"
                            id="pro_des"
                            label="Product des"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.pro_des}
                        />

                        <TextField
                            margin="dense"
                            id="pro_price"
                            label="Product Price"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.pro_price}
                        />



                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSubmit}>ADD</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={product.product}
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
    );
};

export default ProductForm;