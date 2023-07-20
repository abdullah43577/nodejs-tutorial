const Blog = require('../../models/blog');

// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = function (req, res) {
  // retrieve all blogs from the database
  Blog.find()
    .sort({ createdAt: -1 }) // sort by the date created in descending order
    .then((result) => {
      res.render('index', { title: 'All Blogs', blogs: result }); // first argument means the name of the file to render and the second argument is the object that contains the data that we want to pass to the view
    })
    .catch((err) => console.log(err));
};

const blog_details = function (req, res) {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => res.render('details', { blog: result, title: 'Blog Details' }))
    .catch((err) => res.status(404).render('404', { title: 'Blog not found!' }));
};

const blog_create_get = function (req, res) {
  res.render('create', { title: 'Create a new Blog' });
};

const blog_create_post = function (req, res) {
  console.log(req.body);
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => console.log(err));
};

const blog_delete = function (req, res) {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => res.json({ redirect: '/blogs' }))
    .catch((err) => console.log(err));
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
