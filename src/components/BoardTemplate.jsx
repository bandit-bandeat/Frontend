import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Pagination,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';

const BoardTemplate = ({
  title,
  posts,
  onSearch,
  totalPages,
  currentPage,
  onPageChange,
  boardType
}) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<CreateIcon />}
          onClick={() => navigate(`/community/${boardType}/write`)}
        >
          글쓰기
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <TextField
          placeholder="검색어를 입력하세요"
          size="small"
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => onSearch(e.target.value)}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="10%">번호</TableCell>
              <TableCell width="50%">제목</TableCell>
              <TableCell width="15%">작성자</TableCell>
              <TableCell width="15%">작성일</TableCell>
              <TableCell width="10%">조회수</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow
                key={post.postId}
                hover
                onClick={() => navigate(`/community/${boardType}/${post.postId}`)}
                sx={{ cursor: 'pointer' }}
              >
                {/* <tr> 태그에 불필요한 공백이 없도록 하여 Hydration 오류를 방지합니다. */}
                <TableCell>{post.postId}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.nickname}</TableCell> {/* 작성자 닉네임 표시 */}
                <TableCell>{post.created}</TableCell>
                <TableCell>{post.cnt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, page) => onPageChange(page)}
          color="secondary"
          size="large"
        />
      </Box>
    </Box>
  );
};

export default BoardTemplate;