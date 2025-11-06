import React from 'react';
import './App.css';

import Navbar from './components/navbar/navbar.tsx';
import Sidebar from './components/sidebar/sidebar.tsx';
import Post from './components/post/post.tsx';

function App() {
  return (
    <>
      <Navbar />

      {/* content wrapper: give left margin equal to sidebar width so feed isn't covered */}
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <Sidebar />
        <main
          style={{
            flex: 1,
            marginLeft: 'var(--sidebar-width, 50px)',
            padding: '1rem'
          }}
        >
          <Post
            user="jimmy_chang"
            userProfilePicUrl="https://freesvg.org/img/abstract-user-flat-4.png"
            imageUrl="https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=662&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            caption="Hello, this is my caption"
            timestamp={10032025}
          />
        </main>
      </div>
    </>
  );
}

export default App;