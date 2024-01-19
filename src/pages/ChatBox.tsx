import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close'; // Import Close Icon

const ChatBox: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [hover, setHover] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<string[]>([]);
    const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

    const sendMessage = () => {
        if (message) {
            setMessages([...messages, message]);
            setMessage('');
        }
    };

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const iconSrc = open || hover ? "/icon-message.png" : "/icon-robot.png";

    return (
        <Box sx={{ position: 'fixed', bottom: 30, right: 50 }}>
            <IconButton
                onClick={() => setOpen(!open)}
                onMouseOver={() => setHover(true)}
                onMouseOut={() => setHover(false)}
                sx={{
                    width: 55, height: 55,
                    backgroundColor: 'rgb(168,207,239)',
                    
                    backgroundImage: `url(${iconSrc})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    '&:hover': {
                        backgroundColor: 'rgb(168,207,239)',
                    },
                }}
            />
            {open && (
                <Box sx={{
                    position: 'fixed', bottom: 90, right: 20, width: 350, height: 500,
                    bgcolor: 'white', border: '1px solid #ddd', boxShadow: 2, borderRadius: 1,
                    display: 'flex', flexDirection: 'column',
                }}>
                    <Box sx={{
                        width: '100%',
                        height: '75px',
                        background: '                                                                 background: -webkit-linear-gradient(270deg, #f5e49a,#c4d9cf,#a8cfef);/* Chrome 10-25, Safari 5.1-6 */                          background: linear-gradient(270deg, #f5e49a,#c4d9cf,#a8cfef);/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */                                             ',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img src="/icon-avatar.png" alt="Avatar" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                            <Typography variant="h6" sx={{ ml: 1 }}>Chat Support</Typography>
                        </Box>
                        <IconButton onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <List sx={{ overflow: 'auto', flexGrow: 1, px: 1 }}>
                        {messages.map((msg, index) => (
                            <ListItem key={index} sx={{ display: 'flex', justifyContent: 'flex-end', py: 0.5 }}>
                                <Paper sx={{ 
                                    maxWidth: '70%', padding: 1, borderRadius: 2,
                                    background: 'rgb(168,207,239)'
                                }}>
                                    <Typography variant="body1">{msg}</Typography>
                                </Paper>
                            </ListItem>
                        ))}
                        <div ref={endOfMessagesRef} />
                    </List>
                    <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                        <TextField
                            label="Votre message"
                            variant="outlined"
                            fullWidth
                            value={message}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
                            onKeyPress={(e: React.KeyboardEvent) => e.key === 'Enter' && sendMessage()}
                            sx={{ mr: 1 }}
                        />
                        <Button 
                            variant="contained" 
                            onClick={sendMessage}
                            sx={{
                                background: 'rgb(168,207,239)'
                            }}
                        >
                            Envoyer
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default ChatBox;
