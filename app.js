const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

// connect to mongoDB
const dbURI = 'mongodb+srv://netninjaCourse:test1234@nodetutorial.jofhapd.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    (
      result // listen for requests
    ) =>
      app.listen(3000, () => {
        console.log('listening on port');
      })
  )
  .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// for different folders
// app.set('views', 'myviews');

// listen for requests
// app.listen(3000, () => {
//   console.log('listening on port', port, server);
// });

// middleware & static files
app.use(express.static('public')); // specifying public here makes all files in the public folder available to the browser so that's how we were able to use styles.
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//   // create a new instance of the blog model
//   const blog = new Blog({
//     title: 'new blog 2',
//     snippet: 'about my new blog',
//     body: 'more about my new blog',
//   });

//   // save the blog to the database
//   blog.save().then((result) => {
//     res.send(result).catch((err) => console.log(err));
//   });
// });

// // retrieve all blogs saved in the database
// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });

// // finding a single blog or specific blog
// app.get('/single-blog', (req, res) => {
//   // id passed here is the id of a specific blog in the database
//   Blog.findById('64b719c8fa0a5b0f3196ea87')
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });

// listen for the get request
app.get('/', (req, res) => {
  // res.send('<p>home page</p>');
  // res.sendFile('./views/index.html', { root: __dirname });

  // const blogs = [
  //   { title: 'Yoshi finds eggs', snippet: 'lorem ipsum dolor sit aet consecutur' },
  //   { title: 'Mario finds stars', snippet: 'lorem ipsum dolor sit aet consecutur' },
  //   { title: 'How to defeat the browser', snippet: 'lorem ipsum dolor sit aet consecutur' },
  // ];
  // // renders the homepage
  // res.render('index', { title: 'Home', blogs });

  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  // res.send('<p>about page</p>');
  // res.sendFile('./views/about.html', { root: __dirname });
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new Blog' });
});

// blog routes
app.get('/blogs', (req, res) => {
  // retrieve all blogs from the database
  Blog.find()
    .sort({ createdAt: -1 }) // sort by the date created in descending order
    .then((result) => {
      res.render('index', { title: 'All Blogs', blogs: result });
    })
    .catch((err) => console.log(err));
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
