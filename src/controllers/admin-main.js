import $ from 'jquery';
import filtertemplate from '../view/templates/filter.ejs';
import listTemplate from '../view/templates/admin-components/car-list.ejs';
import template from '../view/templates/admin-main.ejs';
import {findCars} from '../service/api';
import {getCars} from '../service/api';
import {removeCar} from '../service/api';
import {setRandom} from '../service/api';

export default function() {
    const content = template();
    $('#app').html(content);
    const filter = filtertemplate();
    const filterBlock = $('.filterBlock');
    filterBlock.html(filter);
    filterBlock.on('click', '#manual', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        }
        else {
            $(this).addClass('active');
            $('#auto').removeClass('active');
        }
    });
    filterBlock.on('click', '#auto', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        }
        else {
            $(this).addClass('active');
            $('#manual').removeClass('active');
        }
    });
    filterBlock.on('submit', function (e) {
        let filterValue = '';
        filterValue += 'brand=' + $('#brand').val();
        filterValue += '&model=' + $('#model').val();
        filterValue += '&fromPrice=' + $('#minPrice').val();
        filterValue += '&toPrice=' + $('#maxPrice').val();
        filterValue += '&minMileage=' + $('#minMileage').val();
        filterValue += '&maxMileage=' + $('#maxMileage').val();
        filterValue += '&transmission=' + ($('#transmission').children('.active').attr('id') || '');
        document.location.href = `/admin/search?${filterValue}`;
        e.preventDefault();
    });
    showList();
}

function showList() {
    const contentPlace = $('#list');
    if (findCars()) {
        let carsArray = getCars();
        if (document.location.search) {
            let search = document.location.search;
            let searchValue = search.substr(1);
            let arrSearch = searchValue.split('&');
            let carBrand = arrSearch[0].substr(6);
            let carModel = arrSearch[1].substr(6);
            let minPrice = arrSearch[2].substr(10);
            let maxPrice = arrSearch[3].substr(8);
            let minMileage = arrSearch[4].substr(11);
            let maxMileage = arrSearch[5].substr(11);
            let transmission = arrSearch[6].substr(13);
            if (carBrand) {
                carsArray = carsArray.filter(function (car) {
                    return car.brand.toUpperCase() === carBrand.toUpperCase();
                });
            }
            if (carModel) {
                carsArray = carsArray.filter(function (car) {
                    return car.model.toUpperCase() === carModel.toUpperCase();
                });
            }
            if (minPrice) {
                carsArray = carsArray.filter(function (car) {
                    return Number(car.price) >= Number(minPrice);
                });
            }
            if (maxPrice) {
                carsArray = carsArray.filter(function (car) {
                    return Number(car.price) <= Number(minPrice);
                });
            }
            if (minMileage) {
                carsArray = carsArray.filter(function (car) {
                    return Number(car.mileage) >= Number(minMileage);
                });
            }
            if (maxMileage) {
                carsArray = carsArray.filter(function (car) {
                    return Number(car.mileage) <= Number(maxMileage);
                });
            }
            if (transmission) {
                if (transmission === 'auto') {
                    carsArray = carsArray.filter(function (car) {
                        return car.transmission === 'Автомат';
                    });
                }
                else {
                    carsArray = carsArray.filter(function (car) {
                        return car.transmission === 'Механика';
                    });
                }
            }
            $('#brand').val(carBrand);
            $('#model').val(carModel);
            $('#minPrice').val(minPrice);
            $('#maxPrice').val(maxPrice);
            $('#minMileage').val(minMileage);
            $('#maxMileage').val(maxMileage);
        }
        const list = listTemplate({
            cars: carsArray
        });
        contentPlace.html(list);
        $(document).ready(function () {
            let table = $('table');
            $('tr').hover(function() {
                let currentTd = $(this).children('td:last-child');
                currentTd.children('.deleteButton').removeClass('hidden');
                currentTd.children('.editButton').removeClass('hidden');
            },
                function() {
                    let currentTd = $(this).children('td:last-child');
                    currentTd.children('.deleteButton').addClass('hidden');
                    currentTd.children('.editButton').addClass('hidden');
                },
            );
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