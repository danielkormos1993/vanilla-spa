import TrsRouter from './trs/trs-router.js';

const Router = new TrsRouter([{
    path: '/',
    component: () => import('./pages/HomePage.js'),
    layoutComponent: () => import('./layouts/MainLayout.js')
},{
    path: '/dashboard',
    component: () => import('./pages/DashboardPage.js'),
    layoutComponent: () => import('./layouts/MainLayout.js')
},{
    path: '/contact',
    component: () => import('./pages/ContactPage.js'),
    layoutComponent: () => import('./layouts/MainLayout.js')
}]);

Router.run();