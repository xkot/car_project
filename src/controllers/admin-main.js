import $ from 'jquery';
import listTemplate from '../view/templates/admin-components/car-list.ejs';
import template from '../view/templates/admin-main.ejs';
import {checkStorage} from '../service/api';
import {getCars} from '../service/api';

export default function() {
    const content = template();
    $('#app').html(content);
    if (checkStorage()) {
        const carsArray = getCars();
        const list = listTemplate({
            cars: carsArray
        });
        $('#app').append(list);
        // $('table').on('hover', '.carTr', function (event) {
        //      let target = event.target;
        //      console.log(target);
        //      $('target .deleteButton').show();
        // });
    }
    else {
        $('#app').append('<h2>База машин отсутствует.</h2>');
    }
}