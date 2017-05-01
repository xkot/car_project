import $ from 'jquery';
import template from '../view/templates/edit-car-page.ejs';
import {getCarInfo} from './car-actions';

export default function() {
    const content = template();
    $('#app').html(content);
    $( 'form' ).on( 'submit', function( event ) {
        let newCar = getCarInfo();
        console.log (newCar);
        event.preventDefault();
    });
}

