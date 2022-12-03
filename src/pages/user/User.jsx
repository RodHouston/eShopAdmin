import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getUserById, updateUser } from "../../redux/apiCalls";
import "./user.css";

export default function User() {

  const dispatch = useDispatch()
  let location = useLocation();
  const navigate = useHistory();
  const userID = location.pathname.split("/")[2]
  const user = useSelector((state) => state.user.editUser)
  // console.log(user);

  const [userEdit, setEditUser] = useState('')
  const [isWorking, setIsWorking] = useState(false)

  const isFetch = useSelector((state) => state.user.isFetching)
  console.log(user);


  const handleFields = (e)  => {        
      // console.log(e.name);
      const placeholder = e.name
      const val = e.value
      setEditUser({
          ...userEdit,
          [placeholder]: val
      })       
     }

     const handleupdateUser = async (e) => {
      e.preventDefault()
      console.log("trying to update");
      if(!isFetch) {
        try{
          console.log(user);
          console.log(userEdit)
            updateUser(user._id, userEdit, dispatch)
          }catch(err){
            console.log(err);
          }
      
      }    
        
    
        navigate.push("/users")
      

      
     }


  useEffect(() => {
    getUserById(userID, userID, dispatch)
    setEditUser(userEdit)
  }, [userEdit])






  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
              <span className="userShowUserTitle">
                {user.isAdmin ? "Adminatrator" : "Customer"}
              </span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">annabeck99</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>

          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                name= "username" 
                onChange={(e) => handleFields(e.target)}
                  type="text"
                  placeholder={user.username}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>First Name</label>
                <input
                name= "firstname" 
                 onChange={(e) => handleFields(e.target)}
                  type="text"
                  placeholder={user.firstname}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Last Name</label>
                <input
                name= "lastname" 
                 onChange={(e) => handleFields(e.target)}
                  type="text"
                  placeholder={user.lastname}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                name= "email" 
                onChange={(e) => handleFields(e.target)}
                  type="text"
                  placeholder={user.email}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>City</label>
                <input
                name= "city" 
                onChange={(e) => handleFields(e.target)}
                  type="text"
                  placeholder={user.city}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>State</label>
                <input
                name= "state" 
                onChange={(e) => handleFields(e.target)}
                  type="text"
                  placeholder={user.state}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Zipcode</label>
                <input
                name= "zipcode" 
                onChange={(e) => handleFields(e.target)}
                  type="text"
                  placeholder={user.zipcode}
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={user.img}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton" onClick={handleupdateUser}>Update</button>
            </div>
          </form>
        </div>
        <div>
        </div>
      </div>

      <div className="userOrder">
        <label>Username</label>
        <input
          type="text"
          placeholder={user.username}
          className="userUpdateInput"
        />
      </div>
    </div>


  );
}
