const express = require('express');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// for different folders
// app.set('views', 'myviews');

// listen for requests
app.listen(3000);

app.use((req, res, next) => {
  console.log('new request made');
  console.log('host:', req.hostname);
  console.log('path:', req.path);
  console.log('method:', req.method);
  next();
});

app.use((req, res, next) => {
  console.log('in the next middleware');
  next();
});

// listen for the get request
app.get('/', (req, res) => {
  // res.send('<p>home page</p>');
  // res.sendFile('./views/index.html', { root: __dirname });

  const blogs = [
    { title: 'Yoshi finds eggs', snippet: 'lorem ipsum dolor sit aet consecutur' },
    { title: 'Mario finds stars', snippet: 'lorem ipsum dolor sit aet consecutur' },
    { title: 'How to defeat the browser', snippet: 'lorem ipsum dolor sit aet consecutur' },
  ];
  // renders the homepage
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  // res.send('<p>about page</p>');
  // res.sendFile('./views/about.html', { root: __dirname });
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new Blog' });
});

// redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

// 404 page (this is must be the last get request because it runs the code top to bottom and only if the other values aren't met then the 404 page should be sent to the browser)
app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html', { root: __dirname });
  res.status(404).render('404', { title: '404' });
});
