import "./designList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

import { Link } from "react-router-dom";

import { useDispatch, useSelector} from "react-redux";
import { useEffect} from "react";
import { deleteDesigns, getDesigns } from "../../redux/apiCalls";

export default function DesignList() {
 
  const dispatch = useDispatch()
  const designs = useSelector((state) => state.design.designs)
  const products = useSelector((state) => state.product.products)

  useEffect(() => {

    getDesigns(dispatch)
    
  }, [dispatch])
  

  const handleDelete = (id) => {
    deleteDesigns(id, dispatch)
  };

// console.log(designs);
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "design",
      headerName: "Design",
      width: 200,
      renderCell: (params) => {
        // console.log(params.row);
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/design/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
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
        rows={designs}
        disableSelectionOnClick
        columns={columns}
        getRowId ={row=>row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
