import { TrsRouter } from './trs-spa.js';
import './trs/layout/trds-layout.js';

const Router = new TrsRouter([{
    path: '/',
    view: () => import('./views/Home.js'),
    layout: () => import('./layouts/MainLayout.js')
},{
    path: '/jegkarjavitas',
    view: () => import('./views/Dashboard.js'),
    layout: () => import('./layouts/MainLayout.js')
},{
    path: '/horpadasjavitas',
    view: () => import('./views/Contact.js'),
    layout: () => import('./layouts/MainLayout.js')
},{
    path: '/kapcsolat',
    view: () => import('./views/Login.js')
}]);

Router.run();