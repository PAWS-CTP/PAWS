import React from 'react';
import './comment.css';


export type Comment = {
    id: number;           // for uniquely identifying each comment
    content: string;         // the comment content
    username: string;     // who wrote it
    created_at: string;    // when it was written
    userProfilePicUrl: string;  // commenter's profile picture
}


export default function Comment({ content, username, created_at, userProfilePicUrl }: Comment) {
    const date = new Date(created_at);
    const formattedDate = isNaN(date.getTime()) ? "Unknown date" : date.toLocaleString();
    return (
        <div className="comment">
            <div className="comment-header">
                <img 
                    className="comment-avatar" 
                    // src={userProfilePicUrl} 
                    src="https://freesvg.org/img/abstract-user-flat-4.png"
                    alt={`${username}'s avatar`}
                />
                <span className="comment-username text-color"> {username} </span>
            </div>
            <p className="comment-text text-color">{content}</p>
            <span className="comment-timestamp text-color">
                {formattedDate}
            </span>
        </div>
    );
}
