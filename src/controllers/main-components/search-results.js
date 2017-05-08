import $ from 'jquery';
import elasticlunr from 'elasticlunr';
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
        const searchResult = index.search(searchValue);
        searchResult.forEach(function (element, i) {
            let id = element.ref;
            foundCars[i] = getCarById(id);
        });
    }
    else {
        let carBrand = arrSearch[0];
        let carModel = arrSearch[1];
        let filterResult = [];
        if (carBrand) {
            alert(carBrand);
            filterResult = index.search({
                brand: carBrand
            });
        }
        if (carModel) {
            alert(carModel);
            filterResult = index.search({
                model: carModel
            });
        }
        filterResult.forEach(function (element, i) {
            let id = element.ref;
            foundCars[i] = getCarById(id);
        });
    }

    const searchList = searchTemplate({
        cars: foundCars,
        carAmount: foundCars.length
    });
    $('#app').html(searchList);
}