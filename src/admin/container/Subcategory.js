import React from 'react';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { useSelector } from 'react-redux';


const Subcategory = () => {

    const [open, setOpen] = React.useState(false);

    const subcategory = useSelector(state => state.shop)
    console.log(subcategory);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let subcategorySchema = yup.object().shape({
        name: yup.string().required("please enter your name"),
    });




    const formik = useFormik({
        initialValues: {
            name: "",
        },

        validationSchema: subcategorySchema,
        onSubmit: values => {
            console.log(values);
        },
    });

    const { handleSubmit, values } = formik
    return (

        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Subcategory
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subcategory</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />

                    <form onSubmit={handleSubmit}>


                        {
                            Array.isArray(subcategory)
                                ? subcategory.map((v, index) => (
                                    <select key={index}>
                                        {v.options.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                ))
                                : <p>Subcategory is not an array</p>
                        }
                        {/* <option>Subcategory</option>
                            <option></option>
                            <option></option>
                            <option></option> */}


                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>




    );
};

export default Subcategory;