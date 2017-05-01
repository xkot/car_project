import $ from 'jquery';
import template from '../view/templates/admin-main.ejs';
import addCar from './edit-car-page';
//import {linkHandler} from '../linkHandler';
import page from 'page';

export default function() {
    //linkHandler();
    const content = template();
    $('#app').html(content);
    /*$( document ).ready(function () {
        page('/new', addCar);
    });*/
}