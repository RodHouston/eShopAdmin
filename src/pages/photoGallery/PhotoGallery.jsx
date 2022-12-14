import { useEffect, useState } from "react";
import "./photoGallery.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase"
import { useDispatch } from "react-redux";
import {addDesigns, get, getPhotoGalleries} from '../../redux/apiCalls'



export default function PhotoGallery() {

  const [inputs, setInputs] = useState({})
  const [file, setFile] = useState(null)
  const [cat, setCat] = useState([])
  const [color, setColor] = useState([] )
  const [size, setSize] = useState([])

  const [gallery, setGallery] = useState({
    galTitle:'',
    galDescription:'',
    photos:[]
  })
  const [galTitlePre, setGalTitlePre] = useState('')

  const [photo, setPhoto] = useState({
    phoTitle:"",
    phoDescription:"",
    source:"",
    createdDated:''
  })
  const [photoPre, setPhotoPre] = useState('')

  const dispatch = useDispatch()

  const handleChange =(e) => {
    setInputs(prev=>{
      return {...prev, [e.target.name]: e.target.value}
    })
  }

  const handleGalleryTitle = (e) => {
    let gal= gallery 
    gal.galTitle= e.target.value
    setGalTitlePre( e.target.value)
    setGallery(gal)
  }
  const handleGalleryDesc = (e) => {
    let gal= gallery 
    gal.galDescription= e.target.value
    setGalTitlePre( e.target.value)
    setGallery(gal)
  }

  const handlePhotoTitle = (e) => {
    let pho= photo
    pho.phoTitle= e.target.value
    setGalTitlePre( e.target.value)
    setPhoto(pho)
  }
  const handlePhotoDesc = (e) => {
    let pho= photo
    pho.phoDescription= e.target.value
    setGalTitlePre( e.target.value)
    setPhoto(pho)
  }


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
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      // console.log('File available at', downloadURL);
      const design = {...inputs, img: downloadURL, categories: cat, color, size };
      console.log(design);
      addDesigns(design, dispatch)
    });
  }
);
}

useEffect(() => {
  
const getGalleries = async () => {
  try{
    // const gal = await getPhotoGalleries(dispatch)
  }catch(err){
    console.log(err);
  }
}

getGalleries()
}, []);

let now = new Date();
    let month = (now.getMonth() + 1);               
    let day = now.getDate();
    if (month < 10) 
        month = "0" + month;
    if (day < 10) 
        day = "0" + day;
    let today = now.getFullYear() + '-' + month + '-' + day;



    console.log(gallery);



  return (
    <>
    
    <div className="main">      
    <h1 className="addProductTitle">ADD GALLERY</h1>
    <div className="newProduct">
      <form className="addProductForm">
        <div className="addProductItem">
        <div className="addProductItem">
          <label>Gallery Name</label>
          <input name='title' type="text" placeholder="Apple Airpods" onChange={handleGalleryTitle} />
        </div>
        <div className="addProductItem">
          <label>Gallery Description</label>
          <input name='desc' type="text" name='description' placeholder="Description" onChange={handleGalleryDesc} />
        </div>  
        <h1 className="addProductTitle">Photo Details</h1>
          
          <label>Image</label>
          <input type="file"  name='source' onChange={e=>setFile(e.target.files[0])}/>
        </div>   
        <div className="addProductItem">
          <label>Photo Title</label>
          <input name='title' type="text" placeholder="Apple Airpods" onChange={handlePhotoTitle} />
        </div>

        <div className="addProductItem">
          <label>Photo Description</label>
          
          <input name='desc' type="text" name='description' placeholder="Description" onChange={handlePhotoDesc} />
        </div>            
        <div className="addProductItem">
          <label>Date</label>
          <input type="text" name='createdDate' value={today} onChange={handleChange} />
        </div>
       
        <button onClick={handleClick} className="addProductButton">Create</button>
      </form>
      <img src='../photos/proPic.jpeg'/>
      <h2>Gallery Title: {gallery.galTitle}</h2><br/>
      <h3>Gallery Description: <br/>{gallery.galDescription}</h3>
      <br/><br/>
      <h2>Photo Title: {photo.phoTitle}</h2><br/>
      <h3>Photo Description: <br/>{photo.phoDescription}</h3>
     
      </div>
     
    </div>
    
    </>
  );
}
