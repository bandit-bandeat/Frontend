import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BoardTemplate from '../components/BoardTemplate';
import postApi from '../api/postApi';

const BoardPage = () => {
  const { boardType } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 10;

  const boardTypes = {
    band: { 
      title: "밴드 구인 게시판",
      description: "밴드 멤버를 구인하는 게시판입니다."
    },
    lesson: { 
      title: "과외 구인 게시판",
      description: "음악 과외 선생님을 구하는 게시판입니다."
    },
    free: { 
      title: "자유게시판",
      description: "자유롭게 이야기를 나누는 게시판입니다."
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postApi.getPostsByKind(postsPerPage, currentPage - 1, boardType);
        setPosts(data.post);
        setTotalPages(Math.ceil(data.total / postsPerPage));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [boardType, currentPage]);

  const handleSearch = async (keyword) => {
    console.log('Searching:', keyword);
    try {
      const data = await postApi.searchPosts(boardType, keyword, postsPerPage, currentPage - 1);
      setPosts(data.post);
      setTotalPages(Math.ceil(data.total / postsPerPage));
    } catch (error) {
      console.error('Error searching posts:', error);
    }
  };

  const getCurrentPagePosts = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return posts.slice(startIndex, startIndex + postsPerPage);
  };

  return (
    <BoardTemplate
      title={boardTypes[boardType]?.title || "게시판"}
      posts={getCurrentPagePosts()}
      onSearch={handleSearch}
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      boardType={boardType}
    />
  );
};

export default BoardPage;