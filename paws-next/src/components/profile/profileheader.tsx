import React from 'react';

function ProfileHeader() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <img 
        src="https://thumbs.dreamstime.com/b/cute-cat-portrait-square-photo-beautiful-white-closeup-105311158.jpg"
        width="90"
        height="90"
        style={{ borderRadius: "50%" }}
      />

      {/* Stack Username and Bio vertically */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2 style={{ color: "#EC22FF",fontWeight: 'bold' }}>Username</h2>
        <p>Bio blah blah blah blah</p>
      </div>
    </div>
  );
}

export default ProfileHeader;