import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { theme } from './styles/theme';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import CreatePage from './components/CreateBar';
import Community from './components/CommunityBar';

// Bots
import MusicBot from './components/MusicBot';
import ChordBot from './components/ChordBot';
import RecommendBot from './components/RecommendBot';
import ImageBot from './components/ImageBot';
import Mp3Changer from './components/Mp3Changer';

// Pages
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyPage from './pages/MyPage';
import BoardPage from './pages/BoardPage';
import PostDetailPage from './pages/PostDetailPage';
import PostWritePage from './pages/PostWritePage';
import EatBotIntro from './pages/EatBotIntro';
import MusicChartPage from './pages/MusicChartPage';
import MusicDetailPage from './pages/MusicDetailPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            {/* 메인 페이지 */}
            <Route path="/" element={<MainPage />} />

            {/* 인증 관련 라우트 */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mypage" element={<MyPage />} />

            {/* Create 봇 관련 라우트 */}
            <Route path="/create" element={<CreatePage />}>
              <Route index element={<EatBotIntro />} />
              <Route path="music" element={<MusicBot />} />
              <Route path="chord" element={<ChordBot />} />
              <Route path="recommend" element={<RecommendBot />} />
              <Route path="image" element={<ImageBot />} />
              <Route path="mp3" element={<Mp3Changer />} />
            </Route>

            {/* 커뮤니티 관련 라우트 */}
            <Route path="/community" element={<Community />}>
              <Route index element={<BoardPage />} />
              <Route path=":boardType" element={<BoardPage />} />
              <Route path=":boardType/write" element={<PostWritePage />} />
              <Route path=":boardType/:postId" element={<PostDetailPage />} />
            </Route>
          
            {/* 음악 차트 페이지 */}
            <Route path="/music" element={<MusicChartPage />} />
            <Route path="/music/:id" element={<MusicDetailPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;