import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  addShopdata,
  deleteShopdata,
  getShopdata,
  updateShopdata,
} from "../../../container/slice/shop.slice";
import { IconButton } from "@mui/material";

const ShopForm = () => {
  const [open, setOpen] = React.useState(false);

  const [update, setUpdate] = useState(false)
  // console.log(update);

  const shop = useSelector((state) => state.shop);
  console.log(shop.shop);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getShopdata());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let shopSchema = yup.object().shape({
    name: yup.string().required("please enter your name."),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: shopSchema,

    onSubmit: (data, action) => {
      console.log(data);      
      if (update) {
        console.log(update);
        dispatch(updateShopdata(data))
      } else {
        dispatch(addShopdata(data));
      }

      setValues(update)

      action.resetForm();
      handleClose()
    },
  });

  const handleDelete = (id) => {
    dispatch(deleteShopdata(id));
  };

  const handleEdite = (data) => {
    console.log(data);
    setUpdate(data)
    setValues(data)
    handleClickOpen()
  }

  const columns = [
    {
      field: "name",
      headerName: "First name",
      width: 150,
      editable: true,
    },

    {
      field: "action",
      headerName: "Action",
      width: 130,
      // disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete(params.row.id)}
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
    },
  ];

  const { handleSubmit, handleChange, handleBlur, values, errors, touched , setValues} =
    formik;

  console.log(shop.shop);
  return (
    <form onSubmit={handleSubmit}>
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          category
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>category</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              margin="dense"
              id="name"
              label="Category Name"
              type="email"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name ? <span>{errors.name}</span> : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>ADD</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={shop.shop}
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

export default ShopForm;