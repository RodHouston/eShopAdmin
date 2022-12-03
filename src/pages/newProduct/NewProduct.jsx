import { useEffect, useState } from "react";
import "./newProduct.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase"
import { useDispatch } from "react-redux";
import {addProducts} from '../../redux/apiCalls'



export default function NewProduct() {
  const [inputs, setInputs] = useState({})
  const [file, setFile] = useState([])
  const [multiFiles, setMultiFile] = useState([])
  const [previewFile, setPreviewFile] = useState(null)
  const [cat, setCat] = useState([])
  const [subCat, setSubCat] = useState([])
  const [gender, setGender] = useState([])
  const [color, setColor] = useState([] )
  const [size, setSize] = useState([])
  const [salePrice, setSalePrice] = useState(0)

  const [wholeSalePrice1, setWholeSalePrice1] = useState(0)
  const [wholeSaleQuantity1, setWholeSaleQuantity1] = useState(0)
  const [wholeSalePrice2, setWholeSalePrice2] = useState(0)
  const [wholeSaleQuantity2, setWholeSaleQuantity2] = useState(0)
  const [wholeSalePrice3, setWholeSalePrice3] = useState(0)
  const [wholeSaleQuantity3, setWholeSaleQuantity3] = useState(0)

  const [wholeSaleToggle, setWholeSaleToggle] = useState(false)
  const [saleToggle, setSaleToggle] = useState(false)



  const dispatch = useDispatch()

  const handleChange =(e) => {
    setInputs(prev=>{
      return {...prev, [e.target.name]: e.target.value}
    })
  }


  const handleGender = (e) => {        
    if(!gender.includes(e.target.value)){
      setGender(gender =>  [...gender, e.target.value])
    }else if(gender.includes(e.target.value)){
      gender.map((c, index) => {
        console.log('here');
        if(c === e.target.value && !e.target.checked){
          console.log('found');
          gender.splice(index, 1)          
          setGender(gender)     
       }
      })
    }
    console.log(gender);
  }

  const handleSubCat = (e) => {        
    if(!subCat.includes(e.target.value)){
      setSubCat(subCat =>  [...subCat, e.target.value])
    }else if(subCat.includes(e.target.value)){
      subCat.map((c, index) => {
        console.log('here');
        if(c === e.target.value && !e.target.checked){
          console.log('found');
          subCat.splice(index, 1)          
          setSubCat(subCat)     
       }
      })
    }
    console.log(subCat);
  }
  const handleCat = (e) => {        
    if(!cat.includes(e.target.value)){
      setCat(cat =>  [...cat, e.target.value])
    }else if(cat.includes(e.target.value)){
      cat.map((c, index) => {
        console.log('here');
        if(c === e.target.value && !e.target.checked){
          console.log('found');
          cat.splice(index, 1)          
          setCat(cat)     
       }
      })
    }
    console.log(cat);
  }

  const handleColor = (e) => {
    if(!color.includes(e.target.value)){
      setColor(color =>  [...color, e.target.value])
    }else if(color.includes(e.target.value)){
      color.map((c, index) => {
        console.log('here');
        if(c === e.target.value && !e.target.checked){
          console.log('found');
          color.splice(index, 1)          
          setColor(color)     
       }
      })
    }
    console.log(color);
  }

  const handleSize = (e) => {
    if(!size.includes(e.target.value)){
      setSize(size =>  [...size, e.target.value])
    }else if(size.includes(e.target.value)){
      size.map((c, index) => {
        console.log('here');
        if(c === e.target.value && !e.target.checked){
          console.log('found');
          size.splice(index, 1)          
          setSize(size)     
       }
      })
    }
    // console.log(size);
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


  const handlePhoto = (e) => {
    console.log("here");
   setFile(e.target.files[0])
   setPreviewFile(URL.createObjectURL(e.target.files[0]))
  }
  // const handleSize = (e) => {
  //   setSize(e.target.value.split(','))
  // }
  // console.log(file);


  const handleClick = (e) => {
    e.preventDefault()

    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app)
    const StorageRef = ref(storage, fileName)
 
   const uploadTask = uploadBytesResumable(StorageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...

    let multiPhotos = []
    if(file.length ==1){
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // console.log('File available at', downloadURL);
        multiPhotos.push(downloadURL)
      });
    }else if(file.length > 1){
      file.map((file => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log('File available at', downloadURL);
          multiPhotos.push(downloadURL)
        });
      }))
     
    }
  


    const product = {...inputs, img: file, morePhotos: multiPhotos, salePrice: salePrice, categories: cat, color, size, gender, subCategories: subCat, 
      wholeSaleTier1: {wholeSaleQuantity1: wholeSaleQuantity1, wholePrice1: wholeSalePrice1},
      wholeSaleTier2: {wholeSaleQuantity2: wholeSaleQuantity2, wholePrice2: wholeSalePrice2},
      wholeSaleTier3: {wholeSaleQuantity3: wholeSaleQuantity3, wholePrice3: wholeSalePrice3}};
    console.log(product);
    addProducts(product, dispatch)
  }
);
}

useEffect(() => {
  
}, [cat]);

  
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="productFormLeft">
          <div className="addProductItem">
            <label>Image</label>
              <div className="productUpload">
                <img className="productPic"  src={previewFile} />
              </div>
            <input type="file" id="file" onChange={handlePhoto} accept="image/png, image/jpeg" />
          </div>
          <div className=" wholeSalePair">
                  <div className="addProductItem">
                    <label>Title</label>
                    <input name='title' type="text"  onChange={handleChange} />
                  </div>              
                  <div className="addProductItem">
                    <label>Price</label>
                    <input name='price' type="number"  onChange={handleChange} />
                  </div>
                </div>
                <div className=" wholeSalePair">
                  <div className="addProductItem">
                    <label>On Sale?</label>
                    <select name='onSale'defaultValue={false} onChange={handleOnSale} >
                      <option value='true'>Yes</option>
                      <option value='false'>No</option>
                    </select>
                  </div>   

                  <div className="addProductItem" >
                    <label >Sale Price</label>
                    <input style={{width: saleToggle ? '40%': '0%'}} disabled={!saleToggle} name='salePrice' defaultValue={0}  type="number"  onChange={(e)=> setSalePrice(e.target.value)} />
                  </div>
                </div>
                <div className=" wholeSalePair">
                  <div className="addProductItem">
                    <label>Can be printed on?</label>
                    <select name='isPrintItem'defaultValue={false} onChange={handleChange} >
                      <option value='true'>Yes</option>
                      <option value='false'>No</option>
                    </select>
                  </div>  
                </div>  
                <div className=" wholeSaleDiv" style={{height: wholeSaleToggle ? '226px': '50px'}}>
                  <div className="wholeSaleItem">
                    <label>Is this a WholeSale Item?</label>
                    <select name='isWholeSaleItem' defaultValue={false} onChange={handleWholeSaleDiv} >
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
          <div className="catDivs">
            <label>Description</label>
            <textarea name='desc' className= 'txtArea' rows="4" cols="50"  onChange={handleChange}></textarea>
          </div>       
          <div className=" wholeSalePair">
            <div className="catDivs">
              <label>Gender</label>         
                <ul className="checkbox-grids" name='gender' onChange={handleGender}>
                  <li><input type="checkbox" name='gender' value="boys" /><label htmlFor="text1">Boys</label></li>
                  <li><input type="checkbox" name='gender' value="girls" /><label htmlFor="text1">Girls</label></li>
                  <li><input type="checkbox" name='gender' value="women" /><label htmlFor="text2">Women</label></li>
                  <li><input type="checkbox" name='gender' value="men" /><label htmlFor="text3">Men</label></li>             
                  <li><input type="checkbox" name='gender' value="unisex" /><label htmlFor="text3">Unisex</label></li>             
              </ul>          
            </div>        
            <div className="catDivs">
              <label>Category</label>         
                <ul className="checkbox-grids" name='categories' onChange={handleCat}>
                  <li><input type="checkbox" name="categories" value="tops" /><label htmlFor="text1">Top</label></li>
                  <li><input type="checkbox" name="categories" value="bottoms" /><label htmlFor="text2">Bottom</label></li>
                  <li><input type="checkbox" name="categories" value="sets" /><label htmlFor="text3">Sets</label></li>              
                  <li><input type="checkbox" name="categories" value="jewlery" /><label htmlFor="text6">Jewlery</label></li>              
                  <li><input type="checkbox" name="categories" value="sale" /><label htmlFor="text7">Sale</label></li>
                  <li><input type="checkbox" name="categories" value="other" /><label htmlFor="text8">Other</label></li>
              </ul>          
            </div>        
          </div>        
          <div className="catDivs">
            <label>Sub-Category</label>         
              <ul className="checkbox-grids" name='subCategories' onChange={handleSubCat}>
                <li><input type="checkbox" name="subCategories" value="graphic tshirts" /><label htmlFor="text7">Graphic TShirt</label></li>
                <li><input type="checkbox" name="subCategories" value="short sleeve shirts" /><label htmlFor="text1">Short Sleeve Shirt</label></li>
                <li><input type="checkbox" name="subCategories" value="long sleeve shirts" /><label htmlFor="text2">Long Sleeve Shirt</label></li>
                <li><input type="checkbox" name="subCategories" value="sweaters" /><label htmlFor="text3">Sweater</label></li>
                <li><input type="checkbox" name="subCategories" value="hoodies" /><label htmlFor="text4">Hoodies</label></li>
                <li><input type="checkbox" name="subCategories" value="shorts" /><label htmlFor="text5">Shorts</label></li>
                <li><input type="checkbox" name="subCategories" value="pants" /><label htmlFor="text6">Pants</label></li>
                <li><input type="checkbox" name="subCategories" value="jeans" /><label htmlFor="text7">Jeans</label></li>
                <li><input type="checkbox" name="subCategories" value="sweats" /><label htmlFor="text7">Sweat Pants</label></li>
                <li><input type="checkbox" name="subCategories" value="leggings" /><label htmlFor="text7">Leggings</label></li>
                <li><input type="checkbox" name="subCategories" value="rompers" /><label htmlFor="text8">Rompers</label></li>
                <li><input type="checkbox" name="subCategories" value="pajamas" /><label htmlFor="text6">Pajamas</label></li>
                <li><input type="checkbox" name="subCategories" value="sweatsuits" /><label htmlFor="text7">Sweatsuits</label></li>
                <li><input type="checkbox" name="subCategories" value="necklaces" /><label htmlFor="text8">Necklace</label></li>
                <li><input type="checkbox" name="subCategories" value="bracelets" /><label htmlFor="text6">Braclete</label></li>
                <li><input type="checkbox" name="subCategories" value="rings" /><label htmlFor="text7">Ring</label></li>
                <li><input type="checkbox" name="subCategories" value="other" /><label htmlFor="text8">Other</label></li>
            </ul>          
          </div>        
          <div className=" wholeSalePair">
            <div className="catDivs">
              <label>Color</label>         
                <ul className="checkbox-grids" name='color' onChange={handleColor}>
                  <li><input type="checkbox" name="color" value="black" /><label htmlFor="text1">Black</label></li>
                  <li><input type="checkbox" name="color" value="white" /><label htmlFor="text2">White</label></li>
                  <li><input type="checkbox" name="color" value="red" /><label htmlFor="text3">Red</label></li>
                  <li><input type="checkbox" name="color" value="blue" /><label htmlFor="text4">Blue</label></li>
                  <li><input type="checkbox" name="color" value="yellow" /><label htmlFor="text5">Yellow</label></li>
                  <li><input type="checkbox" name="color" value="green" /><label htmlFor="text6">Green</label></li>
                  <li><input type="checkbox" name="color" value="pink" /><label htmlFor="text7">Pink</label></li>
                  <li><input type="checkbox" name="color" value="other" /><label htmlFor="text8">Other</label></li>
              </ul>          
            </div>       
            <div className="catDivs">
              <label>Size</label>         
                <ul className="checkbox-grids" name='size' onChange={handleSize}>
                  <li><input type="checkbox" name="size" value="XS" /><label htmlFor="text1">XS</label></li>
                  <li><input type="checkbox" name="size" value="S" /><label htmlFor="text2">S</label></li>
                  <li><input type="checkbox" name="size" value="M" /><label htmlFor="text3">M</label></li>
                  <li><input type="checkbox" name="size" value="L" /><label htmlFor="text4">L</label></li>
                  <li><input type="checkbox" name="size" value="XL" /><label htmlFor="text5">XL</label></li>
                  <li><input type="checkbox" name="size" value="XXL" /><label htmlFor="text6">XXL</label></li>
                  <li><input type="checkbox" name="size" value="XXXL" /><label htmlFor="text7">XXXL</label></li>
                  <li><input type="checkbox" name="size" value="other" /><label htmlFor="text8">Other</label></li>
              </ul>          
            </div>
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
              <input name='inventory' type="number" defaultValue={1} onChange={handleChange} />
            </div> 
          </div>       
          <button onClick={handleClick} className="addProductButton">Create</button>
          </div>  
      </form>
    </div>
  );
}
