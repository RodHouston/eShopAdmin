
import { useDispatch, useSelector } from "react-redux";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase"
import { addPhotos } from "./productRedux";
import { updateProducts } from "./apiCalls";

export default function AddPhotoToFireBase(files1, mainFile, product, isMainPhoto, isExtraPhotos, dispatch) {
    console.log('inside Add to Firebae');

    let pho = []
    let mainPho = mainFile
    let files = new Array(files1)

    // console.log(isExtraPhotos);
    // console.log(files1);
    // console.log(isMainPhoto);
    // console.log(mainFile);


    product?.morePhotos.map((photo, idx) => {
        if (files[0][idx] == null) {
            pho[idx] = photo
            files[0][idx] = photo
        } else if (files[0][idx] != null) {
            pho[idx] = files[0][idx]
        }
    })
    files[0].push({ main: mainFile })

    console.log(files);

    let items = []
    let itemsProcessed = 0
    let haveFiles = false
    let isSuccesful = false

    files[0].forEach((fil, idx) => {
        let file;    
        // console.log(idx);
        // console.log(fil.main);

        if (idx >= files[0].length - 1) {
            console.log("in switch case 1");
            file = fil.main
        } else {
            console.log("in case 2");
            file = fil
        }
        console.log("after change");
        console.log(file);
        if (typeof file == "object") {
            items.push(file)
            haveFiles = true

            const fileName = file?.name;
            const storage = getStorage(app)
            const StorageRef = ref(storage, `images/productImages/${product._id}/${fileName}`)
            const uploadTask = uploadBytesResumable(StorageRef, file);
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed', (snapshot) => {
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
                console.log('Upload is ' + progress + '% done');
            },
                (error) => {
                    // Handle unsuccessful uploads
                    console.log(error);
                },
                async () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    
                        
                        // pho.push(downloadURL)
                        if (idx <= files[0].length - 2) {
                            await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            console.log('in more file');
                            console.log('File available at', downloadURL);
                            pho[idx] = downloadURL
                            isSuccesful = true
                            itemsProcessed++
                        });
                        }
                        if (idx >= files[0].length - 1) {
                            await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            console.log("in main pho");
                            console.log('File available at', downloadURL);
                            mainPho = downloadURL
                            isSuccesful = true
                            itemsProcessed++
                        });
                        }                        
                    
                    console.log("hre");
                        let pro = {};
                        if (itemsProcessed >= items.length  && isSuccesful) {
                            if (isExtraPhotos || isMainPhoto) {
                                pro = { ...product, img: mainPho, morePhotos: pho }
                            }
                            await updateProducts(pro._id, pro, dispatch).then((res)=>{
                                console.log("Success, we need to REFRSH");
                            })
                            
                           
                        }
                    
                });
        }

    })

    if (!haveFiles) {
        updateProducts(product._id, product, dispatch).then((res)=> {
            console.log("We dont have files and need to REFRSH");  
        })
              
    }
    console.log(pho);

}
