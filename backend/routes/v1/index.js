const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth.route');
const homeRoutes = require('./home.route');
const noteRoutes = require('./note.route');

// Define all API routes and associate them with their respective modules
const Routes = [
    {
        path:'/',
        route:homeRoutes,
    },
    {
        path:'/auth',
        route:authRoutes,
    },
    {
        path:'/note',
        route:noteRoutes,
    },
];

// Register all routes with their paths on the main router
Routes.forEach((route)=>{
    router.use(route.path, route.route);
});

module.exports = router;