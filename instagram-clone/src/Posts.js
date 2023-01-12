import React,{useState,useEffect} from 'react'

import { db,auth } from './firebase';
import './Posts.css'
// import AcUnitIcon from '@mui/icons-material/AcUnit';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
// import { deepOrange, deepPurple } from '@mui/material/colors';


function Posts({postID,username,caption,imageURL}) {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')


  useEffect(() => {
    let unsuscribe;
    if(postID){
      unsuscribe=db.
      collection("posts")
      .doc(postID)
      .collection("comments")
      .onSnapshot((snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()))
      });
    }
    return () => {
      unsuscribe();
    }
  }, [postID])
  

   
  // console.log(username,caption,imageURL)
  return (
    <div className='p  ost'>
       <div className="post_header">
        <Avatar
        className='post_avatar'/>
      <h3>{username}</h3> 
      </div>
      <img className='post_image' src={imageURL} alt="Image Here!" />
      <h4 className='post_text'> <strong>{username}:</strong> {caption}</h4>

 
      <form>
        <input
        className='post_input'
        type='text'
        placeholder='Add Comment...'
        value={comments}
        onChange={(e) => setComment(e.target.value)} 
        
        />
      </form>

    </div>
  )
}

export default Posts
