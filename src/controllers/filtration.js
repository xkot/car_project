import $ from 'jquery';
import elasticlunr from 'elasticlunr';
import {getCars} from '../service/api';
import {getCarById} from '../service/api';

export default function() {
    const filterBlock = $('.filterBlock');
    let search = document.location.search;
    let searchValue = search.substr(1);
    let arrSearch = searchValue.split('&');
    let foundCars = [];
    let carBrand;
    let carModel;
    let minPrice;
    let maxPrice;
    let minMileage;
    let maxMileage;
    let transmission;
    if (arrSearch.length === 1) {
        let allCars = getCars();
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
        carBrand = arrSearch[0].substr(6);
        carModel = arrSearch[1].substr(6);
        minPrice = arrSearch[2].substr(10);
        maxPrice = arrSearch[3].substr(8);
        minMileage = arrSearch[4].substr(11);
        maxMileage = arrSearch[5].substr(11);
        transmission = arrSearch[6].substr(13);
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
                return Number(car.price) <= Number(maxPrice);
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
        if (transmission) {
            if (transmission === 'auto') {
                foundCars = foundCars.filter(function (car) {
                    return car.transmission === 'Автомат';
                });
            }
            else {
                foundCars = foundCars.filter(function (car) {
                    return car.transmission === 'Механика';
                });
            }
        }
        if (document.location.search) {
            $('#brand').val(carBrand);
            $('#model').val(carModel);
            $('#minPrice').val(minPrice);
            $('#maxPrice').val(maxPrice);
            $('#minMileage').val(minMileage);
            $('#maxMileage').val(maxMileage);
        }
    }
    return foundCars;
}

