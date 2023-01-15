const express = require('express');
const blogRoute = require('./blog.route');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/blogs',
        route: blogRoute
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
