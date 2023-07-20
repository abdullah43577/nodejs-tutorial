const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongoDB
const dbURI = 'mongodb+srv://netninjaCourse:test1234@nodetutorial.jofhapd.mongodb.net/node-tuts?retryWrites=true&w=majority';

const database = async function () {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('connected to database');
    app.listen(3000, () => {
      console.log('listening on port');
    });
  } catch (err) {
    console.log(err);
  }
};

database();

// register view engine
app.set('view engine', 'ejs');

// for different folders
// app.set('views', 'myviews');

// middleware & static files
app.use(express.static('public')); // specifying public here makes all files in the public folder available to the browser so that's how we were able to use styles.
app.use(express.urlencoded({ extended: true })); // for accepting form data
app.use(morgan('dev')); // logs details to the console for every request made to the browser // morgan('tiny')

// listen for the get request
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  // res.send('<p>about page</p>');
  // res.sendFile('./views/about.html', { root: __dirname });
  res.render('about', { title: 'About' });
});

// blog routes
app.use(blogRoutes);

// redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

// 404 page (this is must be the last get request because it runs the code top to bottom and only if the other values aren't met then the 404 page should be sent to the browser)
app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html', { root: __dirname });
  res.status(404).render('404', { title: '404' });
});

// GET - requests to get a resource
// POST - requests to create new data (e.g a new blog)
// DELETE - requests to delete data (e.g delete a blog)
// PUT - requests to update data (e.g update a blog)
