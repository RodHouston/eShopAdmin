import { useEffect, useState } from "react";
import "./newDesign.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase"
import { useDispatch } from "react-redux";
import {addDesigns} from '../../redux/apiCalls'



export default function NewDesign() {
  const [inputs, setInputs] = useState({})
  const [file, setFile] = useState(null)
  const [cat, setCat] = useState([])
  const [color, setColor] = useState([] )
  const [size, setSize] = useState([])
  const dispatch = useDispatch()

  const handleChange =(e) => {
    setInputs(prev=>{
      return {...prev, [e.target.name]: e.target.value}
    })
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
    console.log(size);
  }
  // const handleColor = (e) => {
  //   setColor(e.target.value.split(','))
  // }
  // const handleSize = (e) => {
  //   setSize(e.target.value.split(','))
  // }
  
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
  
}, [cat]);

  
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Design</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={e=>setFile(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Stock Number</label>
          <input name='stockNumber' type="text" placeholder="# 123" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input name='title' type="text" placeholder="Apple Airpods" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input name='price' type="number" placeholder="Price" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input name='desc' type="text" placeholder="Description" onChange={handleChange} />
        </div>       
        <div className="addProductItem">
          <label>Category</label>         
            <ul className="checkbox-grid" name='categories' onChange={handleCat}>
              <li><input type="checkbox" name="categories" value="anime" /><label htmlFor="text1">Anime</label></li>
              <li><input type="checkbox" name="categories" value="cartoon" /><label htmlFor="text2">Cartoon</label></li>
              <li><input type="checkbox" name="categories" value="sports" /><label htmlFor="text3">Sports</label></li>
              <li><input type="checkbox" name="categories" value="television" /><label htmlFor="text4">TV</label></li>
              <li><input type="checkbox" name="categories" value="text" /><label htmlFor="text5">Text</label></li>
              <li><input type="checkbox" name="categories" value="420" /><label htmlFor="text6">420</label></li>
              <li><input type="checkbox" name="categories" value="music" /><label htmlFor="text7">Music</label></li>
              <li><input type="checkbox" name="categories" value="other" /><label htmlFor="text8">Other</label></li>
          </ul>          
        </div>        
        <div className="addProductItem">
          <label>Color</label>         
            <ul className="checkbox-grid" name='color' onChange={handleColor}>
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
        
        <div className="addProductItem">
          <label>Stock</label>
          <select name='inStock' onChange={handleChange} >
            <option value='true'>Yes</option>
            <option value='false'>No</option>
          </select>
        </div>
       
        <button onClick={handleClick} className="addProductButton">Create</button>
      </form>
    </div>
  );
}
