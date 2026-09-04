import { useState } from 'react';

export default function Home({ setRoomId }) {
  const [room, setRoom] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = room.trim();

    if (!trimmed) return;
    setRoomId(trimmed);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f3f4f6',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: 420,
        background: '#ffffff',
        borderRadius: 16,
        padding: 32,
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
      }}>
        <h1 style={{ marginBottom: 12, textAlign: 'center' }}>Chat Room</h1>
        <p style={{ textAlign: 'center', color: '#4b5563', marginBottom: 24 }}>
          Enter a room name to join the chat.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Room name"
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 10,
              border: '1px solid #d1d5db',
              marginBottom: 16,
              fontSize: 16,
              boxSizing: 'border-box'
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              border: 'none',
              borderRadius: 10,
              background: '#2563eb',
              color: 'white',
              fontSize: 16,
              cursor: 'pointer'
            }}
          >
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
}
