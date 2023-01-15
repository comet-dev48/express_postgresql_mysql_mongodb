const Blog = require('../models/Blog');

const getAllBlog = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.send(blogs);
    } catch (error) {
        throw new Error('internal server error')
    }
};

const createBlog = async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        category: req.body.category
    });

    try {
        const result = await blog.save().then(() => console.log("created successfully.")).catch((err) => { console.error(err) });
        res.send(result);
    } catch (error) {
        throw new Error('internal server error')
    }
};

const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.blog_id);
        res.send(blog);
    } catch (error) {
        throw new Error('internal server error');
    }
};

const updateBlogById = async (req, res) => {
    const blog = await Blog.findById(req.params.blog_id)
    try {
        blog.title = req.body.title;
        blog.content = req.body.content;
        blog.category = req.body.category;

        await blog.save().then(() => { console.log("updated successfully."); res.send({ ok: true }) }).catch((err) => { console.error(err) });
        // const blog = await Blog.findByIdAndUpdate().then(()=>console.log("updated successfully."));
    } catch (error) {
        throw new Error('internal server error');
    }
};

const deleteBlogById = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.blog_id).then(() => { console.log("deleted successfully."); res.send({ ok: true }) }).catch((err) => { console.error(err) });
    } catch (error) {
        throw new Error('internal server error');
    }
};

module.exports = {
    getAllBlog,
    createBlog,
    getBlogById,
    updateBlogById,
    deleteBlogById
};