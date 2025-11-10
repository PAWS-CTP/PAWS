import React, { useState } from "react";
import Comment, { type Comment as CommentType } from '../comment/comment';
import "./post.css"


type PostProps = {
  user: string;
  userProfilePicUrl: string;
  imageUrl: string;
  caption: string;
  timestamp: number;
  initialLikes?: number;
  initialComments?: CommentType[];
};

export default function Post({ user, userProfilePicUrl, imageUrl, caption, timestamp, initialLikes, initialComments = [] }: PostProps) {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {  // Only add comment if it's not empty
        const comment: CommentType = {
            id: Date.now(),  // Using timestamp as a simple unique ID
            text: newComment.trim(),
            username: user,  // Using the current post's user
            timestamp: Date.now(),
            userProfilePicUrl: userProfilePicUrl
        };
        setComments([...comments, comment]);  // Add new comment to array
        setNewComment("");  // Clear input field
    }
};

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

        {/* Comments Section */}
        <div className="comments-section">
          {/* Display existing comments */}
          <div className="comments-list">
            {comments.map(comment => (
              <Comment key={comment.id} {...comment} />
            ))}
          </div>
          
          {/* Add new comment form */}
          <form className="comment-form text-color" onSubmit={handleAddComment}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="comment-input text-color"
            />
            <button type="submit" className="comment-submit">Post</button>
          </form>
        </div>
      </div>
    </div>
  );
}