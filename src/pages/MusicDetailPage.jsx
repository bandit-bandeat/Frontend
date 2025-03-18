import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';
import { fetchAllMusic } from '../api/musicApi';

const MusicDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [music, setMusic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMusicDetail = async () => {
      try {
        const data = await fetchAllMusic();
        const musicData = data.find(music => music.musicId === parseInt(id));
        setMusic(musicData);
      } catch (error) {
        console.error('Failed to fetch music detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMusicDetail();
  }, [id]);

  return (
    <Box sx={{ bgcolor: 'black', minHeight: '100vh', color: 'white', py: 4 }}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {loading ? (
            <Typography>Loading...</Typography>
          ) : !music ? (
            <Typography>Failed to load music details.</Typography>
          ) : (
            <>
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
                    {music.singer}
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                      Genre: {music.genres.join(', ')}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<PlayArrowIcon />}
                    onClick={() => window.open(music.youtube, '_blank')}
                    sx={{ mb: 4 }}
                  >
                    Play on YouTube
                  </Button>
                  
                </CardContent>
              </Card>
            </>
          )}
        </motion.div>
      </Container>
    </Box>
  );
};

export default MusicDetailPage;