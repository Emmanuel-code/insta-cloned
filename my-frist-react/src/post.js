import React, { useState, useEffect } from "react";
import "./post.css";
import Avatar from "@material-ui/core/Avatar";
import { db, auth } from "./firebase";
import firebase from "firebase";

function Post({ postId, username, user, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  // What follows is for comments under a post, when a change is made, it refreshes
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postcomment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt={username} src="static/3.jpg" />
        <h3>{username}</h3>
      </div>
      <img className="post__image" src={imageUrl} />
      <h3 className="post__text">
        <strong>{username} </strong> {caption}
      </h3>
      <div>
        
        <div className="post__comments">
          {comments.map((comment) => (
            <div className="comment_container">
              <p className="post__comment">
                <strong>{comment.username}</strong> {comment.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {user && (
        <form className="comment__box">
        <input
          className="comment__input"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          className="comment__button"
          onClick={postcomment}
          disabled={!comments}
          type="submit"
        >
          Post
        </button>
      </form>
      )}
    </div>
  );
}

export default Post;
