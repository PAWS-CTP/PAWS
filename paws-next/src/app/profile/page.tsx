import ProfileHeader from "@/components/profile/profileheader";
import ProfilePost from "@/components/profile/profileposts";
import Navbar from "@/components/navbar/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50" style={{ paddingTop: 'var(--navbar-height,72px)' }}>
        <div className="flex justify-center">
          <div style={{ width: '100%', maxWidth: 920 }}>
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
      </div>
    </>
  );
}
