const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// blog schema of the database
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true, // this means that the title is required
    },

    snippet: {
      type: String,
      required: true, // this means that the snippet is required
    },

    body: {
      type: String,
      required: true, // this means that the body is required
    },
  },
  { timestamps: true }
);

// model
// the first argument is the name of the collection in the database and it pluralizes it
// i.e. Blog becomes blogs

// the second argument is the schema i.e the model of the collection
const Blog = mongoose.model('Blog', blogSchema);

// export the model
module.exports = Blog;
