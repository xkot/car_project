import $ from 'jquery';
import template from '../templates/admin-main.ejs';
import addCar from './new-car';
import {linkHandler} from '../linkHandler';
import page from 'page';

export default function() {
    linkHandler();
    const content = template();
    $('#app').html(content);
    $( document ).ready(function () {
        page('/new', addCar);
    });
}