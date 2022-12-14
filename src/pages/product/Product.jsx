import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { productData } from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../RequestMethods";
import { addPhotosFireBase, addProducts, updateProducts } from "../../redux/apiCalls";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import app from "../../firebase"
import { addPhotos, clearXPhotos } from "../../redux/productRedux";

export default function Product() {

  const location = useLocation()
  const productId = location.pathname.split('/')[2];
  const [productStats, setProductStats] = useState([])

  const product = useSelector((state) => state.product.products.find(product => product._id === productId))
  const [prod, setPro] = useState(product)
  const [inputs, setInputs] = useState(product)
  const [file, setFile] = useState(product?.img)
  const [cat, setCat] = useState(product.categories)
  const [subCat, setSubCat] = useState(product.subCategories)
  const [gender, setGender] = useState(product.gender)
  const [color, setColor] = useState(product.color)
  const [size, setSize] = useState(product.size)
  const [salePrice, setSalePrice] = useState(0)

  const extraPhotos = useSelector(state => state.product.extraPhotos)
  const [isMainPhoto, setIsMainPhoto] = useState(false)
  const [isExtraPhotos, setIsExtraPhoto] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const [multiPhotosUpload, setMultiPhotosUpload] = useState([])

  const moPho = ['', '', '', '']
  moPho?.map((pro, idx) => {
    // console.log(product.morePhotos[idx]);
    if (product.morePhotos[idx] == undefined) {
      moPho[idx] = '../photos/proPic.jpeg'
    } else {
      moPho[idx] = product.morePhotos[idx]
    }
  })
  let mainPho = ''
  if (product.img == '') {
    mainPho = '../photos/proPic.jpeg'
  } else {
    mainPho = product.img
  }

  const [mainPhoto, setMainPhoto] = useState(mainPho)
  const [mainPreviewFile, setMainPreviewFile] = useState(mainPho)

  const [multiPhotos, setMultiPhotos] = useState(moPho)
  const [previewFiles, setPreviewFiles] = useState(moPho)

  const [wholeSalePrice1, setWholeSalePrice1] = useState(0)
  const [wholeSaleQuantity1, setWholeSaleQuantity1] = useState(0)
  const [wholeSalePrice2, setWholeSalePrice2] = useState(0)
  const [wholeSaleQuantity2, setWholeSaleQuantity2] = useState(0)
  const [wholeSalePrice3, setWholeSalePrice3] = useState(0)
  const [wholeSaleQuantity3, setWholeSaleQuantity3] = useState(0)

  const [wholeSaleToggle, setWholeSaleToggle] = useState(product?.isWholeSaleItem)
  const [saleToggle, setSaleToggle] = useState(product?.onSale)

  let photos = []
  const dispatch = useDispatch()


  const handleChange = (e) => {
    setPro(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleWholeSaleDiv = (e) => {
    if (e.target.value) {
      setWholeSaleToggle(!wholeSaleToggle)
      setInputs(prev => {
        return { ...prev, [e.target.name]: e.target.value }
      })
    } else {
      setWholeSaleToggle(!wholeSaleToggle)
      setInputs(prev => {
        return { ...prev, [e.target.name]: e.target.value }
      })
    }
  }
  const handleOnSale = (e) => {
    if (e.target.value) {
      setSaleToggle(!saleToggle)
      setInputs(prev => {
        return { ...prev, [e.target.name]: e.target.value }
      })
    } else {
      setSaleToggle(!saleToggle)
      setInputs(prev => {
        return { ...prev, [e.target.name]: e.target.value }
      })
    }
  }




  const handleGender = (e) => {
    try {
      if (!gender.includes(e.target.value)) {

        return (
          setGender(gender => [...gender, e.target.value]))
      } else if (gender.includes(e.target.value)) {
        return (
          gender?.map((c, index) => {

            console.log('here');
            if (c === e.target.value && !e.target.checked) {
              console.log('found');
              gender.splice(index, 1)
              setGender(gender)
            }
          }))
      }
    } catch (error) {
      console.log(error);
    }

    console.log(gender);
  }

  const handleSubCat = (e) => {
    try {
      if (!subCat.includes(e.target.value)) {
        return (
          setSubCat(subCat => [...subCat, e.target.value]))
      } else if (subCat.includes(e.target.value)) {
        return (
          subCat?.map((c, index) => {
            console.log('here');
            if (c === e.target.value && !e.target.checked) {
              console.log('found');
              subCat.splice(index, 1)
              setSubCat(subCat)
            }
          }))
      }
    } catch (error) {
      console.log(error);
    }

    console.log(subCat);
  }



  const handleCat = (e) => {
    try {
      if (!cat.includes(e.target.value)) {
        return (
          setCat(cat => [...cat, e.target.value]))
      } else if (cat.includes(e.target.value)) {
        return (
          cat?.map((c, index) => {
            console.log('here');
            if (c === e.target.value && !e.target.checked) {
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

  const handleColor = (e) => {
    try {
      if (!color.includes(e.target.value)) {
        return (
          setColor(color => [...color, e.target.value]))
      } else if (color.includes(e.target.value)) {
        return (
          color?.map((c, index) => {
            console.log('here');
            if (c === e.target.value && !e.target.checked) {
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

  const handleSize = (e) => {
    try {
      if (!size.includes(e.target.value)) {
        return (
          setSize(size => [...size, e.target.value]))
      } else if (size.includes(e.target.value)) {
        return (
          size.map((c, index) => {
            console.log('here');
            if (c === e.target.value && !e.target.checked) {
              console.log('found');
              size.splice(index, 1)
              setSize(size)
            }
          }))
      }
    } catch (error) {
      console.log(error);
    }

    console.log(size);
  }


  const handleWholeSaleQuantity1 = (e) => {
    try {
      setWholeSaleQuantity1(e.target.value)
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
      setWholeSaleQuantity2(e.target.value)
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
      setWholeSaleQuantity3(e.target.value)
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


  const handleMainPhoto = (e) => {
    setIsMainPhoto(true)
    // console.log(e);
    let newMain = mainPho
    newMain = e
    let mainPre = mainPreviewFile
    mainPre = URL.createObjectURL(e)
    // console.log(newMain);
    // console.log(mainPre);
    setMainPhoto(newMain)
    setMainPreviewFile(mainPre)
  }

  // console.log(previewFiles);
  const handlePhotos = (e, idx) => {
    setIsExtraPhoto(true)
    let newMulti = multiPhotos.slice()
    newMulti[idx] = e
    let newPre = previewFiles.slice()
    newPre[idx] = URL.createObjectURL(e)
    // console.log(newPre[idx]);
    setMultiPhotos(newMulti)
    setPreviewFiles(newPre)
  }



  const storage = getStorage();

  const clearPhotos = async (e) => {
    e.preventDefault()

    // // Create a reference to the file to delete
    // const desertRef = ref(storage, 'images/desert.jpg');

    // // Delete the file
    // deleteObject(desertRef).then(() => {
    //   // File deleted successfully
    // }).catch((error) => {
    //   // Uh-oh, an error occurred!
    // });

    const pro = {
      ...inputs, img: '', morePhotos: [], salePrice: salePrice, categories: cat, color, size, gender, subCategories: subCat,
      wholeSaleTier1: { wholeSaleQuantity1: wholeSaleQuantity1, wholePrice1: wholeSalePrice1 },
      wholeSaleTier2: { wholeSaleQuantity2: wholeSaleQuantity2, wholePrice2: wholeSalePrice2 },
      wholeSaleTier3: { wholeSaleQuantity3: wholeSaleQuantity3, wholePrice3: wholeSalePrice3 }
    };
    await updateProducts(pro._id, pro, dispatch)
  }


  const handleUpdate = async (photos) => {
    let photoUpload = []
    if (multiPhotosUpload.length <= 0) {
      photoUpload = extraPhotos
    } else if (multiPhotosUpload.length > 0) {
      photoUpload = extraPhotos
    }
    const pro = {
      ...inputs, img: file, morePhotos: photoUpload, salePrice: salePrice, categories: cat, color, size, gender, subCategories: subCat,
      wholeSaleTier1: { wholeSaleQuantity1: wholeSaleQuantity1, wholePrice1: wholeSalePrice1 },
      wholeSaleTier2: { wholeSaleQuantity2: wholeSaleQuantity2, wholePrice2: wholeSalePrice2 },
      wholeSaleTier3: { wholeSaleQuantity3: wholeSaleQuantity3, wholePrice3: wholeSalePrice3 }
    };
    try {
      console.log("input insde update");
      console.log(photoUpload);
      console.log(extraPhotos);


      // console.log(inputs);
      await updateProducts(pro._id, pro, dispatch)

    } catch (error) {
      console.log(error);
    }
    console.log("Finished update");
    dispatch(clearXPhotos())
  }

  const handleAll = async (e) => {
    e.preventDefault()
    const pro = {
      ...inputs, categories: cat, color, size, gender, subCategories: subCat,
      wholeSaleTier1: { wholeSaleQuantity1: wholeSaleQuantity1, wholePrice1: wholeSalePrice1 },
      wholeSaleTier2: { wholeSaleQuantity2: wholeSaleQuantity2, wholePrice2: wholeSalePrice2 },
      wholeSaleTier3: { wholeSaleQuantity3: wholeSaleQuantity3, wholePrice3: wholeSalePrice3 }
    };
    console.log("running upload");
    // await upLoadPhoto()
    await addPhotosFireBase(multiPhotos, mainPhoto, pro, isMainPhoto, isExtraPhotos, dispatch)
  }

  // const MONTHS = useMemo(
  //   () => [
  //     'Jan',
  //     'Feb',
  //     'Mar',
  //     'Apr',
  //     'May',
  //     'Jun',
  //     'Jul',
  //     'Aug',
  //     'Sep',
  //     'Oct',
  //     'Nov',
  //     'Dec',
  //   ],
  //   [])

  // useEffect(() => {
  //   const getStats = async () => {
  //     try {
  //       const res = await userRequest.get('orders/income?pid=' + productId)
  //       const list = res.data.sort((a, b) => {
  //         return a._id - b._id
  //       })
  //       list.map((item) =>
  //         setProductStats((prev) => [
  //           ...prev,
  //           { name: MONTHS[item._id - 1], Sales: item.total },
  //         ])
  //       )
  //     } catch (error) { }
  //   }
  //   getStats()
  // }, [MONTHS])

  useEffect(() => {
    const cleanPhoto = async () => {
      dispatch(clearXPhotos())
    }
    cleanPhoto()
  }, [])
  useEffect(() => {
    const GetPhoto = async () => {
      // console.log("/In useEffect");
    }
    GetPhoto()
  }, [dispatch])
  //  console.log(product.gender.includes('men'));     
  //  console.log(wholeSaleToggle); 

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
          <Chart data={productStats} dataKey="Sales" title="Sales Performance" />
        </div>

        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={mainPreviewFile} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">{product._id}</span>
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
              <span className="productInfoValue">{product.inStock}</span>
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
                <input type="file" id="file" onChange={e => handleMainPhoto(e.target.files[0])} />
              </div>
              <div className="productUpload">
                <img className="productPic" src={mainPreviewFile} />
                <label htmlFor="file">
                  <Publish />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div >
            </div>



            <div className="morePhotosContainer">
              {previewFiles.map((pho, idx) => (
                <div className="extraPhotosBox" key={idx}>
                  <input type="file" id="file" onChange={e => handlePhotos(e.target.files[0], idx)} />
                  <img className="extraPhoto" src={pho} />
                </div>
              ))
              }
              <button onClick={clearPhotos}>Clear photos</button>
            </div>



            <div className=" wholeSalePair">
              <div className="addProductItem">
                <label>Title</label>
                <input name='title' type="text" defaultValue={product.title} onChange={handleChange} />
              </div>
              <div className="addProductItem">
                <label>Price</label>
                <input name='price' type="number" defaultValue={product.price} onChange={handleChange} />
              </div>
            </div>
            <div className=" wholeSalePair">
              <div className="addProductItem">
                <label>On Sale?</label>
                <select name='onSale' defaultValue={product.onSale} onChange={handleOnSale} >
                  <option value='true'>Yes</option>
                  <option value='false'>No</option>
                </select>
              </div>

              <div className="addProductItem" >
                <label >Sale Price</label>
                <input style={{ width: saleToggle ? '40%' : '0%' }} disabled={!saleToggle}
                  name='salePrice'
                  type="number" 
                  defaultValue={product.salePrice} 
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className=" wholeSalePair">
              <div className="addProductItem">
                <label>Can be printed on?</label>
                <select name='isPrintItem' defaultValue={product.isPrintItem} onChange={handleChange} >
                  <option value='true'>Yes</option>
                  <option value='false'>No</option>
                </select>
              </div>
            </div>
            <div className=" wholeSaleDiv" style={{ height: wholeSaleToggle ? '226px' : '50px' }}>
              <div className="wholeSaleItem">
                <label>Is this a WholeSale Item?</label>
                <select name='isWholeSaleItem' defaultValue={product.isWholeSaleItem} onChange={handleWholeSaleDiv} >
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
            <textarea name='desc' className='txtArea' rows="4" cols="50" defaultValue={product.desc} onChange={handleChange}></textarea>
            <div className=" wholeSalePair">
              <div className="catDivs">
                <label>Gender</label>
                <ul className="checkbox-grids" name='gender' onChange={handleGender}>
                  <li><input type="checkbox" name='gender' value="boys" defaultChecked={product.gender.includes('boys')} /><label htmlFor="text1">Boys</label></li>
                  <li><input type="checkbox" name='gender' value="girls" defaultChecked={product.gender.includes('girls')} /><label htmlFor="text1">Girls</label></li>
                  <li><input type="checkbox" name='gender' value="ladies" defaultChecked={product.gender.includes('ladies')} /><label htmlFor="text2">Women</label></li>
                  <li><input type="checkbox" name='gender' value="men" defaultChecked={product.gender.includes('men')} /><label htmlFor="text3">Men</label></li>
                  <li><input type="checkbox" name='gender' value="unisex" defaultChecked={product.gender.includes('unisex')} /><label htmlFor="text3">Unisex</label></li>
                </ul>
              </div>
              <div className="catDivs">
                <label>Category</label>
                <ul className="checkbox-grids" name='categories' onChange={handleCat}>
                  <li><input type="checkbox" name="categories" value="tops" defaultChecked={product.categories.includes('tops')} /><label htmlFor="text1">Top</label></li>
                  <li><input type="checkbox" name="categories" value="bottoms" defaultChecked={product.categories.includes('bottoms')} /><label htmlFor="text2">Bottom</label></li>
                  <li><input type="checkbox" name="categories" value="sets" defaultChecked={product.categories.includes('sets')} /><label htmlFor="text3">Sets</label></li>
                  <li><input type="checkbox" name="categories" value="jewlery" defaultChecked={product.categories.includes('jewelry')} /><label htmlFor="text6">Jewlery</label></li>
                  <li><input type="checkbox" name="categories" value="sale" defaultChecked={product.categories.includes('sale')} /><label htmlFor="text7">Sale</label></li>
                  <li><input type="checkbox" name="categories" value="other" defaultChecked={product.categories.includes('other')} /><label htmlFor="text8">Other</label></li>
                </ul>
              </div>
            </div>
            <div className="catDivs">
              <label>Sub-Category</label>
              <ul className="checkbox-grids" name='subCategories' onChange={handleSubCat}>
                <li><input type="checkbox" name="subCategories" value="graphic tshirts" defaultChecked={product.subCategories.includes('graphic tshirts')} /><label htmlFor="text7">Graphic TShirt</label></li>
                <li><input type="checkbox" name="subCategories" value="short sleeve shirts" defaultChecked={product.subCategories.includes('short sleeve shirts')} /><label htmlFor="text1">Short Sleeve Shirt</label></li>
                <li><input type="checkbox" name="subCategories" value="long sleeve shirts" defaultChecked={product.subCategories.includes('long sleeve shirts')} /><label htmlFor="text2">Long Sleeve Shirt</label></li>
                <li><input type="checkbox" name="subCategories" value="sweaters" defaultChecked={product.subCategories.includes('sweaters')} /><label htmlFor="text3">Sweater</label></li>
                <li><input type="checkbox" name="subCategories" value="hoodies" defaultChecked={product.subCategories.includes('hoodies')} /><label htmlFor="text4">Hoodies</label></li>
                <li><input type="checkbox" name="subCategories" value="shorts" defaultChecked={product.subCategories.includes('shorts')} /><label htmlFor="text5">Shorts</label></li>
                <li><input type="checkbox" name="subCategories" value="pants" defaultChecked={product.subCategories.includes('pants')} /><label htmlFor="text6">Pants</label></li>
                <li><input type="checkbox" name="subCategories" value="jeans" defaultChecked={product.subCategories.includes('jeans')} /><label htmlFor="text7">Jeans</label></li>
                <li><input type="checkbox" name="subCategories" value="sweats" defaultChecked={product.subCategories.includes('sweats')} /><label htmlFor="text7">Sweat Pants</label></li>
                <li><input type="checkbox" name="subCategories" value="leggings" defaultChecked={product.subCategories.includes('leggings')} /><label htmlFor="text7">Leggings</label></li>
                <li><input type="checkbox" name="subCategories" value="rompers" defaultChecked={product.subCategories.includes('rompers')} /><label htmlFor="text8">Rompers</label></li>
                <li><input type="checkbox" name="subCategories" value="pajamas" defaultChecked={product.subCategories.includes('pajamas')} /><label htmlFor="text6">Pajamas</label></li>
                <li><input type="checkbox" name="subCategories" value="sweatsuits" defaultChecked={product.subCategories.includes('sweatsuits')} /><label htmlFor="text7">Sweatsuits</label></li>
                <li><input type="checkbox" name="subCategories" value="necklaces" defaultChecked={product.subCategories.includes('necklaces')} /><label htmlFor="text8">Necklace</label></li>
                <li><input type="checkbox" name="subCategories" value="bracelets" defaultChecked={product.subCategories.includes('bracelets')} /><label htmlFor="text6">Braclete</label></li>
                <li><input type="checkbox" name="subCategories" value="rings" defaultChecked={product.subCategories.includes('rings')} /><label htmlFor="text7">Ring</label></li>
                <li><input type="checkbox" name="subCategories" value="other" defaultChecked={product.subCategories.includes('other')} /><label htmlFor="text8">Other</label></li>
              </ul>
            </div>
            <div className="catDivs">
              <label>Color</label>
              <ul className="checkbox-grids" name='color' onChange={handleColor}>
                <li><input type="checkbox" name="color" value="black" defaultChecked={product.color.includes('black')} /><label htmlFor="text1">Black</label></li>
                <li><input type="checkbox" name="color" value="white" defaultChecked={product.color.includes('white')} /><label htmlFor="text2">White</label></li>
                <li><input type="checkbox" name="color" value="red" defaultChecked={product.color.includes('red')} /><label htmlFor="text3">Red</label></li>
                <li><input type="checkbox" name="color" value="blue" defaultChecked={product.color.includes('blue')} /><label htmlFor="text4">Blue</label></li>
                <li><input type="checkbox" name="color" value="yellow" defaultChecked={product.color.includes('yellow')} /><label htmlFor="text5">Yellow</label></li>
                <li><input type="checkbox" name="color" value="green" defaultChecked={product.color.includes('green')} /><label htmlFor="text6">Green</label></li>
                <li><input type="checkbox" name="color" value="pink" defaultChecked={product.color.includes('pink')} /><label htmlFor="text7">Pink</label></li>
                <li><input type="checkbox" name="color" value="other" defaultChecked={product.color.includes('other')} /><label htmlFor="text8">Other</label></li>
              </ul>
            </div>
            <div className="catDivs">
              <label>Size</label>
              <ul className="checkbox-grids" name='size' onChange={handleSize}>
                <li><input type="checkbox" name="size" value="XS" defaultChecked={product.size.includes('XS')} /><label htmlFor="text1">XS</label></li>
                <li><input type="checkbox" name="size" value="S" defaultChecked={product.size.includes('S')} /><label htmlFor="text2">S</label></li>
                <li><input type="checkbox" name="size" value="M" defaultChecked={product.size.includes('M')} /><label htmlFor="text3">M</label></li>
                <li><input type="checkbox" name="size" value="L" defaultChecked={product.size.includes('L')} /><label htmlFor="text4">L</label></li>
                <li><input type="checkbox" name="size" value="XL" defaultChecked={product.size.includes('XL')} /><label htmlFor="text5">XL</label></li>
                <li><input type="checkbox" name="size" value="XXL" defaultChecked={product.size.includes('XXL')} /><label htmlFor="text6">XXL</label></li>
                <li><input type="checkbox" name="size" value="XXXL" defaultChecked={product.size.includes('XXXL')} /><label htmlFor="text7">XXXL</label></li>
                <li><input type="checkbox" name="size" value="other" defaultChecked={product.size.includes('other')} /><label htmlFor="text8">Other</label></li>
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
                <input name='inventory' type="number" defaultValue={product.inventory} onChange={handleChange} />
              </div>
            </div>
            <button className="productButton" onClick={handleAll}>Update</button >
          </div>


        </form>
      </div>
    </div>
  );
}
