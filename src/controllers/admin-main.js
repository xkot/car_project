import $ from 'jquery';
import listTemplate from '../view/templates/admin-components/car-list.ejs';
import template from '../view/templates/admin-main.ejs';
import {findCars} from '../service/api';
import {getCars} from '../service/api';
import {removeCar} from '../service/api';
import {setRandom} from '../service/api';

export default function() {
    const content = template();
    $('#app').html(content);
    showList();
}

function showList() {
    const contentPlace = $('#list');
    if (findCars()) {
        const carsArray = getCars();
        const list = listTemplate({
            cars: carsArray
        });
        contentPlace.html(list);
        $(document).ready(function () {
            let table = $('table');
            table.filter('.deleteButton').className = 'hidden';
            table.on('click', '.deleteButton', function () {
                if (confirm('Вы уверены, что хотите удалить данную запись?')) {
                    const id = $(this).parent().attr('id');
                    removeCar(id);
                    showList();
                }
            });
            table.on('click', '.editButton', function () {
                const id = $(this).parent().attr('id');
                document.location.href = `/admin/edit#${id}`;
            });
        });
    }
    else {
        contentPlace.html('<h4>База машин отсутствует.</h4>');
        contentPlace.append('<button>Заполнить случайными</button>');
        $(document).ready(function () {
            $('button').on('click', setRandom);
        });
    }
}