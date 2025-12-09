// src/app/FeedClient.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../components/navbar/navbar";
import Sidebar from "@/components/app-sidebar";
import Post, { type EventRow } from "../components/post/post";
import { supabase } from "@/lib/supabaseClient";

export default function FeedClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [checking, setChecking] = useState(true);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);

  // read filters from the URL
  const city = searchParams.get("city")?.trim() || undefined;

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.replace("/signin");
          return;
        }

        setLoadingEvents(true);

        // base query
        let query = supabase
          .from("events")
          .select("*")
          .order("date", { ascending: false });

        // filter by location if a city is present
        if (city) {
          query = query.ilike("location", `%${city}%`);
        }

        const { data, error } = await query;

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

    load();

    return () => {
      mounted = false;
    };
  }, [router, city]); // city is enough; no need for searchParams.toString()

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
      <div
        className="bg-gray-50 feed-page"
        style={{ paddingTop: "var(--navbar-height,72px)" }}
      >
        <div className="flex flex-row">
          <div className="w-64 text-center">
            <Sidebar />
          </div>

          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-7xl px-6 py-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-dashed border-slate-200 min-h-[420px]">
                {city && (
                  <p className="text-sm text-gray-500 mb-2">
                    Showing events in:{" "}
                    <span className="font-medium">{city}</span>
                  </p>
                )}

                {loadingEvents && (
                  <p className="text-gray-500 text-sm mt-2">
                    Loading events…
                  </p>
                )}

                {!loadingEvents && events.length === 0 && (
                  <div className="text-gray-500 text-sm mt-2">
                    No events found{city ? ` for "${city}"` : ""}.
                  </div>
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
