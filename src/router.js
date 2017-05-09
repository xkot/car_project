import $ from 'jquery';
import page from 'page';
import admin from './controllers/admin-main';
import carDetails from './controllers/main-components/car-details';
import editCar from './controllers/admin-components/edit-car-page';
import index from './controllers/index';
import searchCar from './controllers/main-components/search-results';

$(document).on('click', 'a[href^="/"]', function (e) {
    const href = $(e.currentTarget).attr('href');
    page(href);
    e.preventDefault();
});

$(window).on('load', function (e) {
    const href = window.location.pathname + window.location.search + window.location.hash;
    page.replace(href);
    e.preventDefault();
});

$(window).on('popstate', function (e) {
    const href = window.location.pathname + window.location.search + window.location.hash;
    page.replace(href);
    e.preventDefault();
});

page('/admin', admin);
page('/admin/new', editCar);
page('/admin/edit*', editCar);
page('/admin/search*', admin);
page('/car*', carDetails);
page('/search*', searchCar);
page('/', index);