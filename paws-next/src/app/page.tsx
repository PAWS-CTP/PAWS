// src/app/page.tsx
import { Suspense } from "react";
import FeedClient from "./FeedClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div>Loading feed…</div>
        </div>
      }
    >
      <FeedClient />
    </Suspense>
  );
}
