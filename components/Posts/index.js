import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import { WindowWidthContext } from '../../context/windowWidthContext';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isSmallerDevice = useContext(WindowWidthContext);

  const [start, setStart] = useState(0);

  const limit = isSmallerDevice ? 5 : 10;

  const fetchPost = async () => {
    setIsLoading(true);
    const { data: postsData } = await axios.get('/api/v1/posts', {
      params: { start, limit },
    });
    setIsLoading(false);
    setPosts(posts.concat(postsData));
  };

  useEffect(() => {
    fetchPost();
  }, [isSmallerDevice, start]);

  const handleClick = () => {
    setStart(start + limit);
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map(post => (
          <Post post={post} />
        ))}
      </PostListContainer>

      {posts.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        </div>
      )}
    </Container>
  );
}
