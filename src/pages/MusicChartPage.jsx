import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChartCard, RankTypography, pageStyles } from '../styles/MusicChartStyles';

// 더미 데이터
const mockMusic = [
  {
    id: 1,
    title: "Butter",
    artist: "BTS",
    genre: "POP",
  },
  {
    id: 2,
    title: "Dynamite",
    artist: "BTS",
    genre: "POP",
  },
  {
    id: 3,
    title: "Super Shy",
    artist: "NewJeans",
    genre: "POP",
  }
];

const genres = ["모든 장르", "POP", "ROCK", "JAZZ", "HIPHOP", "R&B", "ELECTRONIC"];

const MusicChartPage = () => {
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState("모든 장르");

  const filteredMusic = selectedGenre === "모든 장르" 
    ? mockMusic 
    : mockMusic.filter(music => music.genre === selectedGenre);

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
                key={music.id}
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
                        {music.artist}
                      </Typography>
                    </CardContent>
                    <IconButton 
                      size="small"
                      sx={pageStyles.infoButton}
                      onClick={() => navigate(`/music/${music.id}`)}
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