const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {};

app.get('/posts/:postId/comments', (req, res) => {
  res.send(commentsByPostId[req.params.postId] || []);
});

app.post('/posts/:postId/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { postId } = req.params;
  const { content } = req.body;
  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content });
  commentsByPostId[postId] = comments;
  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log('listening on port 4001');
});
