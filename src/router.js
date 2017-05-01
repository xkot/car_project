import $ from 'jquery';
import page from 'page';
import carDetailsController from './controllers/car-details';
import admin from './controllers/admin-main';
import addCar from './controllers/edit-car-page';
import main from './controllers/main';

    $(document).on('click', 'a[href^="/"]', function (e) {
        const href = $(e.currentTarget).attr('href');
        switch (href) {
            case '/admin':
                page('/admin', admin);
                break;
            case '/car/:id':
                page('/car/:id', carDetailsController);
                break;
            case '/new':
                page('/new', addCar);
                break;
            case '':
                page('', main);
                break;
        }
        e.preventDefault();

    });



//export {
//    linkHandler
//}