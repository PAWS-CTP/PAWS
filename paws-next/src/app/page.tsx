import React from "react";
import { redirect } from "next/navigation";
import Navbar from "../components/navbar/navbar";
import Sidebar from "@/components/app-sidebar";
import Post, { type EventRow } from "../components/post/post";
import { supabase } from "@/lib/supabaseClient";

export default async function Page() {
  const devBypass =
    process.env.NODE_ENV === "development" ||
    process.env.DEV_BYPASS_AUTH === "true";

  if (!devBypass) {
    redirect("/signin");
  }

  // 🔽 get events from Supabase
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error loading events:", error);
  }

  const events = (data ?? []) as EventRow[];

  return (
    <>
      <Navbar />
      <div
        className="bg-gray-50"
        style={{ paddingTop: "var(--navbar-height,72px)" }}
      >
        <div className="flex flex-row">
          <div className="basis-64 text-center">
            <Sidebar />
          </div>

          <div className="flex-1 flex justify-center">
            <div style={{ width: "100%", maxWidth: 720 }}>
              {events.length === 0 && (
                <p className="text-gray-500 text-sm mt-4">
                  No events yet. Create one to get started!
                </p>
              )}

              {events.map((event) => (
                <Post
                  key={event.id}
                  event={event}
                  // later: initialLikes={event.like_count ?? 0}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
