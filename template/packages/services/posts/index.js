const express = require('express');

const app = express();

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});
