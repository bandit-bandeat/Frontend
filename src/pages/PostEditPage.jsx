import React, { useState } from 'react';
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    IconButton,
} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import postApi from '../api/postApi';

const PostWritePage = () => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        kind: '',
        files: []
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            files: Array.from(e.target.files)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('accessToken'); // localStorage에서 액세스 토큰 가져오기
        console.log("엑세스토큰 확인: ", accessToken);
        if (!accessToken) {
            console.error('Access token is missing');
            return;
        }

        try {
            // 게시글 작성 API 호출
            await postApi.updatePost(postId,formData.content, accessToken, formData.files);
            navigate(`/community/${formData.kind}`);
        } catch (error) {
            //console.error('Error writing post:', error.response ? error.response.data : error.message);
            console.log(error);
        }
    };

    return (
        <Box sx={{ p: 3, maxWidth: 1000, margin: '0 auto' }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h5" component="h1">
                        게시글 작성
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="내용"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        multiline
                        rows={15}
                        sx={{ mb: 3 }}
                    />

                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        sx={{ mb: 3 }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate(-1)}
                        >
                            취소
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            작성완료
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default PostWritePage;