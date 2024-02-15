import React, {useEffect, useState} from 'react';
import {Avatar, Fab, IconButton, TextField, useTheme} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import {api} from "./utils/api.ts";
import {MessageBubble} from "./Component/MessageBubble.tsx";
import {ActionButton} from "./Component/ActionButton.tsx";
import {LinkGenerator} from "./utils/linkGenerator.ts";
import {Autorenew} from "@mui/icons-material";

const ChatContainer = (props: {linkChange: (link:string) => void}) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [buttonChat, setButtonChat] = useState<{text:string, link?: string, id?:string, onClick?: ()=>void}[]>([])
  const refMessage = React.useRef<string[]>([])
  const refButton = React.useRef<{text:string, link?: string, id?:string, onClick?: ()=>void}[]>([])

  let datasets = []
  let datasetKey: {id: string, firstKey: string, secondKey: string} = {id: "", firstKey: "", secondKey: ""}
  let filters: Array<string|null> = []

  useEffect(() => {
    loadDatasets()
  }, [])

  const manageFilter = (filter: string|null) => {
    filters.push(filter)
    if (filters.length === 1 && filter !== null) {
      let message = refMessage.current
      message = message.concat([filter, "Un deuxième filtre : "])
      refMessage.current = message
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const button = datasetKey.keyValues[filter].map((key: string) => {
        return {text: key, onClick: () => manageFilter(key)}
      })
      button.push({text:"Aucun", onClick: () => manageFilter(null)})
      refButton.current = button
      setButtonChat(button)
    } else {
      let message = refMessage.current
      message = message.concat([(filter === null ? "Aucun deuxième filtre" : filter), "Voici le lien de votre jeu de donnée filtré"])
      refMessage.current = message
      const link = LinkGenerator.generateLink(datasetKey, filters)
      refButton.current = [{text: "Lien", link: link}]
      setButtonChat([{text: "Lien", link: link}])
    }
  }

  const loadDatasets = async () => {
    const message = ["Bonjour ! Quel jeu de données souhaitez-vous explorer ?"]
    datasets = await api.getDatasets()

    const button = datasets.map((dataset : { id : string, name : string }) => {
      return {text: dataset.name, id: dataset.id, onClick: () => {loadDatasetKey(dataset.id)}}
    })
    refMessage.current = message
    refButton.current = button
    setButtonChat(button)
  }

  const loadDatasetKey = async (datasetId: string) => {
    const dataset = await api.getDatasetKey(datasetId)
    datasetKey = dataset
    let newMessage = refMessage.current
    newMessage = newMessage.concat([dataset.name, "Quelle filtre voulez-vous appliquer ? Un premier filtre : "])
    refMessage.current = newMessage
    const button = Object.keys((dataset as {keyValues: object}).keyValues).map((key: string) => {
      return {text: key, onClick: () => manageFilter(key)}
    })
    refButton.current = button
    setButtonChat(button)
  }

  const reset = () => {
    datasetKey = {id: "", firstKey: "", secondKey: ""}
    filters = []
    refButton.current = []
    setButtonChat([])
    refMessage.current = []
    loadDatasets()
  }
  const toggleChat = () => setIsOpen(!isOpen);

  const searchButton = (text:string) => {
    console.log(text, refButton.current)
    if (text === "") {
      setButtonChat(refButton.current)
      return
    }
    const button = refButton.current.filter((button) => button.text.toLowerCase().includes(text.toLowerCase()))
    setButtonChat(button)
  }

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    width: isOpen ? 400 : 56,
    height: isOpen ? 600 : 56,
    transition: 'all 0.3s ease-in-out',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRadius: isOpen ? '20px' : '50%',
    backgroundColor: isOpen ? 'rgba(236, 236, 236, 0.8)' : '#fff',
    boxShadow: ' -6px 4px 12px 0px rgba(4,4,4,0.3)',
    backdropFilter: 'blur(8px)',
  };

  const headerStyle: React.CSSProperties = {
    // background: 'linear-gradient(to top left, #D3F49D, #798ACE)',
    backgroundColor: '#D3F49D',
    color: '#000',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '17px 17px 0 0',
  };

  // Style pour le bouton ouvrir/fermer le chat avec le dégradé
  const fabOpenStyle: React.CSSProperties = {
    // background: 'linear-gradient(to top left, #D3F49D, #798ACE)',
    backgroundColor: '#798ACE',
    color: '#fff',
    border: 'none',
  };

  // Style pour le bouton de fermeture avec une couleur rouge
  const fabCloseStyle: React.CSSProperties = {
    // background: 'linear-gradient(to top left, #DEBB86, #ff1744)', // Adjusted to a red gradient
    backgroundColor: '#D3F49D',
    color: '#000',
    border: 'none',
    minWidth: '40px',
    minHeight: '40px',
  };

  return (
    <div style={containerStyle}>
      {isOpen ? (
        <>
          <div style={headerStyle}>
            <Avatar src="batman_icon.png" style={{ marginRight: '10px', border: '2px solid white' }} />
            <h3 style={{ margin: 0, color: '#000' }}>Missy</h3>
            <span style={{flex:1}}/>
            <IconButton onClick={reset} size={"small"}><Autorenew fontSize={"small"}/></IconButton>
          </div>
          <div style={{ padding: '10px', overflowY: 'auto', flex: 1 }}>
            {refMessage.current.map((message, index) => (
              <MessageBubble key={index} text={message} />
            ))}
            {buttonChat.length > 0 && <span style={{marginTop: "32px", display:"block"}}></span>}
            {buttonChat.map((button, index) => (
              <ActionButton key={index} text={button.text} link={button?.link} onClick={button.onClick} changeLink={(link:string) => {
                setIsOpen(false)
                props.linkChange(link)
              }}/>
            ))}
          </div>
          <div style={{ alignSelf: 'flex-end', padding: '10px', width:"100%", gap: 16, display:"flex", alignItems:"center"}}>
            <TextField variant={"outlined"} label={"rechercher"} size={"small"} fullWidth onChange={(e) => searchButton(e.target.value)}/>
            <Fab style={fabCloseStyle} size="small" onClick={toggleChat}>
              <CloseIcon />
            </Fab>
          </div>
        </>
      ) : (
        <Fab style={fabOpenStyle} aria-label="chat" onClick={toggleChat}>
          <ChatIcon />
        </Fab>
      )}
    </div>
  );
};

export default ChatContainer;
