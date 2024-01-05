import React from "react";
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

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { addsubcategory } from "../../container/slice/subcategory.slice";

const Subcategory = () => {
  const [open, setOpen] = React.useState(false);

  const subcategory = useSelector((state) => state.sbucategory);
  console.log(subcategory);

  const dispatch = useDispatch();
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
    onSubmit: (values, action) => {
      console.log("yyyyyyyyyyy");
      console.log(values);

      dispatch(addsubcategory());
      handleClose();
    },
  });

  const columns = [
    {
      field: "name",
      headerName: "First name",
      width: 150,
      editable: true,
    },

    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 130,
    //   // disableColumnMenu: true,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <IconButton
    //           aria-label="delete"
    //           onClick={() => handleDelete(params.row.id)}
    //         >

    //           <DeleteIcon />

    //         </IconButton>

    //         <IconButton
    //           aria-label="edite"
    //           onClick={() => handleEdite(params.row)}
    //         >

    //           <EditIcon />

    //         </IconButton>
    //         {/* <button onClick={() => handleDelete(params.row.id)}>X</button> */}
    //       </>
    //     )

    //   },
    // },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    formik;
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
              name="subcategory"
              id="subcategory"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            >
              {/* <option value="0"></option> */}
              {/* {subcategory.subcategory.map((v) => {
                return <option value={v.id}>{v.name}</option>;
              })} */}
            </select>
            {errors.subcategory && touched.subcategory ? (
              <span>{errors.name}</span>
            ) : null}

            <TextField
              margin="dense"
              id="name"
              label="Email Address"
              type="name"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.subcategory && touched.subcategory ? (
              <span>{errors.name}</span>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Subscribe</Button>
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
