"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar/navbar";
import Sidebar from "@/components/app-sidebar";
import Post, { type EventRow } from "../components/post/post";
import { supabase } from "@/lib/supabaseClient";

export default function Page() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          // not signed in → redirect to sign-in
          router.replace("/signin");
          return;
        }

        // signed in → load events
        setLoadingEvents(true);
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .order("date", { ascending: false });

        if (!mounted) return;

        if (error) {
          console.error("Error loading events:", error);
          setEvents([]);
        } else {
          setEvents((data ?? []) as EventRow[]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) {
          setChecking(false);
          setLoadingEvents(false);
        }
      }
    };

    check();

    return () => {
      mounted = false;
    };
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Checking authentication…</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 feed-page" style={{ paddingTop: "var(--navbar-height,72px)" }}>
        <div className="flex flex-row">
          <div className="w-64 text-center">
            <Sidebar />
          </div>

          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-7xl px-6 py-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-dashed border-slate-200 min-h-[420px]">
                {loadingEvents && <p className="text-gray-500 text-sm mt-2">Loading events…</p>}

                {!loadingEvents && events.length === 0 && (
                  <div className="text-gray-500 text-sm mt-2">No events yet. Create one to get started!</div>
                )}

                <div className="space-y-4 mt-4">
                  {events.map((event) => (
                    <Post key={event.id} event={event} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
