import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, CardContent, Select, MenuItem, FormControl, InputLabel, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChartCard, RankTypography, pageStyles } from '../styles/MusicChartStyles';
import { fetchAllMusic } from '../api/musicApi';

const MusicChartPage = () => {
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState("모든 장르");
  const [musicList, setMusicList] = useState([]);
  const [genres, setGenres] = useState(["모든 장르"]);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const data = await fetchAllMusic();
        setMusicList(data);

        const uniqueGenres = new Set(data.flatMap(music => music.genres));
        setGenres(["모든 장르", ...uniqueGenres]);
      } catch (error) {
        console.error('Failed to fetch music data:', error);
      }
    };

    fetchMusic();
  }, []);

  const filteredMusic = selectedGenre === "모든 장르" 
    ? musicList 
    : musicList.filter(music => music.genres.includes(selectedGenre));

  return (
    <Box sx={pageStyles.mainBox}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={pageStyles.titleContainer}>
            <Box sx={{ width: 150 }} />
            
            <Box sx={pageStyles.titleBox}>
              <Typography variant="h2" sx={pageStyles.titleTypography}>
                Music Chart
              </Typography>
            </Box>

            <FormControl sx={pageStyles.genreSelect}>
              <InputLabel id="genre-select-label">장르</InputLabel>
              <Select
                labelId="genre-select-label"
                value={selectedGenre}
                label="장르"
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={pageStyles.chartList}>
            {filteredMusic.map((music, index) => (
              <motion.div
                key={music.musicId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <ChartCard>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    width: '100%',
                    px: 1.5,
                  }}>
                    <RankTypography sx={{ mr: 3, minWidth: '40px' }}>
                      {index + 1}
                    </RankTypography>
                    <CardContent sx={pageStyles.cardContent}>
                      <Typography variant="h6" sx={pageStyles.songTitle}>
                        {music.title}
                      </Typography>
                      <Typography variant="subtitle1" sx={pageStyles.artistName}>
                        {music.singer}
                      </Typography>
                    </CardContent>
                    <IconButton 
                      size="small"
                      sx={pageStyles.infoButton}
                      onClick={() => navigate(`/music/${music.musicId}`)}
                    >
                      <InfoOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </ChartCard>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default MusicChartPage;