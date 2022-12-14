import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import ProductCatList from "./pages/productCategories/ProductCatList";
import NewProductCat from "./pages/newProductCategory/NewProductCatergory";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";

import DesignList from "./pages/designList/DesignList";
import Design from "./pages/design/Design";
import NewDesign from "./pages/newDesign/NewDesign";
import Login from "./pages/login/Login";
import PhotoGallery from "./pages/photoGallery/PhotoGallery";

function App() {

  const admin = () => {
    if (
      JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
        .currentUser.accessToken
    ) {
      return JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
        .currentUser.accessToken;
    } else { return '' }
  };
  return (
    <Router>
       <Switch>
        <Route path="/login">
              <Login />
        </Route>    
          {admin &&
            <>
              <Topbar />
              <div className="container">
                <Sidebar />
              
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route path="/users">
                    <UserList />
                  </Route>
                  <Route path="/user/:userId">
                    <User />
                  </Route>
                  <Route path="/newUser">
                    <NewUser />
                  </Route>
                  <Route path="/products">
                    <ProductList />
                  </Route>
                  <Route path="/product/:productId">
                    <Product />
                  </Route>
                  <Route path="/newproduct">
                    <NewProduct />
                  </Route>          

                  <Route path="/photoGallery">
                    <PhotoGallery />
                  </Route>          


                  <Route path="/newProductCategory">
                    <NewProductCat />
                  </Route>   
                  <Route path="/productCategories">
                    <ProductCatList />
                  </Route>


                  <Route path="/designs">
                    <DesignList />
                  </Route>
                  <Route path="/design/:designId">
                    <Design />
                  </Route>
                  <Route path="/newdesign">
                    <NewDesign/>
                  </Route>            
              </div>
            </>
          }
      </Switch>
    </Router>
  );
}

export default App;
