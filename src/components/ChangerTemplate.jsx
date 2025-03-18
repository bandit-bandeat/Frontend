import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    IconButton,
    Typography,
    Avatar,
    Stack,
    Select,
    FormControl,
    InputLabel,
    MenuItem
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { ChatContainer, MessagesBox, MessageBubble} from '../styles/ChatStyles';

import {useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ChangerTemplate = ({ botName, onSendForm, placeholder }) => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [file, setFile] = useState(null);   // MP3 파일 상태 관리
    const [bgColor, setBgColor] = useState('primary.main');
    const [messages, setMessages] = useState([
        { id: 1, text: `안녕하세요! ${botName} 변환기입니다. 어떤 도움이 필요하신가요?`, isBot: true },
    ]);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    // MP3 파일 업로드 처리 함수
    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            // 여러 MP3 관련 MIME 타입을 확인
            const validTypes = ["audio/mp3", "audio/mpeg"];
            if (validTypes.includes(uploadedFile.type)) {
                setFile(uploadedFile);
                console.log("MP3 파일 업로드:", uploadedFile);
                setBgColor('secondary.main');
            } else {
                console.log("MP3 파일이 아닙니다. 유효한 파일 형식: audio/mp3, audio/mpeg");
            }
        }
    };

    const handleSend = async (event) => {
        event.preventDefault();
        // 로그인 안되어 있으면, 로그인 창으로 이동
        if (!isLoggedIn) {
            alert('로그인이 필요합니다.')
            navigate('/login')
        }
        console.log("제출 클릭 됨")
        if (!input.trim()) {
            alert('장르를 선택해주세요.')
            return;
        }
        if (!file) {
            alert('mp3 파일을 선택해주세요.')
            return;
        }
        const formData = new FormData();
        formData.append('music_file', file);
        formData.append('style', input);
        formData.append('email', localStorage.getItem('email'));


        const sendMessage = { id: Date.now(), text: `${file.name}을 ${input} 형식으로 바꿔줘`, isBot: false };
        setMessages(prev => [...prev, sendMessage]);

        const tempMessage = { id: Date.now() + Math.floor(Math.random() * 1000)+1, text: "mp3 파일을 변환 중입니다...  3분 정도 소요됩니다...", isBot: true };
        setMessages(prev => [...prev, tempMessage]);
        setInput('');

        if (onSendForm) {
            const response = await onSendForm(formData);
            if (response instanceof Blob) {
                const botMessage = { id: Date.now(), text: `${file.name}을 ${input} 형식으로 바꾼 결과는 다음과 같습니다.\n`,
                    isBot: true,
                    audioUrl: URL.createObjectURL(response)}; // 블롭을 URL로 변환
                setMessages(prev => [...prev, botMessage]);
            } else { // 에러가 발생했을 때
                console.log(response);
                const botMessage = {
                    id: Date.now(), text: `${response}`,
                    isBot: true};
                setMessages(prev => [...prev, botMessage]);
            }

        }
    };

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: { xs: 0, sm: 2, md: 3 }
        }}>
            <ChatContainer>
                <MessagesBox>
                    {messages.map((message) => (
                        <Stack
                            key={message.id}
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            sx={{
                                justifyContent: message.isBot ? 'flex-start' : 'flex-end',
                                mb: 2,
                            }}
                        >
                            {message.isBot && (
                                <Avatar
                                    sx={{
                                        bgcolor: 'primary.main',
                                        width: { xs: 32, sm: 40 },
                                        height: { xs: 32, sm: 40 }
                                    }}
                                >
                                    <SmartToyIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                                </Avatar>
                            )}
                            <MessageBubble isBot={message.isBot}>
                                <Typography variant="body1">{message.text}</Typography>
                                {message.audioUrl && (
                                    <audio controls>
                                        <source src={message.audioUrl} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                )}
                            </MessageBubble>
                            {!message.isBot && (
                                <Avatar
                                    sx={{
                                        bgcolor: 'secondary.main',
                                        width: { xs: 32, sm: 40 },
                                        height: { xs: 32, sm: 40 }
                                    }}
                                >
                                    <PersonIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                                </Avatar>
                            )}
                        </Stack>
                    ))}
                    <div ref={messagesEndRef} />
                </MessagesBox>
                <Box sx={{
                    p: { xs: 1.5, sm: 2, md: 3 },
                    borderTop: 1,
                    borderColor: 'divider'
                }}>
                    <Stack direction="row" spacing={{xs: 1, sm: 2}}>
                        <form onSubmit={(e) => handleSend(e)} style={{width: '100%'}}>
                            <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%' }}>
                                {/* MP3 파일 업로드 버튼 */}
                                <input
                                    type="file"
                                    accept=".mp3"
                                    onChange={(e) => handleFileUpload(e)}
                                    style={{ display: 'none' }}
                                    id="file-upload"
                                />
                                <label htmlFor="file-upload">
                                    <IconButton
                                        color="primary"
                                        component="span"
                                        sx={{
                                            p: { xs: 1.5, sm: 2 },
                                            borderRadius: { xs: '6px', sm: '8px' },
                                            bgcolor: bgColor,
                                            color: 'white',
                                            '&:hover': {
                                                bgcolor: 'primary.dark'
                                            },
                                            flexShrink: 0,
                                        }}
                                    >
                                        <MusicNoteIcon /> {/* 또는 다른 아이콘 사용 가능 */}
                                    </IconButton>
                                </label>

                                <FormControl fullWidth variant="outlined" sx={{ flexGrow: 1 }}>
                                    <InputLabel id="genre-select-label">{placeholder}</InputLabel>
                                    <Select
                                        labelId="genre-select-label"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        label={placeholder}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: { xs: '6px', sm: '8px' },
                                                backgroundColor: 'background.paper',
                                                fontSize: { xs: '0.9rem', sm: '1rem' }
                                            }
                                        }}>
                                        <MenuItem value="jazz">재즈</MenuItem>
                                        <MenuItem value="blues">블루스</MenuItem>
                                        <MenuItem value="rock">락</MenuItem>
                                        <MenuItem value="funk">펑크</MenuItem>
                                        <MenuItem value="classical">클래식</MenuItem>
                                        <MenuItem value="r&b">알앤비</MenuItem>
                                        <MenuItem value="bossa-nova">보사노바</MenuItem>
                                    </Select>
                                </FormControl>

                                <IconButton
                                    color="primary"
                                    type="submit"
                                    sx={{
                                        p: {xs: 1.5, sm: 2},
                                        borderRadius: {xs: '6px', sm: '8px'},
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: 'primary.dark'
                                        },
                                        flexShrink: 0,
                                    }}
                                >
                                    <SendIcon/>
                                </IconButton>
                            </Stack>
                        </form>
                    </Stack>
                </Box>
            </ChatContainer>
        </Box>
    );
};

export default ChangerTemplate;