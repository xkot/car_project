import $ from 'jquery';
import buildFilter from '../controllers/filter-block';
import filtration from '../controllers/filtration';
import template from '../view/templates/index.ejs';
import listTemplate from '../view/templates/main-components/car-list-view.ejs';
import searchTemplate from '../view/templates/search-results.ejs';
import {getCars} from '../service/api';

export default function() {
    const content = template();
    $('#app').html(content);
    buildFilter();
    if (!document.location.search) {
        const allCars = getCars();
        allCars.sort(function (current, next) {
            return next.views - current.views;
        });
        if (allCars[3]) {
            let carTr1 = new Array(4);
            let cars = new Array(4);
            for (let i = 0; i < 4; i++) {
                carTr1[i] = allCars[i];
            }
            cars[0]=carTr1;
            if (allCars[7]) {
                let carTr2 = new Array(4);
                for (let i = 4; i < 8; i++) {
                    carTr2[i] = allCars[i];
                }
                cars[1]=carTr2;
                if (allCars[11]) {
                    let carTr3 = new Array(4);
                    for (let i = 8; i < 12; i++) {
                        carTr3[i] = allCars[i];
                    }
                    cars[2]=carTr3;
                    if (allCars[15]) {
                        let carTr4 = new Array(4);
                        for (let i = 12; i < 16; i++) {
                            carTr4[i] = allCars[i];
                        }
                        cars[3] = carTr4;
                        if (allCars[19]) {
                            let carTr5 = new Array(4);
                            for (let i = 16; i < 20; i++) {
                                carTr5[i] = allCars[i];
                            }
                            cars[4] = carTr5;
                        }
                    }
                }
            }
            const listView = listTemplate({
                carTr: cars
            });
            $('#listView').html(listView);
            $('#carList').on('click', 'td', function () {
                const id = $(this).attr('id');
                document.location.href = `/car#${id}`;
            });
        }
    }
    else {
        let foundCars = filtration();
        const searchList = searchTemplate({
            cars: foundCars,
            carAmount: foundCars.length
        });
        $('#listView').html(searchList);
        $('.carTr').on('click', function () {
            const id = $(this).attr('id');
            document.location.href = `/car#${id}`;
        });
    }
    $('#searchInput').on('change', function () {
        let searchValue = $('#searchInput').val();
        document.location.href = `/search?${searchValue}`;
    });
}
