const express = require('express');
const app = express();
const port = 5501;
const host = '127.0.0.1';
 
const keywordsToUrls = {
'silver' : ['https://jsonplaceholder.typicode.com/posts/1',
'https://jsonplaceholder.typicode.com/posts/2',
 'https://jsonplaceholder.typicode.com/posts/3',
  'https://jsonplaceholder.typicode.com/posts/4',
   'https://jsonplaceholder.typicode.com/posts/5'],
'gold': ['https://jsonplaceholder.typicode.com/posts/6',
 'https://jsonplaceholder.typicode.com/posts/7',
  'https://jsonplaceholder.typicode.com/posts/8',
   'https://jsonplaceholder.typicode.com/posts/9',
    'https://jsonplaceholder.typicode.com/posts/10'],

};

app.use(express.static('public'));

app.get('/search/:keyword', (req, res) => {
  const keyword = req.params.keyword;
  const urls = keywordsToUrls[keyword];
  if (urls) {
    res.json(urls);
  } else {
    res.status(404).send('кодовое слово не найдено');
  }
});

app.listen(port, host, () => {
  console.log(`сервер стартует на http://${host}:${port}`);
});

app.get('/download/:url', async (req, res) => {
  const url = req.params.url;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const content = await response.text();
      res.send(content);
    } else {
      res.status(response.status).send(response.statusText);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});