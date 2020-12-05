import React, { useState, useEffect } from "react";
import "./App.css";
import Avatar from "@material-ui/core/Avatar";

import Post from "./post";
import ImageUpload from "./ImageUpload";
import { db, auth } from "./firebase";
import SignIn from "./components/SignIn";
import InstagramEmbed from "react-instagram-embed";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
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
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));

    // Set user so that footer changes accordingly

    // Close modal
    setOpen(false);
  };
  //  connects the backend
  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
  }, []);

  return (
    <div className="App">
      <div className="app_header">
          <h3 className="app__logo">instagram</h3>
          <div className="header__right">
            {user && (
              <Avatar
                className="post__avatar"
                alt={user.displayName}
                src="static/3.jpg"
              />
            )}
            <SignIn />
          </div>
      </div>


        <div className="app__post">
          {posts.map(({ id, post }) => [
            <Post
              key={id}
              postId={id}
              user={user}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />,
          ])}
          <InstagramEmbed
              url='https://instagr.am/p/Zw9o4/'
              clientAccessToken='123|456'
              maxWidth={320}
              hideCaption={false}
              containerTagName='div'
              protocol=''
              injectScript
              onLoading={() => {}}
              onSuccess={() => {}}
              onAfterRender={() => {}}
              onFailure={() => {}}
            />
        </div>
        <div className='upload' >
      {user? (
        <ImageUpload username={user.displayName} />
      ) : (
        <p>soory login to post</p>
      )}
      </div>
    </div>
  );
}

export default App;
