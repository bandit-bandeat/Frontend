import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BoardTemplate from '../components/BoardTemplate';
import postApi from '../api/postApi';

const BoardPage = () => {
  const { boardType } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [nicknames, setNicknames] = useState([]);  // 닉네임 배열 상태 추가
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
    },
    all: {
      title: "전체 게시판",
      description: "전체 게시글을 확인할 수 있는 게시판입니다."
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      console.log("패치 시작");
      console.log("보드타입 출력: ", boardType);
      try {
        let data;
        if (boardType === "band") {
          data = await postApi.getPostsByKind(postsPerPage, currentPage - 1, "밴드 구인");
        } else if(boardType === "lesson"){
          data = await postApi.getPostsByKind(postsPerPage, currentPage - 1, "과외 구인");
        }
        else{
          data = await postApi.getAllPosts(postsPerPage, currentPage - 1);
        }
        
        // 닉네임도 함께 가져오는 예시
        const fetchedNicknames = data.nickname || [];
        
        setPosts(data.post || []); // 게시글 데이터 설정
        setNicknames(fetchedNicknames); // 닉네임 데이터 설정
        setTotalPages(Math.ceil(data.total / postsPerPage)); // 페이지 총 개수 설정
      } catch (error) {
        console.error("에러에러");
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [boardType, currentPage]);

  const handleSearch = async (keyword) => {
    console.log('Searching:', keyword);
    try {
      const data = await postApi.searchPosts(boardType, keyword, postsPerPage, currentPage - 1);
      setPosts(data.post || []);
      setNicknames(data.nickname || []);
      setTotalPages(Math.ceil(data.total / postsPerPage));
    } catch (error) {
      console.error('Error searching posts:', error);
    }
  };

  const getCurrentPagePosts = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return posts.slice(startIndex, startIndex + postsPerPage);
  };

  // posts와 nicknames를 합침
  const postsWithNicknames = posts.map((post, index) => ({
    ...post,
    nickname: nicknames[index] || "익명",  // nickname 배열을 순차적으로 매칭, 없으면 "익명"으로 설정
  }));

  return (
    <BoardTemplate
      title={boardTypes[boardType]?.title || "게시판"}
      posts={postsWithNicknames}  // 수정된 postsWithNicknames 전달
      onSearch={handleSearch}
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      boardType={boardType}
    />
  );
};

export default BoardPage;