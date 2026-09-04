import { useState } from 'react';
import Home from '../components/Home';
import ChatRoom from '../components/ChatRoom';

export default function App() {
  const [roomId, setRoomId] = useState(null);

  if (roomId) {
    return <ChatRoom roomId={roomId} setRoomId={setRoomId} />;
  }

  return <Home setRoomId={setRoomId} />;
}
