"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar/navbar";
import { supabase } from "@/lib/supabaseClient";
import { CITIES } from "@/lib/cities";
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'

const CreateEventPage: React.FC = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(""); // yyyy-mm-dd
  const [startTime, setStartTime] = useState(""); // hh:mm
  const [endTime, setEndTime] = useState(""); // hh:mm
  const [isPrivate, setIsPrivate] = useState(false);

  // image state
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // ui state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // for location dropdown
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const filteredCities = CITIES.filter((city) =>
  city.toLowerCase().includes(location.toLowerCase())
);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // basic validation
    if (!title || !location || !date || !startTime || !endTime) {
      setError(
        "Please fill out title, location, date, start time, and end time."
      );
      return;
    }
    if (!image) {
      setError("Please upload an image before creating the event.");
      return;
    }

    setLoading(true);

    try {
      // 1) upload image to Supabase Storage
      const fileExt = image.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `events/${fileName}`;
      const BUCKET = "event_images";

  
      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(filePath, image, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw new Error(uploadError.message || "Failed to upload image.");
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(BUCKET).getPublicUrl(filePath);

      // 2) build ISO datetimes for start_time and end_time
      const startDateTime = new Date(`${date}T${startTime}:00`);
      const endDateTime = new Date(`${date}T${endTime}:00`);

      // 3) insert event row into Supabase
      const { error: insertError } = await supabase.from("events").insert([
        {
          title,
          description,
          location,
          date, // 'YYYY-MM-DD' string is fine for a date column
          start_time: startDateTime.toISOString(),
          end_time: endDateTime.toISOString(),
          img_url: publicUrl, // <-- correct column name
          privacy: isPrivate,
          // later: add user_id when Supabase Auth is wired
        },
      ]);

      if (insertError) {
        console.error("Insert error:", insertError);
        throw new Error(insertError.message || "Failed to create event.");
      }

      alert("Event created successfully!");
      router.push("/"); // navigate to feed/home
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong creating the event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-[#258EA6] mb-6">
            Create New Event
          </h1>

          <Card className="max-w-2xl">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <CardHeader>
                <h1 className="text-2xl font-bold text-[#258EA6]">Create New Event</h1>
              </CardHeader>

              <CardContent>
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
            <div className="mt-3 mb-4">
              <Button type="button" onClick={handleUploadClick} className="bg-[var(--primary-color)] text-white hover:brightness-95">
                Upload Image
              </Button>
            </div>

            {/* Title */}
            <Input
              type="text"
              placeholder="Event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* Description */}
            <Textarea
              placeholder="Describe your event..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />

            {/* Location with autocomplete */}
            <div className="relative">
            <Input
              type="text"
              placeholder="Location (city)"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setShowCityDropdown(true);
              }}
              onFocus={() => setShowCityDropdown(true)}
              onBlur={() => {
                setTimeout(() => setShowCityDropdown(false), 150);
              }}
            />

            {showCityDropdown && filteredCities.length > 0 && (
              <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow">
                {filteredCities.map((city) => (
                  <li
                    key={city}
                    onMouseDown={() => {
                      setLocation(city);
                      setShowCityDropdown(false);
                    }}
                    className="cursor-pointer px-3 py-2 hover:bg-gray-100 text-sm"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

            {/* Date + Times */}
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[120px]">
                <label className="block text-sm font-medium mb-1">Date</label>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>

              <div className="flex-1 min-w-[120px]">
                <label className="block text-sm font-medium mb-1">
                  Start Time
                </label>
                <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </div>

              <div className="flex-1 min-w-[120px]">
                <label className="block text-sm font-medium mb-1">
                  End Time
                </label>
                <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </div>
            </div>

            {/* Privacy */}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
              />
              Make this event private
            </label>

            {/* Error message */}
            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

              </CardContent>

              <CardFooter>
                {/* Error message */}
                {error && (
                  <p className="text-red-500 text-sm mr-4">
                    {error}
                  </p>
                )}

                <div className="ml-auto">
                  <Button type="submit" disabled={loading} className="bg-[var(--primary-color)] text-white py-2 rounded-lg font-semibold hover:brightness-95 disabled:opacity-60">
                    {loading ? "Creating..." : "Create Event"}
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default CreateEventPage;
