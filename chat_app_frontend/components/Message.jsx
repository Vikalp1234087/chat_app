export default function Message({ text, isMine }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: isMine ? 'flex-end' : 'flex-start',
      marginBottom: 10
    }}>
      <span style={{
        background: isMine ? '#2563eb' : '#e5e7eb',
        color: isMine ? '#fff' : '#111827',
        padding: '8px 12px',
        borderRadius: 12
      }}>
        {text}
      </span>
    </div>
  );
}
