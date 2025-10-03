import React from "react";

type PostProps = {
  user: string;
  imageUrl: string;
  caption: string;
  timestamp: number;
};

export default function Post({ user, imageUrl, caption, timestamp }: PostProps) {
  return (
    <div style={{ border: "1px solid gray", padding: "1rem", margin: "1rem 0" }}>
      <h2 style={{color:'#549f93'}}>{user} | {timestamp}</h2>
      <img src={imageUrl} alt="PetImage" style={{ width: "50%", height: "50%", borderRadius: "8px" }} />
      <p>{caption}</p>
    </div>
  );
}