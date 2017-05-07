import $ from 'jquery';
import template from '../view/templates/index.ejs';
import listTemplate from '../view/templates/main-components/car-list-view.ejs';
import {getCars} from '../service/api';

export default function() {
    const content = template();
    $('#app').html(content);
    const allCars = getCars();
    console.log(allCars);
    console.log(allCars[4]);

    if (allCars[4]) {
        let carTr1 = new Array(5);
        let cars = new Array(5);
        for (let i = 0; i < 5; i++) {
            carTr1[i] = allCars[i];
        }
        cars[0]=carTr1;
        if (allCars[9]) {
            let carTr2 = new Array(5);
            for (let i = 5; i < 10; i++) {
                carTr2[i] = allCars[i];
            }
            cars[1]=carTr2;
            if (allCars[14]) {
                let carTr3 = new Array(5);
                for (let i = 10; i < 15; i++) {
                    carTr3[i] = allCars[i];
                }
                cars[2]=carTr3;
                if (allCars[19]) {
                    let carTr4 = new Array(5);
                    for (let i = 15; i < 20; i++) {
                        carTr4[i] = allCars[i];
                    }
                    cars[3] = carTr4;
                    if (allCars[24]) {
                        let carTr5 = new Array(5);
                        for (let i = 20; i < 25; i++) {
                            carTr5[i] = allCars[i];
                        }
                        cars[4] = carTr5;
                    }
                }
            }
        }
        console.log(cars);
        const listView = listTemplate({
            carTr: cars
        });
        $('#listView').html(listView);
    }
}
