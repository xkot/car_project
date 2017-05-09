import $ from 'jquery';
import elasticlunr from 'elasticlunr';
import filtertemplate from '../view/templates/filter.ejs';
import template from '../view/templates/index.ejs';
import listTemplate from '../view/templates/main-components/car-list-view.ejs';
import searchTemplate from '../view/templates/main-components/search-results.ejs';
import {getCars} from '../service/api';

export default function() {
    const content = template();
    $('#app').html(content);
    const filter = filtertemplate();
    const filterBlock = $('.filterBlock');
    filterBlock.html(filter);
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
        let search = document.location.search;
        let searchValue = search.substr(1);
        let arrSearch = searchValue.split('&');
        let foundCars = [];
        if (arrSearch.length === 1) {
            let index = elasticlunr(function () {
                this.addField('brand');
                this.addField('model');
                this.addField('year');
                this.setRef('id');
            });
            allCars.forEach(function (car) {
                index.addDoc(car);
            });
            const searchResult = index.search(searchValue);
            searchResult.forEach(function (element, i) {
                let id = element.ref;
                foundCars[i] = getCarById(id);
            });
        }
        else {
            foundCars = getCars();
            let carBrand = arrSearch[0].substr(6);
            let carModel = arrSearch[1].substr(6);
            let minPrice = arrSearch[2].substr(10);
            let maxPrice = arrSearch[3].substr(8);
            let minMileage = arrSearch[4].substr(11);
            let maxMileage = arrSearch[5].substr(11);
            if (carBrand) {
                foundCars = foundCars.filter(function (car) {
                    return car.brand.toUpperCase() === carBrand.toUpperCase();
                });
            }
            if (carModel) {
                foundCars = foundCars.filter(function (car) {
                    return car.model.toUpperCase() === carModel.toUpperCase();
                });
            }
            if (minPrice) {
                foundCars = foundCars.filter(function (car) {
                    return Number(car.price) >= Number(minPrice);
                });
            }
            if (maxPrice) {
                foundCars = foundCars.filter(function (car) {
                    return Number(car.price) <= Number(minPrice);
                });
            }
            if (minMileage) {
                foundCars = foundCars.filter(function (car) {
                    return Number(car.mileage) >= Number(minMileage);
                });
            }
            if (maxMileage) {
                foundCars = foundCars.filter(function (car) {
                    return Number(car.mileage) <= Number(maxMileage);
                });
            }
            $('#brand').val(carBrand);
            $('#model').val(carModel);
            $('#minPrice').val(minPrice);
            $('#maxPrice').val(maxPrice);
            $('#minMileage').val(minMileage);
            $('#maxMileage').val(maxMileage);
        }
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
    filterBlock.on('submit', function (e) {
        let filterValue = '';
        filterValue += 'brand=' + $('#brand').val();
        filterValue += '&model=' + $('#model').val();
        filterValue += '&fromPrice=' + $('#minPrice').val();
        filterValue += '&toPrice=' + $('#maxPrice').val();
        filterValue += '&minMileage=' + $('#minMileage').val();
        filterValue += '&maxMileage=' + $('#maxMileage').val();
        document.location.href = `/search?${filterValue}`;
        e.preventDefault();
    });

}
