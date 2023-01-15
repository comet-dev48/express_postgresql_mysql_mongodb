const pool = require('../../db/postgresql');

const getAllBlog = async (req, res) => {
    try {

        const query = `select * from blogs`;

        const result = await pool.query(query);
        const blog = result.rows;

        res.send(blog);
    } catch {
        if(!err.statusCode) err.statusCode = 500;
        res.status(err.statusCode).send(err.message);
    }
}

const createBlog = async (req, res) => {
    try {

        const query = `INSERT INTO blogs(title,content,category) values ($1,$2,$3) RETURNING *;`

        const result = await pool.query(
            query,
            [
                req.body.title,
                req.body.content,
                req.body.category,
            ]
        );
        const blog = result.rows[0];

        res.send(blog);
    } catch {
        if(!err.statusCode) err.statusCode = 500;
        res.status(err.statusCode).send(err.message);
    }
}

const getBlogById = async (req, res) => {
    try {

        const query = `select * from blogs where id=$1`;

        const result = await pool.query(query,[req.params.blog_id]);
        const blog = result.rows[0];

        res.send(blog);
    } catch(err) {
        if(!err.statusCode) err.statusCode = 500;
        res.status(err.statusCode).send(err.message);
    }
}

const updateBlogById = async (req, res) => {
    try {

        const query = `update blogs set title = $2, content = $3, category = $4 where id=$1`;

        const result = await pool.query(query,[req.params.blog_id, req.body.title, req.body.content, req.body.category]);
        const blog = result.rows[0];
    
        res.send(blog);
    } catch(err) {
        if(!err.statusCode) err.statusCode = 500;
        res.status(err.statusCode).send(err.message);
    }
}
const deleteBlogById = async (req, res) => {
    try {

        const query = `delete from blogs where id=$1`;

        const result = await pool.query(query,[req.params.blog_id]);
        const blog = result.rows[0];
    
        res.send(blog);
    } catch(err) {
        if(!err.statusCode) err.statusCode = 500;
        res.status(err.statusCode).send(err.message);
    }
}

module.exports = {
    getAllBlog,
    createBlog,
    getBlogById,
    updateBlogById,
    deleteBlogById
};