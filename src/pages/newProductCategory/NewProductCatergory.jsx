import { Link } from "react-router-dom";
import "./newProductCategory.css";
import Chart from "../../components/chart/Chart"
import { productData } from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../RequestMethods";
import { addPhotosFireBase, addProductCatergory, addProducts, updateProducts } from "../../redux/apiCalls";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import app from "../../firebase"
import { addPhotos, clearXPhotos } from "../../redux/productRedux";

export default function NewProductCategory() {


  const location = useLocation()
  const productId = location.pathname.split('/')[2];
  const [productStats, setProductStats] = useState([])

  const category = useSelector((state) => state.category?.category?.find(category => category?._id === productId))
  const [prod, setPro] = useState(category)
  const [inputs, setInputs] = useState(category)
  const [file, setFile] = useState(category?.img)
  const [cat, setCat] = useState('')
  const [catPush, setCatPush] = useState({
    title: '',
    img: '',
    cat: '',
    subCats: [{
      tags: [],
      subTitle: ''
    }],
  })

  const [title, setTitle] = useState([])
  const [subCat, setSubCat] = useState([])
  const [subCatPre, setSubCatPre] = useState([])
  const [subTags, setSubTags] = useState([])
  const [subTagsPre, setSubTagsPre] = useState('')
  const [subTitle, setSubTitle] = useState([])
  const [subTitlePre, setSubTitlePre] = useState('')


  const [gender, setGender] = useState(category?.gender)
  const [color, setColor] = useState(category?.color)
  const [size, setSize] = useState(category?.size)
  const [salePrice, setSalePrice] = useState(0)

  const extraPhotos = useSelector(state => state.category?.extraPhotos)
  const [isMainPhoto, setIsMainPhoto] = useState(false)
  const [isExtraPhotos, setIsExtraPhoto] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const [multiPhotosUpload, setMultiPhotosUpload] = useState([])


  let mainPho = ''
  if (category?.img == '') {
    mainPho = '../photos/proPic.jpeg'
  } else {
    mainPho = category?.img
  }

  const [mainPhoto, setMainPhoto] = useState(mainPho)
  const [mainPreviewFile, setMainPreviewFile] = useState(mainPho)

  const [multiPhotos, setMultiPhotos] = useState('')
  const [previewFiles, setPreviewFiles] = useState('')


  const dispatch = useDispatch()


  const handleChange = (e) => {
    setPro(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleCat = (e) => {
    setCat(e.target.value)
    console.log(cat);
  }

  //GET SUBTITLE ON CHANGE
  const handleSubTileChange = (e) => {
    console.log("In HAndleSubTitleChange");
    setSubTitlePre(e.target.value)
  }

  const handleSubTagChange = (e) => {
    const sc = e.target.value
    console.log("In HAndleSubTagsChange");
    // console.log(sc);
    if (sc != ' ') {
      if (!(subTags?.includes(sc))) {
        setSubTagsPre(e.target.value)
      } else if (subTags?.includes(sc)) {
        console.log("SubTag already added");
      }
    }
  }

  const handleSubTags = (e) => {
    e.preventDefault()
    console.log("In HAndleSubTags");
    if (subTagsPre != '') {
      setSubTags(subTags => [...subTags, subTagsPre])
      setSubTagsPre('')
    } else if (subTagsPre == '') {
      console.log("SubTags empty");
    }
  }

  const handleSubCat = (e) => {
    e.preventDefault()
    const subSub = {
      tags: subTags,
      subTitle: subTitlePre
    }
    setSubCatPre(subSub)
    setSubCat(subCat => [...subCat, subSub])
    setSubTags([])
    setSubTagsPre('')
    setCatPush({ ...catPush, title, img: mainPhoto, cat, subCats: subCat })
  }

  const handleFireBase = (e) => {
    e.preventDefault()  
    let isSuccesful = false
    console.log(mainPhoto);
    let file = mainPhoto
    const fileName = file?.name;
    const storage = getStorage(app)
    const StorageRef = ref(storage, `images/categoryImages/${subTitlePre}/${fileName}`)
    const uploadTask = uploadBytesResumable(StorageRef, file);
    uploadTask.on('state_changed', (snapshot) => {
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
      console.log('Upload is ' + progress + '% done');
    },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          mainPho = downloadURL
          isSuccesful = true
        });

        if (isSuccesful) {
          const newCat = { ...catPush, title, img: mainPho, cat, subCats: subCat }
          await addProductCatergory(newCat, dispatch).then((res) => {
            console.log("Success, we need to REFRSH");
          })
        }
      });



    // if (!haveFiles) {
    //   const newCat = { ...catPush, title,  cat, subCats: subCat }
    //   addProductCatergory(newCat, dispatch).then((res) => {
    //     console.log("We dont have files and need to REFRSH");
    //   })

    //   }
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

  const handleAll = async (e) => {
    e.preventDefault()
    const newCat = { ...catPush, title, img: mainPhoto, cat, subCats: subCat }
    console.log(newCat);
    console.log("running upload");
    // await upLoadPhoto()
    // await addPhotosFireBase(multiPhotos, mainPhoto, isMainPhoto, isExtraPhotos, dispatch)
  }

  console.log(title);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
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


            <div className="addProductItem">
              <label>Title</label>
              <input name='title' type="text" defaultValue={category?.title} onChange={(e) => setTitle(e.target.value)} />
            </div>
       

            <div className="subCatObj">
              <h3>SubCat Object</h3>
              <div className="addProductItem">
                <label>SubCat Title</label>
                <input name='title' type="text" defaultValue='top' onChange={handleSubTileChange} />
              </div>
              <div className="addProductItem">
                <label>SubCat tags</label>
                <input name='subCats' type="text" defaultValue={subTagsPre} onChange={handleSubTagChange} />
                <button onClick={handleSubTags}>Add Another Sub Tag</button>
              </div>

              <div>
                <p> SUB CATS</p>
                {subTags?.map((sTags, idx) => (
                  <div key={idx}>
                    <p>{sTags}</p>
                  </div>
                ))
                }
              </div>

              <button onClick={handleSubCat}>Add Another Sub Category</button>

              {
                subCat?.map((sC, idx) => (
                  <div key={idx}>
                    <h3>SUB</h3>
                    <h4>{sC.subTitle}</h4>
                    {sC?.tags.map((sTag, idx) => (
                      <div key={idx}>
                        <p>TEST</p>
                        <p key={idx}>{sTag}</p>
                      </div>
                    ))
                    }
                  </div>
                ))
              }
            </div>
           
            <div className=" wholeSalePair">
              <div className="catDivs">
                <label>Cat</label>
                <ul className="checkbox-grids" name='cat' onChange={handleCat}>
                  <li><input type="checkbox" name='gender' value="graphics" defaultChecked={category?.cat == 'graphics'} /><label >Graphics</label></li>
                  <li><input type="checkbox" name='cat' value="boys" defaultChecked={category?.cat == 'boys'} /><label >Boys</label></li>
                  <li><input type="checkbox" name='cat' value="girls" defaultChecked={category?.cat == 'girls'} /><label >Girls</label></li>
                  <li><input type="checkbox" name='cat' value="ladies" defaultChecked={category?.cat == 'ladies'} /><label >Women</label></li>
                  <li><input type="checkbox" name='cat' value="men" defaultChecked={category?.cat == 'men'} /><label >Men</label></li>
                  <li><input type="checkbox" name='cat' value="unisex" defaultChecked={category?.cat == 'unisex'} /><label>Unisex</label></li>
                </ul>
              </div>
              </div>
              <button className="productButton" onClick={handleFireBase}>Update</button >

       
          </div>
        </form>
      </div>
    </div>
  );
}
