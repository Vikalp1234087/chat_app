export default function JoinRoom({ setRoomId }) {
  return (
    <div>
      <h3>Join room</h3>
      <button onClick={() => setRoomId('general')}>Join General</button>
    </div>
  );
}
