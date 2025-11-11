import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";

export default function CreatePostPage() {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
      <Sidebar />
      <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
      {/* later: add upload form, captions, image preview, etc */}
      </div>
    </div>
  );
}