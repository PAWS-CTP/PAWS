"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";

export default function CreatePostPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setError(""); 
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      setError("Please upload an image before posting");
      return;
    }
    console.log("Caption:", caption);
    console.log("Image:", image);

    alert("Post created successfully!");
    router.push("/"); // navigate to home feed
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-[#258EA6] mb-6">
            Create New Post
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 max-w-lg"
          >
            {/* Image Preview */}
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="rounded-lg border border-gray-300 object-cover max-w-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg text-gray-400">
                No image selected
              </div>
            )}

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />

            {/* Upload Button */}
            <button
              type="button"
              onClick={handleUploadClick}
              className="bg-[#258EA6] text-white px-4 py-2 rounded-lg hover:bg-[#1f6e85] transition font-medium"
            >
              Upload Image
            </button>

            {/* Caption Input */}
            <textarea
              placeholder="Write a cute caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#258EA6]"
              rows={4}
            />

            {/* Post Button */}
            <button
              type="submit"
              className="bg-[#258EA6] text-white py-2 rounded-lg font-semibold hover:bg-[#1f6e85] transition"
            >
              Post
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
