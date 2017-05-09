import $ from 'jquery';
import elasticlunr from 'elasticlunr';
import filtertemplate from '../../view/templates/filter.ejs';
import searchTemplate from '../../view/templates/main-components/search-results.ejs';
import {getCarById} from '../../service/api';
import {getCars} from '../../service/api';

export default function() {
    let search = document.location.search;
    let searchValue = search.substr(1);
    let arrSearch = searchValue.split('*');
    const allCars = getCars();
    let index = elasticlunr(function () {
        this.addField('brand');
        this.addField('model');
        this.addField('year');
        this.setRef('id');
    });
    allCars.forEach(function (car) {
        index.addDoc(car);
    });
    let foundCars = [];
    if (arrSearch.length === 1) {
        const searchResult = index.search({
            brand: searchValue,
        });
        searchResult.forEach(function (element, i) {
            let id = element.ref;
            foundCars[i] = getCarById(id);
        });
    }
    else {
        foundCars = getCars();
        let carBrand = arrSearch[0];
        let carModel = arrSearch[1];
        let minPrice = arrSearch[2];
        let maxPrice = arrSearch[3];
        let minMileage = arrSearch[4];
        let maxMileage = arrSearch[5];
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
    }

    const searchList = searchTemplate({
        cars: foundCars,
        carAmount: foundCars.length
    });
    $('#app').html(searchList);

    $(document).ready(function () {
        const filter = filtertemplate();
        const filterBlock = $('.filterBlock');
        filterBlock.html(filter);
        filterBlock.on('submit', function (e) {
            let filterValue = '';
            filterValue += $('#brand').val() + '*';
            filterValue += $('#model').val() + '*';
            filterValue += $('#minPrice').val() + '*';
            filterValue += $('#maxPrice').val() + '*';
            filterValue += $('#minMileage').val() + '*';
            filterValue += $('#maxMileage').val();
            document.location.href = `/search?${filterValue}`;
            e.preventDefault();
        })
    });
}