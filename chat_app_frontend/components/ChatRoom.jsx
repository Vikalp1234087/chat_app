import { useEffect, useRef, useState } from 'react';

export default function ChatRoom({ roomId, setRoomId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socketRef.current = socket;

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'join', room: roomId }));
    };

    socket.onmessage = (event) => {
      const payload = JSON.parse(event.data);

      if (payload.type === 'message') {
        setMessages((prev) => [...prev, { text: payload.content, mine: false }]);
      }
    };

    socket.onclose = () => {
      setMessages((prev) => [...prev, { text: 'Connection closed.', mine: false }]);
    };

    return () => {
      socket.close();
    };
  }, [roomId]);

  const handleSend = (event) => {
    event.preventDefault();
    const trimmed = text.trim();

    if (!trimmed || !socketRef.current) return;

    socketRef.current.send(JSON.stringify({
      type: 'message',
      room: roomId,
      content: trimmed,
    }));

    setMessages((prev) => [...prev, { text: trimmed, mine: true }]);
    setText('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: 24,
      background: '#f3f4f6',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: 720,
        margin: '0 auto',
        background: '#fff',
        borderRadius: 16,
        padding: 20,
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ margin: 0 }}>Room: {roomId}</h2>
          <button
            onClick={() => setRoomId(null)}
            style={{
              padding: '8px 12px',
              border: 'none',
              borderRadius: 8,
              background: '#ef4444',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            Leave
          </button>
        </div>

        <div style={{
          minHeight: 300,
          maxHeight: 420,
          overflowY: 'auto',
          background: '#f9fafb',
          borderRadius: 12,
          padding: 12,
          marginBottom: 16
        }}>
          {messages.length === 0 ? (
            <p style={{ color: '#6b7280', margin: 0 }}>No messages yet. Say hello.</p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={`${msg.text}-${index}`}
                style={{
                  display: 'flex',
                  justifyContent: msg.mine ? 'flex-end' : 'flex-start',
                  marginBottom: 10
                }}
              >
                <div
                  style={{
                    maxWidth: '70%',
                    background: msg.mine ? '#2563eb' : '#e5e7eb',
                    color: msg.mine ? '#fff' : '#111827',
                    borderRadius: 10,
                    padding: '8px 12px'
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSend} style={{ display: 'flex', gap: 8 }}>
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: '12px 14px',
              border: '1px solid #d1d5db',
              borderRadius: 10,
              fontSize: 16
            }}
          />
          <button
            type="submit"
            style={{
              padding: '12px 16px',
              border: 'none',
              borderRadius: 10,
              background: '#10b981',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
