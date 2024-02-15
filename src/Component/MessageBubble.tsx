export const MessageBubble = ({ text }: { text: string }) => {
  return (
    <div style={{
    backgroundColor: '#99a0c7',
      color: '#fff',
      padding: '8px 16px',
      borderRadius: '12px',
      maxWidth: '80%',
      width: 'fit-content',
      margin: '10px',
      wordBreak: 'break-word',
  }}>
    {text}
  </div>
);
};
