const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.route');
const homeRoutes = require('./home.route');
const noteRoutes = require('./note.route');

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

Routes.forEach((route)=>{
    router.use(route.path, route.route);
});

module.exports = router;