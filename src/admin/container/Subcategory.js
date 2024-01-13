import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { addsubcategory, deletesubcategory, getsubcategory, updatesubcategory } from "../../container/slice/subcategory.slice";
import { getShopdata } from "../../container/slice/shop.slice";
import { IconButton } from "@mui/material";

const Subcategory = () => {
  const [open, setOpen] = React.useState(false);

  const [update, setUpdate] = useState(false)

  const subcategory = useSelector((state) => state.sbucategory);
  console.log(subcategory);

  const shopdata = useSelector((state) => state.shop)
  console.log(shopdata);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getsubcategory())
  }, [dispatch])
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let subcategorySchema = yup.object().shape({
    sub_name: yup.string().required("please enter your name"),
   
  });

  const formik = useFormik({
    initialValues: {
      sub_name: "",
      cart_id: ""
    },

    validationSchema: subcategorySchema,
    onSubmit: (data, action) => {
      console.log("yyyyyyyyyyy");
      console.log(data);

      if (update) {
        dispatch(updatesubcategory(data))
      } else {
        dispatch(addsubcategory(data));
      }

      setValues(update)
      handleClose();
      action.resetForm()
    },
  });


  const handleDelete = (id) => {
    dispatch(deletesubcategory(id))
  }

  const handleEdite = (data) => {
    setUpdate(data)
    setValues(data)
    handleClickOpen()
  }

  const columns = [
    {
      field: "cat_name",
      headerName: "Category name",
      width: 150,
      editable: true,

      renderCell: (params) => {
        console.log(params);

       let fdata =  shopdata.shop.filter((v) => v.cart_id === params.row.cat_name)
       console.log(fdata);

        if (fdata.length > 0) {
          return fdata[0].cat_name;
        } else {
          return null ;
        }
      }
    },

    {
      field: "sub_name",
      headerName: "subcategory name",
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

  const { handleSubmit, handleChange, handleBlur, values, errors, touched, setValues } =
    formik;
    console.log(values);
  return (
    <form onSubmit={handleSubmit}>
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Subcategory
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subcategory</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>

            <select
             
              id="cart_id"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.cart_id}
            >
              <option value="0">select</option>

              {shopdata.shop.map((v) => {
                console.log(v);
                return <option value={v.id}>{v.cat_name}</option>
                // return <option value={v.id}>{v.name}</option>;
              })}
            </select>
            {/* {errors.cart_id && touched.cart_id ? (
              <span>{errors.cart_id }</span>
            ) : null} */}

            <TextField
              margin="dense"
              id="sub_name"
              label="Subcategory Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.sub_name}
            />
            {errors.sub_name && touched.sub_name ? (
              <span>{errors.sub_name}</span>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>ADD</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={subcategory.subcategory}
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

export default Subcategory;
