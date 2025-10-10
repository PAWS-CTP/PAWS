import React, { useState } from "react";
import "./post.css"

type PostProps = {
  user: string;
  userProfilePicUrl: string;
  imageUrl: string;
  caption: string;
  timestamp: number;
  initialLikes?: number;
};

export default function Post({ user, userProfilePicUrl, imageUrl, caption, timestamp, initialLikes }: PostProps) {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };
  return (
    <div className="post-container">
      <div className="post-header">
        <img className="post-avatar" src={userProfilePicUrl} alt="User Avatar" />
        <h2 className="post-username text-color">{user}</h2>
        <h2 className="post-timestamp">{new Date(timestamp).toLocaleString()}</h2>
      </div>
      
      <img className="post-image" src={imageUrl} alt="Pet" />
      <p className="post-caption text-color">{caption}</p>
      
      <div className="post-footer">
      <button className={`like-button${liked ? " liked" : ""}`} onClick={handleLike}>
        {liked ? "♥" : "♡"} ({likes})
      </button>
      </div>
    </div>
  );
}