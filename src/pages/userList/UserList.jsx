import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {  userRequest } from "../../RequestMethods";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/apiCalls";

export default function UserList() {
  const [data, setData] = useState(userRows);
  
  const dispatch = useDispatch()

  const users = useSelector((state) => state.user.users)
  const isFetch = useSelector((state) => state.user.isFetching)

console.log(users);

  useEffect(() => {
    getUsers(dispatch)
 
  }, [dispatch ])

console.log(users);

const handleDelete = (id) => {
  setData(data.filter((item) => item._id !== id));
};

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.img} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "isAdmin",
      width: 120,
    },
    // {
    //   field: "transaction",
    //   headerName: "Transaction Volume",
    //   width: 160,
    // },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{pathname: "/user/" + params.row._id, query: {user : params.row}}}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (

    !isFetch &&
      <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId ={row=>row._id }
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
