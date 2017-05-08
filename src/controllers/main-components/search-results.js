import $ from 'jquery';
import elasticlunr from 'elasticlunr';
import searchTemplate from '../../view/templates/main-components/search-results.ejs';
import {getCarById} from '../../service/api';
import {getCars} from '../../service/api';

export default function() {
    let search = document.location.search;
    let searchValue = search.substr(1);
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
    const searchResult = index.search(searchValue);
    console.log(searchResult);
    let foundCars = [];
    searchResult.forEach(function (element, i) {
        let id = element.ref;
        foundCars[i] = getCarById(id);
    });
    const searchList = searchTemplate({
        cars: foundCars,
        carAmount: foundCars.length
    });
    $('#app').html(searchList);
}