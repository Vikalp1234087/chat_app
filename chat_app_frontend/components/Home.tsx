import { useState } from 'react';

function generateRoomId() {
  return `ROOM-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export default function Home({ setRoomId }) {
  const [room, setRoom] = useState('');

  const handleJoin = (event) => {
    event.preventDefault();
    const trimmed = room.trim();

    if (!trimmed) return;
    setRoomId(trimmed);
  };

  const handleCreateRoom = () => {
    const newRoomId = generateRoomId();
    setRoom(newRoomId);
    setRoomId(newRoomId);
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
          Create a room or join using a room ID.
        </p>

        <button
          type="button"
          onClick={handleCreateRoom}
          style={{
            width: '100%',
            padding: '12px',
            border: 'none',
            borderRadius: 10,
            background: '#10b981',
            color: 'white',
            fontSize: 16,
            cursor: 'pointer',
            marginBottom: 18,
            fontWeight: 600
          }}
        >
          Create Room
        </button>

        <form onSubmit={handleJoin}>
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value.toUpperCase())}
            placeholder="Enter room ID"
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
