import { Link } from "react-router-dom";
import "./design.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../RequestMethods";
import { updateDesigns } from "../../redux/apiCalls";

export default function Design() {

    const location = useLocation()
    const designId = location.pathname.split('/')[2];

    const design = useSelector((state) => 
        state.design.designs.find(design => design._id === designId) )
    const [designStats, setDesignStats] = useState([])

    const [inputs, setInputs] = useState(design)
    const [file, setFile] = useState(design.img)
    const [cat, setCat] = useState(design.categories)
    const [color, setColor] = useState(design.color)
    const [wholeSalePrice1, setWholeSalePrice1] = useState(design.wholeSalePrice1)
    const [wholeSaleQuantity1, setWholeSaleQuantity1] = useState(design.wholeSaleQuantity1)
    const [wholeSalePrice2, setWholeSalePrice2] = useState(design.wholeSalePrice2)
    const [wholeSaleQuantity2, setWholeSaleQuantity2] = useState(design.wholeSaleQuantity2)
    const [wholeSalePrice3, setWholeSalePrice3] = useState(design.wholeSalePrice3)
    const [wholeSaleQuantity3, setWholeSaleQuantity3] = useState(design.wholeSaleQuantity3)

    const [wholeSaleToggle, setWholeSaleToggle] = useState(design.isWholeSaleItem)
    const [saleToggle, setSaleToggle] = useState(design.onSale)



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


        const dispatch = useDispatch()

        const handleChange =(e) => {
          setInputs(prev=>{
                       return {...prev, [e.target.name]: e.target.value}
          })
        }

        const handleColor = (e) => {
          try {
            if(!color.includes(e.target.value)){
              return(
              setColor(color =>  [...color, e.target.value]))
            }else if(color.includes(e.target.value)){
              return(
              color?.map((c, index) => {
                console.log('here');
                if(c === e.target.value && !e.target.checked){
                  console.log('found');
                  console.log(color);
                  color.splice(index, 1)          
                  setColor(color)     
               }
              }))
            }
          } catch (error) {
            console.log(error);
          }
          
          console.log(color);
        }
        const handleCat = (e) => {     
          try {
            if(!cat.includes(e.target.value)){
              return(
              setCat(cat =>  [...cat, e.target.value]))
            }else if(cat.includes(e.target.value)){
              return(
              cat?.map((c, index) => {
                console.log('here');
                if(c === e.target.value && !e.target.checked){
                  console.log('found');
                  cat.splice(index, 1)          
                  setCat(cat)     
               }
              }))
            }
          } catch (error) {
            console.log(error);
          }             
          console.log(cat);
        }

        const handleWholeSaleDiv=(e) => {
          if(e.target.value){
            setWholeSaleToggle(!wholeSaleToggle)
            setInputs(prev=>{
              return {...prev, [e.target.name]: e.target.value}
            })            
          }else{
            setWholeSaleToggle(!wholeSaleToggle)
            setInputs(prev=>{
              return {...prev, [e.target.name]: e.target.value}
            })            
          }          
        }
        const handleOnSale=(e) => {
          if(e.target.value){
            setSaleToggle(!saleToggle)
            setInputs(prev=>{
              return {...prev, [e.target.name]: e.target.value}
            })            
          }else{
            setSaleToggle(!saleToggle)
            setInputs(prev=>{
              return {...prev, [e.target.name]: e.target.value}
            })            
          }          
        }
      
        const handleWholeSaleQuantity1 = (e) => {
          try {
            setWholeSaleQuantity1( e.target.value)
          } catch (error) {
            console.log(error);
          }          
          
        }
        const handleWholeSalePrice1 = (e) => {
          try {
            setWholeSalePrice1(e.target.value)
          } catch (error) {
            console.log(error);
          }          
          
        }

        const handleWholeSaleQuantity2 = (e) => {
          try {
            setWholeSaleQuantity2( e.target.value)
          } catch (error) {
            console.log(error);
          }          
          
        }
        const handleWholeSalePrice2 = (e) => {
          try {
            setWholeSalePrice2(e.target.value)
          } catch (error) {
            console.log(error);
          }          
          
        }


        const handleWholeSaleQuantity3 = (e) => {
          try {
            setWholeSaleQuantity3( e.target.value)
          } catch (error) {
            console.log(error);
          }          
          
        }
        const handleWholeSalePrice3 = (e) => {
          try {
            setWholeSalePrice3(e.target.value)
          } catch (error) {
            console.log(error);
          }          
          
        }

        const handleUpdate = async (e) => {
          e.preventDefault()
          console.log('inside update design');
          console.log(inputs);
          try {
            const pro= {...inputs, img: file, categories: cat, 
              wholeSaleTier1: {wholeSaleQuantity1: wholeSaleQuantity1, wholePrice1: wholeSalePrice1},
              wholeSaleTier2: {wholeSaleQuantity2: wholeSaleQuantity2, wholePrice2: wholeSalePrice2},
              wholeSaleTier3: {wholeSaleQuantity3: wholeSaleQuantity3, wholePrice3: wholeSalePrice3}};
            // console.log(pro.wholeSalePrice);
           await updateDesigns(pro._id,pro, dispatch)
          
          } catch (error) {
            console.log(error);
          }          
        }



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
              <div className=" wholeSalePair">
                <div className="addProductItem">
                  <label>Image</label>
                  <input type="file" id="file" onChange={e=>setFile(e.target.files[0])}/>
                </div>
                <div className="productUpload">
                      <img className="productPic"  src={design.img} />
                      <label htmlFor="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                </div>
              <div className=" wholeSalePair">
                <div className="addProductItem">
                  <label>Title</label>
                  <input name='title' type="text" defaultValue={design.title} onChange={handleChange} />
                </div>              
                <div className="addProductItem">
                  <label>Price</label>
                  <input name='price' type="number" defaultValue={design.price} onChange={handleChange} />
                </div>
              </div>
              <div className=" wholeSalePair">
                <div className="addProductItem">
                  <label>On Sale?</label>
                  <select name='onSale'defaultValue={design.onSale} onChange={handleOnSale} >
                    <option value='true'>Yes</option>
                    <option value='false'>No</option>
                  </select>
                </div>   

                <div className="addProductItem" >
                  <label >Sale Price</label>
                  <input style={{width: saleToggle ? '40%': '0%'}} disabled={!saleToggle} name='salePrice'  type="number" defaultValue={design.salePrice} onChange={handleChange} />
                </div>
              </div>

              <div className=" wholeSaleDiv" style={{height: wholeSaleToggle ? '226px': '50px'}}>
                <div className="wholeSaleItem">
                  <label>Is this a WholeSale Item?</label>
                  <select name='isWholeSaleItem' defaultValue={design.isWholeSaleItem} onChange={handleWholeSaleDiv} >
                    <option value='true'>Yes</option>
                    <option value='false'>No</option>
                  </select>
                </div>                   
                <div className=" wholeSalePair">
                  <div className="wholeSaleItem leftInput">
                    <label>WholeSale Tier 1 Quantity</label>
                    <input name='wholeSaleQuantity' type="number" placeholder="3" onChange={handleWholeSaleQuantity1} />
                  </div>
                  <div className='wholesaleText'>for $</div>
                  <div className="wholeSaleItem ">
                    <label>WholeSale Tier 1 Price</label>
                    <input name='wholeSalePrice' type="number" placeholder="8.99" onChange={handleWholeSalePrice1} />
                  </div>
                  <div className='wholesaleText'>each</div>
                </div>
                <div className=" wholeSalePair">
                  <div className="wholeSaleItem leftInput ">
                    <label>WholeSale Tier 2 Quantity</label>
                    <input name='wholeSaleQuantity' type="number" placeholder="6" onChange={handleWholeSaleQuantity2} />
                    </div>
                    <div className='wholesaleText'>for $</div>
                    <div className="wholeSaleItem ">
                    <label>WholeSale Tier 2 Price</label>
                    <input name='wholeSalePrice' type="number" placeholder="6.99" onChange={handleWholeSalePrice2} />
                  </div>
                  <div className='wholesaleText'>each</div>
                </div>
                <div className=" wholeSalePair">
                  <div className="wholeSaleItem leftInput">
                    <label>WholeSale Tier 3 Quantity</label>
                    <input name='wholeSaleQuantity' type="number" placeholder="9" onChange={handleWholeSaleQuantity3} />
                  </div>
                  <div className='wholesaleText'>for $</div>
                  <div className="wholeSaleItem">
                    <label>WholeSale Tier 3 Price</label>
                    <input name='wholeSalePrice' type="number" placeholder="4.99" onChange={handleWholeSalePrice3} />
                  </div>
                  <div className='wholesaleText'>each</div>
                </div>
              </div>              
              <label>Description</label>
              <textarea name='desc' className= 'txtArea' rows="4" cols="50" defaultValue={design.desc} onChange={handleChange}></textarea>
                     
                     
              <div className="catDivs">
                <label>Color</label>         
                  <ul className="checkbox-grids" name='color' onChange={handleColor}>
                    <li><input type="checkbox" name="color" value="black" defaultChecked= {design.color.includes('black')}/><label htmlFor="text1">Black</label></li>
                    <li><input type="checkbox" name="color" value="white" defaultChecked= {design.color.includes('white')} /><label htmlFor="text2">White</label></li>
                    <li><input type="checkbox" name="color" value="red" defaultChecked= {design.color.includes('red')}/><label htmlFor="text3">Red</label></li>
                    <li><input type="checkbox" name="color" value="blue" defaultChecked= {design.color.includes('blue')}/><label htmlFor="text4">Blue</label></li>
                    <li><input type="checkbox" name="color" value="yellow" defaultChecked= {design.color.includes('yellow')}/><label htmlFor="text5">Yellow</label></li>
                    <li><input type="checkbox" name="color" value="green" defaultChecked= {design.color.includes('green')}/><label htmlFor="text6">Green</label></li>
                    <li><input type="checkbox" name="color" value="pink" defaultChecked= {design.color.includes('pink')}/><label htmlFor="text7">Pink</label></li>
                    <li><input type="checkbox" name="color" value="other" defaultChecked= {design.color.includes('other')}/><label htmlFor="text8">Other</label></li>
                </ul>          
              </div>      
              <div className="catDivs">
                <label>Category</label>         
                  <ul className="checkbox-grids" name='categories' onChange={handleCat}>
                    <li><input type="checkbox" name="categories" value="graphic tshirts" defaultChecked= {design.categories?.includes('graphic tshirts')}/><label htmlFor="text7">Graphic TShirt</label></li>
                    <li><input type="checkbox" name="categories" value="weed" defaultChecked= {design.categories?.includes('weed')}/><label htmlFor="text1">Weed</label></li>
                    <li><input type="checkbox" name="categories" value="420" defaultChecked= {design.categories?.includes('420')}/><label htmlFor="text2">420</label></li>
                    <li><input type="checkbox" name="categories" value="anime" defaultChecked= {design.categories?.includes('anime')}/><label htmlFor="text3">Anime</label></li>
                    <li><input type="checkbox" name="categories" value="cartoon" defaultChecked= {design.categories?.includes('cartoon')}/><label htmlFor="text4">Cartoon</label></li>
                    <li><input type="checkbox" name="categories" value="sports" defaultChecked= {design.categories?.includes('sports')}/><label htmlFor="text5">Sports</label></li>
                    <li><input type="checkbox" name="categories" value="music" defaultChecked= {design.categories?.includes('music')}/><label htmlFor="text6">Music</label></li>
                    <li><input type="checkbox" name="categories" value="text" defaultChecked= {design.categories?.includes('text')}/><label htmlFor="text7">Text</label></li>
                    <li><input type="checkbox" name="categories" value="messege" defaultChecked= {design.categories?.includes('messege')}/><label htmlFor="text7">Messege</label></li>
                    <li><input type="checkbox" name="categories" value="rick and morty" defaultChecked= {design.categories?.includes('rick and morty')}/><label htmlFor="text7">Rick and Morty</label></li>
                    <li><input type="checkbox" name="categories" value="love" defaultChecked= {design.categories?.includes('love')}/><label htmlFor="text8">Love</label></li>
                    <li><input type="checkbox" name="categories" value="supreme" defaultChecked= {design.categories?.includes('supreme')}/><label htmlFor="text6">Supreme</label></li>
                    <li><input type="checkbox" name="categories" value="princess" defaultChecked= {design.categories?.includes('princess')}/><label htmlFor="text7">Princess</label></li>
                    <li><input type="checkbox" name="categories" value="flowers" defaultChecked= {design.categories?.includes('flowers')}/><label htmlFor="text8">Flowers</label></li>
                    <li><input type="checkbox" name="categories" value="fun" defaultChecked= {design.categories?.includes('fun')}/><label htmlFor="text6">Fun</label></li>
                    <li><input type="checkbox" name="categories" value="amoung us" defaultChecked= {design.categories?.includes('amoung us')} /><label htmlFor="text7">Among Us</label></li>
                    <li><input type="checkbox" name="categories" value="other" defaultChecked= {design.categories?.includes('other')}/><label htmlFor="text8">Other</label></li>
                </ul>          
              </div>        
             
              <div className=" wholeSalePair">
              <div className="addProductItem">
                <label>Stock</label>
                <select name='inStock' onChange={handleChange} >
                  <option value='true'>Yes</option>
                  <option value='false'>No</option>
                </select>
              </div>    
              <div className="addProductItem">
                  <label>Inventory Count</label>
                  <input name='inventory' type="number" defaultValue={design.inventory} onChange={handleChange} />
              </div>
              
            </div>
              <button className="productButton" onClick={handleUpdate}>Update</button >             
            </div>
            
            
           
          </form>
          
      </div>
    </div>
  );
}
