import React,{useState,useEffect} from 'react'
import {db,storage} from './firebase' 
import firebase from "firebase/compat/app";
import './ImageUpload.css'


function ImageUpload({username}) {
    
    const [image, setImage] = React.useState(null)
    // const [url, setUrl] = React.useState("")
    const [progress, setProgress] = React.useState(0)
    const [caption, setCaption] = React.useState('');

    const handleChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
                setProgress(progress);
            },
            (error) =>{
                alert(error.message)
            },
            () => { 
                storage 
                .ref("images")
                .child(image.name)

                .getDownloadURL()
                .then(url => {
                    db.collection('posts').add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption:caption,
                        imageUrl:url,
                        username:username
                    });

                    setProgress(0);
                    setCaption("");
                    setImage(null);
                });
            }
        )


    }
  return (
    <div className='image_upload'>
        <progress className='imageUpload_progress' value={progress} max="100"/>
        <input type="text" placeholder='Enter a Caption...' onChange={event => setCaption(event.target.value)}  />
        <input type="file" onChange={handleChange} />
        <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default ImageUpload
