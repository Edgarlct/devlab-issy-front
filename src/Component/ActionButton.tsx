export const ActionButton = ({ text, link, onClick, changeLink }: { text: string, changeLink: (link:string) => void, link?: string, onClick?: () => void }) => {
  const handleClick = () => {
    if (link) {
      changeLink(link);
    } else if (onClick) {
      onClick();
    }
  }
  return (
    <div style={{
      backgroundColor: '#6579c2',
      color: '#fff',
      padding: '10px',
      borderRadius: '8px',
      maxWidth: '100%',
      margin: '10px',
      wordBreak: 'break-word',
      cursor: "pointer",
      textAlign: "center",
  }} onClick={handleClick}>
    {text}
  </div>
);
};
