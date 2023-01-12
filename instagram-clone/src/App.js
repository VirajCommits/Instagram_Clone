// import logo from './logo.svg';
import './App.css';
import Post from './Posts'
import React,{useState,useEffect} from 'react'
import { db,auth } from './firebase';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import {Button,Input} from '@mui/material'
import ImageUpload from './ImageUpload';
// import InstagramEmbed from 'react-instagram-embed'  ;

function App() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [email, setEmail] = useState([]);
  const [user, setUser] = useState(null)
  const [openSignIn, setOpenSignIn] = useState(false)

  useEffect(() => {
    const unsuscribe=auth.onAuthStateChanged((authUser) => {
      if(authUser){

        setUser(authUser)
        if(authUser.displayName){

        }else{
          return authUser.updateProfile({
            displayName:username,
          });
        }
      } else{

        setUser(null);
      }
    })
    return () => { 
      unsuscribe();
    }
  },[user,username]);
  const signUp = (event) =>{
    event.preventDefault()

    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
      authUser.user.updateProfile({
        displayName:username
      })
    })
    .catch((error) => alert(error.message))



  }

  const signIn = (event) => {
    event.preventDefault()
    auth
    .signInWithEmailAndPassword(email,password)
    .catch((error) => alert(error.message));
    setOpenSignIn(false)
  }
  useEffect(() => {
    //this is where the code runs!
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot =>{
      setPosts(snapshot.docs.map(doc => ({id:doc.id,post:doc.data()})))

    })

  },[posts])
  // console.log(posts)
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleCloseSignIn = () =>setOpenSignIn(false)
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (

    <div className="app">



      {/* Caption */}
      {/* File picker */}
      {/* Post Button */}

      


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <form className='app_signup'>
              <center>
                <img className='app_headerImage' src="https://cdn.mos.cms.futurecdn.net/uE49BtPU4iDJAoHFEHn8m7.jpg" alt="INSTA_LOGO" />
              </center>


                <Input
                placeholder="username"
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />

                <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />


                <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" onClick={signUp}>Sign Up!</button>



              

            </form>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Viraj's Sign on Function!
          </Typography>
        </Box>
      </Modal>




      <Modal
        open={openSignIn}
        onClose={handleCloseSignIn}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <form className='app_signup'>
              <center>
                <img className='app_headerImage' src="https://cdn.mos.cms.futurecdn.net/uE49BtPU4iDJAoHFEHn8m7.jpg" alt="INSTA_LOGO" />
              </center>

                <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />


                <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" onClick={signIn}>Sign In!</button>



              

            </form>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            My Function
          </Typography>
        </Box>
      </Modal>





      
      <div className="app__header">
        <img className="app_headerImage" src="https://fontmeme.com/images/instagram-new-logo.png" alt="" /> 
        {
        user? (
      <button onClick={() => auth.signOut()}>LogOut</button>

        ):(
          <div className="app_loginContainer">
            <button onClick={() => setOpenSignIn(true)} >Sign In</button>
            <button onClick={() => setOpen(true)}>Sign Up!</button>

          </div>
        )
      }
      </div>

      

      <div className="app_posts">
        {
          posts.map(({id,post}) =>{
            // console.log(post[0].imageURL)
            return(
             
            <Post key={id} postID={id} username={post.username} caption={post.caption} imageURL={post.imageUrl}/>)
          })
        }
        {user?.displayName ? (
      <ImageUpload username={user.displayName}/>

      ):(
        <h3>Sorry,you need to login to Upload!</h3>
      )}

      </div>
    </div>
  );
}

export default App;
