import {linkHandler} from './linkHandler';
import carDetailsController from './controllers/car-details';
import admin from './controllers/admin-main';
import page from 'page';

linkHandler();
page('/admin', admin);
page('/car/:id', carDetailsController);