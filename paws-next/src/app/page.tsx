import React from "react";
import { redirect } from "next/navigation";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import Post from "../components/post/post";

export default function Page() {
  const devBypass = process.env.NODE_ENV === "development" || process.env.DEV_BYPASS_AUTH === "true";
  if (!devBypass) {
    // Redirect to sign-in for normal environments
    redirect('/signin');
  }
  return (
    <>
      <Navbar />
      <div className="bg-gray-50" style={{ paddingTop: 'var(--navbar-height,72px)' }}>
        <div className="flex flex-row">
          <div className="basis-64 text-center">
            <Sidebar />
          </div>

          <div className="flex-1 flex justify-center">
            <div style={{ width: '100%', maxWidth: 720 }}>
              <Post
                user="jimmy_chang"
                userProfilePicUrl="https://freesvg.org/img/abstract-user-flat-4.png"
                imageUrl="https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=662&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                caption="Hello, this is my caption"
                timestamp={10032025}
              />
              <Post
                user="jimmy_chang"
                userProfilePicUrl="https://freesvg.org/img/abstract-user-flat-4.png"
                imageUrl="https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=662&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                caption="Hello, this is my caption"
                timestamp={10032025}
              />
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}