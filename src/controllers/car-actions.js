import {Car} from '../models/car';
import $ from 'jquery';

let id = 0;
function getCarInfo () {
    let brand = $( '#carBrand option:selected' ).text();
    let model = $( '#carModel option:selected' ).text();
    let mileage = $( '#mileage' ).val();
    let gas = $( '#gasoline:radio:checked' ).val();
    console.log (gas);
    let capacity = $( '#capacity' ).val();
    let transmission = $( '#transmission input:checked' ).val();
    console.log (gas);
    let about = $( '#about' ).val();
    let newCar = new Car(brand, model, mileage, gas, transmission, capacity, about, id, /*photo*/);
    id ++;
    return newCar;
};

export {
    getCarInfo
}