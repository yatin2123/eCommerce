import * as React from "react";

import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useEffect } from "react";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import ShopForm from "./ShopForm";
import { useDispatch, useSelector } from "react-redux";
import {
  addShopdata,
  deleteShopdata,
  getShopdata,
  updateShopdata,
} from "../../../container/slice/shop.slice";

export default function Shop() {
  const [updte, setUpdate] = useState(false);

  // const shop = useSelector(state => state.shop)
  // console.log(shop);

  const shop = useSelector((state) => state.shop);
  console.log(shop);

  const dispatch = useDispatch();

  useEffect(() => {
    getShopdata();
  }, []);

  const handleFormSubmit = (data) => {
    if (updte) {
      dispatch(updateShopdata(data));
    } else {
      dispatch(addShopdata(data));
    }
  };

  const handleEdit = (data) => {
    setUpdate(data);
  };

  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteShopdata(id));
  };

  const columns = [
    { field: "name", headerName: "Name", width: 130 },
    { field: "price", headerName: "Price", width: 130 },
    { field: "date", headerName: "date", width: 130 },
    {
      field: "Action",
      headerName: "Action",

      renderCell: (params) => (
        <>
          <IconButton
            aria-label="delete"
            onClick={() => handleEdit(params.row)}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div>
      <ShopForm onHandleSubmit={handleFormSubmit} onupdte={updte} />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={shop.shop}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </div>
  );
}
