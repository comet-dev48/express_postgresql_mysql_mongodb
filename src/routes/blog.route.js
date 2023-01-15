const express = require('express');
// const blogController = require('../controllers/blog.controller'); // for mongodb
const blogController = require('../controllers/postgresql/blog.controller'); // for postgresql

const router = express.Router();

router.route('/')
    .get(blogController.getAllBlog)
    .post(blogController.createBlog);

router.route('/:blog_id')
    .get(blogController.getBlogById)
    .patch(blogController.updateBlogById)
    .delete(blogController.deleteBlogById);


module.exports = router;