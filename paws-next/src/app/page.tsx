import React from "react";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import Post from "../components/post/post";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions as any);
  const devBypass = process.env.NODE_ENV === "development" || process.env.DEV_BYPASS_AUTH === "true";
  if (!session && !devBypass) {
    // If not signed in (and not bypassing in development), redirect to the login page
    redirect("/login");
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50">
        <div className="flex flex-row">
          <div className="basis-64" style={{ textAlign: "center" }}>
            <Sidebar />
          </div>
          <div className="basis-256">
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
    </>
  );
}