import React from 'react';
import './comment.css';

// Type for the comment data
export type Comment = {
    id: number;           // for uniquely identifying each comment
    text: string;         // the comment content
    username: string;     // who wrote it
    timestamp: number;    // when it was written
    userProfilePicUrl: string;  // commenter's profile picture
}

// The Comment component that displays a single comment
export default function Comment({ text, username, timestamp, userProfilePicUrl }: Comment) {
    return (
        <div className="comment">
            <div className="comment-header">
                <img 
                    className="comment-avatar" 
                    src={userProfilePicUrl} 
                    alt={`${username}'s avatar`}
                    width="21.33px"
                    height="21.33px"
                />
                <span className="comment-username text-color"> {username} </span>
            </div>
            <p className="comment-text text-color">{text}</p>
            <span className="comment-timestamp text-color">
                {new Date(timestamp).toLocaleString()}
            </span>
        </div>
    );
}
