"use client";

import React, { useState, useEffect } from "react";
import Comment, { type Comment as CommentType } from "../comment/comment";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import PawIcon from '@/components/icons/Paw'

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
  username: string | null;
};

type PostProps = {
  event: EventRow;
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
}: PostProps) {
  // local storage for now
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [pulsing, setPulsing] = useState(false);

  // comments local state for now
  const [comments, setComments] = useState<CommentType[]>([]);
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
    username,
  } = event;

  const eventDate = formatDate(date ?? created_at);
  const start = formatTime(start_time);
  const end = formatTime(end_time);

  useEffect(() => {
    const fetchLikes = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const userId = session?.user?.id;

      // Fetch total likes
      const { data: likesData, error: likesError } = await supabase
        .from("likes")
        .select("*")
        .eq("event_id", event.id);

      if (likesError) console.error("Error fetching likes:", likesError);
      else setLikes(likesData?.length || 0);

      // Check if current user liked
      if (userId) {
        const { data: userLike, error: userLikeError } = await supabase
          .from("likes")
          .select("*")
          .eq("event_id", event.id)
          .eq("user_id", userId)
          .single();

        if (!userLikeError && userLike) setLiked(true);
      }
    };

    fetchLikes();
  }, [event.id]);

    useEffect(() => {
    const fetchComments = async () => {
      const { data: commentData, error: commentError } = await supabase
        .from("comments")
        .select("*")
        .eq("events_id", event.id);

      if (commentError) console.error("Error fetching likes:", commentError);
      else setComments(commentData || []);
      console.log("comments",commentData)
    };

    fetchComments();
  }, [event.id]);

  const handleLike = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const userId = session?.user?.id;

    if (!userId) {
      console.log("User not logged in. Cannot like the post.");
      return;
    }

    // trigger a short pulse animation for feedback
    setPulsing(true);
    setTimeout(() => setPulsing(false), 360);

    if (!liked) {
      // Insert like
      const { error } = await supabase.from("likes").insert([
        { user_id: userId, event_id: event.id },
      ]);
      if (error) console.error("Failed to add like:", error);
      else {
        setLiked(true);
        setLikes((prev) => prev + 1);
      }
    } else {
      // Remove like
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("user_id", userId)
        .eq("event_id", event.id);
      if (error) console.error("Failed to remove like:", error);
      else {
        setLiked(false);
        setLikes((prev) => (prev > 0 ? prev - 1 : 0));
      }
    }
  };
const handleAddComment = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!newComment.trim()) return;

  // get current user
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = session?.user?.id;
  if (!userId) {
    console.log("User not logged in. Cannot comment on the post.");
    return;
  }

  // look up username from users table (optional, just for display)
  const { data: userInfo } = await supabase
    .from("users")
    .select("username")
    .eq("id", userId)
    .single();

  // 🔴 IMPORTANT: include user_id in the insert
  const { data: inserted, error } = await supabase
    .from("comments")
    .insert([
      {
        events_id: event.id,
        content: newComment.trim(),
        username: userInfo?.username ?? null,
        user_id: userId,             // <-- needed for RLS policy
      },
    ])
    .select();

  if (error) {
    console.log("error creating comment", error);
    return;
  }

  // update local UI
  setComments((prev) => [
    ...prev,
    {
      id: inserted[0].id,
      content: inserted[0].content,
      username: inserted[0].username,
      userProfilePicUrl: inserted[0].user_profile_pic_url,
      created_at: inserted[0].created_at,
    },
  ]);

  setNewComment("");
};



  return (
    <Card className="mb-6 max-w-lg mx-auto">
      <CardHeader>
        <div className="flex items-start justify-between w-full">
          <div>
            {/* username line */}
            <div className="text-sm font-semibold">
              @{username ?? "unknown_user"}
            </div>

            {/* meta line: date / time / location */}
            <div className="text-xs text-muted-foreground mt-1">
              {eventDate}
              {start && end && ` · ${start} – ${end}`}
              {location && ` · 📍 ${location}`}
            </div>

            {/* title */}
            <h3 className="text-lg font-semibold mt-2">
              {title || "Untitled event"}
            </h3>
          </div>
        </div>
      </CardHeader>


      <CardContent>
        {img_url && (
          <div className="w-full rounded overflow-hidden mb-4">
            <div className="w-full overflow-hidden aspect-[4/5] rounded-lg">
              <img
                src={img_url}
                alt={title || "Event image"}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        )}

        <div className="mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className="inline-flex items-center gap-2 px-0"
          >
            <PawIcon className={`w-6 h-6 ${pulsing ? 'like-pulse' : ''} ${liked ? 'text-red-500' : 'text-gray-500'}`} />
            <span>{likes}</span>
          </Button>
        </div>

        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </CardContent>

      <CardFooter>
        <div className="flex-1 w-full">
          <div className="space-y-3 w-full">
            {comments.map((comment) => (
              <Comment key={comment.id} {...comment} />
            ))}
          </div>

          <form className="mt-3 flex gap-2" onSubmit={handleAddComment}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 rounded-md border px-3 py-2 text-sm"
            />
            <Button
              size="sm"
              type="submit"
              className="bg-[var(--primary-color)] text-white hover:brightness-95 focus-visible:ring-2 focus-visible:ring-[color:var(--primary-color)/0.45] active:scale-95 transition-transform"
            >
              Post
            </Button>
          </form>
        </div>
      </CardFooter>
    </Card>
  );
  }


