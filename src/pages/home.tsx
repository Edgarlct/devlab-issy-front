import {useState} from 'react'
import '../App.css'
import ChatContainer from "../ChatContainer.tsx";

function Home() {
  const [link, setLink] = useState("https://data.issy.com")

  return (
    <>
      <div className="container">
        <iframe title="data-issy" src={link} width="100%" height="100%" />
        <ChatContainer linkChange={(link) => setLink(link)}/>
      </div>
    </>
  )
}

export default Home
