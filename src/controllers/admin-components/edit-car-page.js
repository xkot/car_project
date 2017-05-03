import $ from 'jquery';
import {addCar} from '../../service/api';
import {Car} from '../../models/car';
import template from '../../view/templates/admin-components/edit-car-page.ejs';

export default function() {
    const content = template();
    $('#app').html(content);
    $( 'form' ).on( 'submit', function(e) {
        let newCar = getCarInfo();
        addCar(newCar);
        console.log (newCar);
        e.preventDefault();
    });
    $( 'form' ).on( 'reset', function(e) {
        let reset = confirm('Вы уверены, что хотите удалить введенные данные?');
        if (!reset) {
            e.preventDefault();
        }
    });
}

function getCarInfo () {
    let options = new Object(null);
    options.brand = $( '#carBrand option:selected' ).text();
    options.model = $( '#carModel option:selected' ).text();
    options.mileage = $( '#mileage' ).val();
    options.gasoline = $( '#gasoline input:checked' ).val();
    options.capacity = $( '#capacity' ).val();
    options.transmission = $( '#transmission input:checked' ).val();
    options.price = $( '#price' ).val();
    options.about = $( '#about' ).val();
    let newCar = new Car(options);
    return newCar;
};
