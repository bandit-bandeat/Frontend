import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';

// 상세 정보를 포함한 더미 데이터
const musicDetails = {
  1: {
    id: 1,
    title: "Butter",
    artist: "BTS",
    genre: "POP",
    image: "https://i.ytimg.com/vi/WMweEpGlu_U/maxresdefault.jpg",
    youtubeLink: "https://www.youtube.com/watch?v=WMweEpGlu_U",
    releaseDate: "2021-05-21",
    description: "BTS의 디지털 싱글 'Butter'는 신나는 댄스 팝 장르의 곡입니다...",
    lyrics: "Side step, right, left to my beat...",
  },
  // ... 다른 곡들의 상세 정보
};

const MusicDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const music = musicDetails[id];

  return (
    <Box sx={{ bgcolor: 'black', minHeight: '100vh', color: 'white', py: 4 }}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{ color: 'white', mb: 3 }}
            onClick={() => navigate(-1)}
          >
            Back to Chart
          </Button>

          <Card sx={{ 
            bgcolor: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            overflow: 'hidden',
          }}>
            <CardMedia
              component="img"
              height="400"
              image={music.image}
              alt={music.title}
            />
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
                {music.title}
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
                {music.artist}
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  Genre: {music.genre}
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  Release Date: {music.releaseDate}
                </Typography>
              </Box>

              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4 }}>
                {music.description}
              </Typography>

              <Button
                variant="contained"
                color="secondary"
                startIcon={<PlayArrowIcon />}
                onClick={() => window.open(music.youtubeLink, '_blank')}
                sx={{ mb: 4 }}
              >
                Play on YouTube
              </Button>

              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                Lyrics
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'rgba(255,255,255,0.8)',
                  whiteSpace: 'pre-line' 
                }}
              >
                {music.lyrics}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default MusicDetailPage;