import React from 'react';
import './comment.css';

export type Comment = {
    id: number;           // for uniquely identifying each comment
    text: string;         // the comment content
    username: string;     // who wrote it
    timestamp: number;    // when it was written
    userProfilePicUrl: string;  // commenter's profile picture
}

