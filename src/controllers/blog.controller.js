const Blog = require('../models/Blog');
const AppError = require('../utils/AppError');

const getAllBlog = async (req, res, next) => {
    try {
        const blogs = await Blog.find();
        res.send(blogs);
    } catch (err) {
        next(new AppError(err, 500));
    }
};

const createBlog = async (req, res, next) => {
    const blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        category: req.body.category
    });

    try {
        const result = await blog.save().then(() => console.log("created successfully.")).catch((err) => { console.error(err) });
        res.send(result);
    } catch (err) {
        next(new AppError(err, 500));
    }
};

const getBlogById = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.blog_id);
        res.send(blog);
    } catch (err) {
        next(new AppError(err, 500));
    }
};

const updateBlogById = async (req, res, next) => {
    const blog = await Blog.findById(req.params.blog_id)
    try {
        blog.title = req.body.title;
        blog.content = req.body.content;
        blog.category = req.body.category;

        await blog.save().then(() => { console.log("updated successfully."); res.send({ ok: true }) }).catch((err) => { console.error(err) });
        // const blog = await Blog.findByIdAndUpdate().then(()=>console.log("updated successfully."));
    } catch (err) {
        next(new AppError(err, 500));
    }
};

const deleteBlogById = async (req, res, next) => {
    try {
        await Blog.findByIdAndDelete(req.params.blog_id).then(() => { console.log("deleted successfully."); res.send({ ok: true }) }).catch((err) => { console.error(err) });
    } catch (err) {
        next(new AppError(err, 500));
    }
};

module.exports = {
    getAllBlog,
    createBlog,
    getBlogById,
    updateBlogById,
    deleteBlogById
};