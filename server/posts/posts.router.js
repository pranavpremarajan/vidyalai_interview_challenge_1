const express = require('express');
const { fetchPosts, fetchPostImages } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await fetchPosts();

  const postsWithImagesPromises = posts.map(async post => {
    const postImages = await fetchPostImages({ postId: post.id });
    return {
      ...post,
      images: postImages,
    };
  });

  const postsWithImages = await Promise.all(postsWithImagesPromises);

  res.json(postsWithImages);
});

module.exports = router;
