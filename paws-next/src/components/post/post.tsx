"use client";

import React, { useState } from "react";
import Comment, { type Comment as CommentType } from "../comment/comment";
import "./post.css";
import { supabase } from "@/lib/supabaseClient";
/**
 * Current shape of the `events` table.
 * Update this later if you add more columns (user_id, like_count, etc.).
 */
export type EventRow = {
  id: string;
  created_at: string;
  title: string | null;
  description: string | null;
  img_url: string | null;
  location: string | null;
  date: string | null;        // 'YYYY-MM-DD'
  start_time: string | null;  // ISO string
  end_time: string | null;    // ISO string
  privacy: boolean | null;
  //like_count?: number | null; // <-- AFTER you add this column
};

type PostProps = {
  event: EventRow;
 // for likes and comments in local state for now
  initialLikes?: number;
  initialComments?: CommentType[];
};

const formatDate = (dateStr?: string | null) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatTime = (iso?: string | null) => {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
};

export default function Post({ 
  event,
  initialLikes = 0,
  initialComments = [],
}: PostProps) {
  // local storage for now
  // likes – local state + (optionally) synced to DB
  const [likes, setLikes] = useState(initialLikes);
    //event.like_count ?? initialLikes ?? 0 ); <- after you add like_count to events
  const [liked, setLiked] = useState(false);

  // comments local state for now
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const {
    title,
    description,
    img_url,
    location,
    date,
    start_time,
    end_time,
    created_at,
  } = event;

  const eventDate = formatDate(date ?? created_at);
  const start = formatTime(start_time);
  const end = formatTime(end_time);

  const handleLike = async () => {
    // optimistic update on the frontend
    const newLiked = !liked;
    const newLikes = likes + (newLiked ? 1 : -1);

    setLiked(newLiked);
    setLikes(newLikes);

    // 🔁 LATER: save to DB (events.like_count)
  //   try {
  //     const { error } = await supabase
  //       .from("events")
  //       .update({ like_count: newLikes })
  //       .eq("id", event.id);

  //     if (error) {
  //       console.error("Failed to update like_count:", error);
  //       // revert if DB update fails
  //       setLiked(!newLiked);
  //       setLikes(likes);
  //     }
  //   } catch (err) {
  //     console.error("Error updating likes:", err);
  //     setLiked(!newLiked);
  //     setLikes(likes);
  //   }
   };

    const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: CommentType = {
      id: Date.now(), // simple unique ID
      text: newComment.trim(),
      username: "Anonymous Pawrent", // later: real username from users table
      timestamp: Date.now(),
      userProfilePicUrl:
        "https://freesvg.org/img/abstract-user-flat-4.png", // later: real avatar
    };

    setComments((prev) => [...prev, comment]);
    setNewComment("");
  };

  return (
    <div className="post-container">
      {/* HEADER: event info only for now */}
      <div className="post-header">
        <div className="post-header-text">
          <h2 className="post-title text-color">
            {title || "Untitled event"}
          </h2>

          <div className="post-meta">
            <span className="post-timestamp">
              {eventDate}
              {start && end && ` · ${start} – ${end}`}
            </span>
            {location && (
              <span className="post-location"> · 📍 {location}</span>
            )}
          </div>
        </div>
      </div>

      {/* IMAGE from events.img_url */}
      {img_url && (
        <img
          className="post-image"
          src={img_url}
          alt={title || "Event image"}
        />
      )}

      {/* DESCRIPTION from events.description */}
      {description && (
        <p className="post-caption text-color">{description}</p>
      )}

      {/* FOOTER – likes + comments*/}
      <div className="post-footer">
        <button
          className={`like-button${liked ? " liked" : ""}`}
          onClick={handleLike}
        >
          {liked ? "♥" : "♡"} ({likes})
        </button>

        <div className="comments-section">
          <div className="comments-list">
            {comments.map((comment) => (
              <Comment key={comment.id} {...comment} />
            ))}
          </div>

          <form className="comment-form text-color" onSubmit={handleAddComment}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="comment-input text-color"
            />
            <button type="submit" className="comment-submit">
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/**
 * 🔁 LATER CHANGES:
 * - When you add like_count to events:
 *     type EventRow = { ...; like_count: number | null };
 *     and in Post:
 *       initialLikes = event.like_count ?? 0;
 *       plus a Supabase update in handleLike.
 *
 * - When you join events with users:
 *     extend PostProps to take username + avatar and render them in the header.
 *
 * - When you add comments table:
 *     you can bring back your old comments UI and load/save via Supabase.
 */

          // {/* Add new comment form */}
          // <form className="comment-form text-color" onSubmit={handleAddComment}>
          //   <input
          //     type="text"
          //     value={newComment}
          //     onChange={(e) => setNewComment(e.target.value)}
          //     placeholder="Add a comment..."
          //     className="comment-input text-color"
          //   />
          //   <button type="submit" className="comment-submit">Post</button>
