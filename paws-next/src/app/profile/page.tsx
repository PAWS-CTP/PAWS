import ProfileHeader from "@/components/profile/profileheader";
import ProfilePost from "@/components/profile/profileposts";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50" style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
        <div className="p-10">
        <ProfileHeader />
        </div>
        <div className="grid grid-cols-4 gap-6">
          <ProfilePost />
          <ProfilePost />
          <ProfilePost />
          <ProfilePost />
          <ProfilePost />
          <ProfilePost />
          <ProfilePost />
          <ProfilePost />
        </div>
        </div>
      </div>
    </>
  );
}
