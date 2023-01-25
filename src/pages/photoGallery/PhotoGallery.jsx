import { useEffect, useState } from "react";
import "./photoGallery.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase"
import { useDispatch, useSelector } from "react-redux";
import { addPhotoToGallery, getPhotoGalleries, updatePhotoToGallery } from '../../redux/apiCalls'




export default function PhotoGallery() {

  const dispatch = useDispatch()
  const [cat, setCat] = useState([])
  const [files, setFiles] = useState([])
  const [inputs, setInputs] = useState({})
  const [photos, setPhotos] = useState([])
  const [filesPre, setFilesPre] = useState([])
  const [isUpdate, setIsUpdate] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [galTitlePre, setGalTitlePre] = useState('')
  const [isNewGallery, setIsNewGallery] = useState(false)
  const allGalleries = useSelector(state => state.gallery.galleries)

  const [gallery, setGallery] = useState({})
  
  const [photo, setPhoto] = useState({
    phoTitle: "",
    phoDescription: "",
    source: "",
    createdDated: ''
  })
  const handleChange = (e) => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  const handleGalleryTitle = (e) => {
    let gal = gallery
    gal.galTitle = e.target.value
    setGalTitlePre(e.target.value)
    setGallery(gal)
  }
  const handleGalleryDesc = (e) => {
    let gal = gallery
    gal.galDescription = e.target.value
    setGalTitlePre(e.target.value)
    setGallery(gal)
  }
  const handlePhotoTitle = (e, idx) => {
    let pho
    { photos[idx] == undefined ? pho = { ...photo } : pho = photos[idx] }
    pho.phoTitle = e.target.value
    setGalTitlePre(e.target.value)
    const newPhotos = photos
    newPhotos[idx] = pho
    setPhotos(newPhotos)

  }

  const handlePhotoDesc = (e, idx) => {
    let pho
    { photos[idx] == undefined ? pho = { ...photo } : pho = photos[idx] }

    pho.phoDescription = e.target.value
    setGalTitlePre(e.target.value)
    const newPhotos = photos
    newPhotos[idx] = pho
    setPhotos(newPhotos)

  }


  const handlePhoto = (e) => {
    console.log(e.target.files);
    let mainPre = []
    if (e.target.value != null) {
      let mP = []
      mP = Object.values(e.target.files)
      mP.map(file => {
        mainPre.push(URL.createObjectURL(file))
      })
      console.log(mainPre);
      setFiles(e.target.files)
      setGalTitlePre(e.target.value)
      setFilesPre(mainPre)
    } else {
      return
    }
  }
  const addtoGallery = (gal) => {
    console.log("here");
    console.log(gal);
    setIsUpdate(true)
    setShowModal(prev => !prev)
    setGallery(gal)
  }

  const handleClick = (e) => {
    e.preventDefault()
    setShowModal(prev => !prev)
    let newGal ={}
    let mainPho = ''
    let isSuccesful = false
    let itemsProcessed = 0
    let photos1 = []
    console.log(photos);
    console.log(files);
    console.log(gallery);
    
    const newFiles = Object.values(files)
    gallery?.photos?.forEach(photo => {
      photos1.push(photo)
    })

        newFiles.forEach((fil, idx)  => {
        const fileName = fil?.name;
        const storage = getStorage(app)
        const StorageRef = ref(storage, `images/gallery/${gallery.galTitle}/${fileName}`)

        const uploadTask = uploadBytesResumable(StorageRef, fil);
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
              let now = new Date();
              let month = (now.getMonth() + 1);
              let day = now.getDate();
              if (month < 10)
                month = "0" + month;
              if (day < 10)
                day = "0" + day;

              let today = now.getFullYear() + '-' + month + '-' + day;

              const pho = {...photos[idx]}
              pho.source = mainPho
              pho.createdDated = today
              
            
              photos1.push(pho)

              
              itemsProcessed++    
              if(itemsProcessed== files.length) {
                if (isUpdate) {
                  newGal = {
                    ...gallery,
                    photos: photos1
                  }
                   updatePhotoToGallery(gallery._id, newGal, dispatch).then((res) => {
                    console.log("Success, we need to REFRSH");
                  })
                } else
                  if (isNewGallery) {
                    // await addPhotoToGallery(newGal, dispatch).then((res) => {
                    //   console.log("Success, we need to REFRSH");
                    // })
                  }
              }           
            }            
          });
         
          
      })
  

  }

  useEffect(() => {
    const getGalleries = () => {
      getPhotoGalleries(dispatch)
    }
    getGalleries()
  }, [dispatch]);

  return (
    <>
      <div className="main">
        {showModal &&
          <div className="modal" onClick={(e) => {
            e.target === e.currentTarget &&
              setShowModal(prev => !prev);
          }} >
            <div className="modalContent">
            <h2>Gallery Title: {gallery.galTitle}</h2><br />
              <h1 className="addProductTitle">Photo Details</h1>
              <input type="file" multiple name='source' onChange={handlePhoto} />

              {
                filesPre?.map((filePre, idx) => (

                  <div key={idx} className="addPhotoDiv">
                    <div className="addPhotoInfo">
                      <div className="addProductItem">
                        <label>Photo Title</label>
                        <input name='title' type="text" placeholder="Apple Airpods" onChange={(e) => handlePhotoTitle(e, idx)} />
                      </div>
                      <div className="addProductItem" >
                        <label>Photo Description</label>
                        <input name='desc' type="text" name='description' placeholder="Description" onChange={(e) => handlePhotoDesc(e, idx)} />
                      </div>
                    </div>
                    <div className="modalImageDiv">
                      <img className='modalImage' src={filePre} />
                    </div>
                  </div>

                ))
              }
              <button onClick={(e) => handleClick(e, gallery)} className="addProductButton">Create</button>
            </div>
          </div>
        }
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
            </div>
          </form>

        </div>
        <div className="galleryPreview">

          {allGalleries?.map((gals, idx) => (
            <div key={idx}>
              <h2>Gallery Title: {photo.phoTitle}</h2><br />
              <h4>{gals.galTitle}</h4>
              <button onClick={(e) => { addtoGallery(gals) }}>Add to {gals.galTitle}</button>

              {gals.photos.map((photo, idx) => (
                <div className='galleryImageDivs' key={idx}>
                  <img className="galleryImages" src={photo.source} />
                </div>
              ))
              }
            </div>
          ))
          }
        </div>
      </div>

    </>
  );
}
