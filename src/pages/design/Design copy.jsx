import { Link } from "react-router-dom";
import "./design.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../RequestMethods";

export default function Design() {

    const designId = location.pathname.split('/')[2];
    const [designStats, setDesignStats] = useState([])

    const design = useSelector((state) => 
        state.design.designs.find(design => design._id === designId) )

    const MONTHS = useMemo(
        () => [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        [])

        useEffect(() => {
            const getStats = async () => {
              try {
                const res = await userRequest.get('orders/income?pid=' + designId)
                const list = res.data.sort((a,b) => {
                    return a._id - b._id
                })
                list.map((item)=>
                  setDesignStats((prev)=>[
                    ...prev, 
                    {name:MONTHS[item._id - 1], Sales: item.total},
                  ])
                )
              } catch (error) {}
            }
            getStats()
          },[MONTHS])
          
         

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={designStats} dataKey="Sales" title="Sales Performance"/>
          </div>
          
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={design.img} alt="" className="productInfoImg" />
                  <span className="productName">{design.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">{design._id}</span>
                      <span className="productInfoValue">123</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue">5123</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">active:</span>
                      <span className="productInfoValue">yes</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue">{design.inStock}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Design Name</label>
                  <input type="text" placeholder={design.title} />
                  <label>Design Description</label>
                  <input type="text" placeholder={design.desc} />
                  <label>Design Price</label>
                  <input type="text" placeholder={design.price} />
                  <label>In Stock</label>
                  <select name="inStock" id="idStock">
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                  </select>                  
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={design.img} />
                      <label htmlFor="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="productButton">Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
