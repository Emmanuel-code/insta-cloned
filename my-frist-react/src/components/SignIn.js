import React,{useState,useEffect} from 'react'
import { db, auth  } from "../firebase";
import '../post.css'
import {Button, Input} from '@material-ui/core';
// modal for auth
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";


function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  
function SignIn() {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [openSignIn, setOpenSignIn] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if (authUser) {
            // if user has logged in...
            console.log(authUser);
            setUser(authUser);
          } else {
            // if user has logged out...
            setUser(null);
          }
        });
        return () => {
          // perform some cleanup actions
          unsubscribe();
        };
      }, [user, username]);


    const signup = (event) => {

        // This is to prevent the page from refreshing when we submit the form
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          return authUser.user.updateProfile({
            displayName: username
          })
        })
        .catch((error) => alert(error.message));
    
        // Set user so that footer changes accordingly
        
    
        // Close modal
        setOpen(false);
      }
    const signIn=(event)=>{
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
        .catch((error)=>alert(error.message))
        setOpenSignIn(false);
    
      }
      


    return (
        <div>
        
        <Modal
        open={open}
        onClose={() => setOpen(false)}
              >
        <div style={modalStyle} className={classes.paper}>
          <form className="sign__up">
            <center>
              <h1>INSTAGRAM</h1>
            </center>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="text"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signup}>
              Sign up
            </Button>
          </form>
        </div>
      </Modal>


        <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
            >
        <div style={modalStyle} className={classes.paper} >
          <form className="sign__up">
            <center>
              <h1>INSTAGRAM</h1>
            </center>
          
            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="text"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>
              Sign up
            </Button>
          </form>
        </div>
      </Modal>

      {user ? (
        <Button onClick={() => auth.signOut()}>logout </Button>
      ) : (
        <div>
        <Button onClick={() => setOpen(true)}>sign up</Button>
        <Button onClick={() => setOpenSignIn(true)}>sign in</Button>
        </div>

      )}
        </div>
    )
}

export default SignIn
