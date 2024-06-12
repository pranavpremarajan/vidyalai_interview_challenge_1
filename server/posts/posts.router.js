const express = require('express');
const { fetchPosts, fetchPostImages } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  const { start, limit } = req.query;

  const posts = await fetchPosts({ start, limit });

  const postsWithImagesPromises = posts.map(async post => {
    const postImages = await fetchPostImages({ postId: post.id });
    const user = await fetchUserById(post.userId);
    return {
      ...post,
      user,
      images: postImages,
    };
  });

  const postsWithImages = await Promise.all(postsWithImagesPromises);

  res.json(postsWithImages);
});

module.exports = router;
