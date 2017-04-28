import $ from 'jquery';
import template from '../templates/new-car.ejs';

export default function() {
    const content = template();
    $('#app').html(content);
    $( 'form' ).on( 'submit', function( event ) {
        saveCar();
        event.preventDefault();
    });
}

function saveCar () {
    let newCar = new Object(null);
    newCar.brand = $( '#carBrand option:selected' ).text();
    newCar.model = $( '#carModel option:selected' ).text();
    newCar.mileage = $( '#mileage' ).val();
    newCar.gas = $( '#gas:radio' );
    console.log (newCar.gas);
    newCar.capacity = $( '#capacity' ).val();
    newCar.transmission = $( '#transmission input:checked' ).val();
    newCar.about = $( '#about' ).val();
}