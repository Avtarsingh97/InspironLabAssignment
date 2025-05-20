const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.route');
const homeRoutes = require('./home.route');

const Routes = [
    {
        path:'/',
        route:homeRoutes
    },
    {
        path:'/auth',
        route:authRoutes
    }
];

Routes.forEach((route)=>{
    router.use(route.path, route.route);
});

module.exports = router;