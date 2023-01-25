import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

import { Link, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteProducts, getProducts } from "../../redux/apiCalls";

export default function ProductList() {

  const dispatch = useDispatch()
  const history = useHistory()
  const products = useSelector((state) => state.product.products)
    
  useEffect(() => {

    getProducts(dispatch)

  }, [dispatch])


  const handleDelete = (id) => {
    deleteProducts(id, dispatch)
  };


  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        // console.log(params.row);
        return (
          <div className="productListItem" min-width='100%'>
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>

        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 150 },
    { field: "inventory", headerName: "Inventory", width: 150 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button className="productListEdit">Edit</button>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={row => row._id}
        pageSize={8}
        checkboxSelection
        onRowClick={(params, event) => {
          history.push('/product/' + params.id)
        }
        }
      />
    </div>
  );
}
