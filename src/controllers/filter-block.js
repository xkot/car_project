import $ from 'jquery';
import 'jquery-ui-browserify';
import filtertemplate from '../view/templates/filter.ejs';

export default function() {
    const filter = filtertemplate();
    const filterBlock = $('.filterBlock');
    $('.filterBlock').html(filter);
    const brandNames = ["Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Bugatti", "Buick", "Volkswagen", "Volvo", "Lada", "Geely", "Dacia", "Daewoo", "Daihatsu", "Dodge", "Jeep", "Infiniti", "Isuzu", "IVECO", "Cadillac", "Citroen",  "Kia",  "Lamborghini", "Lancia", "Land Rover", "Lexus", "Lincoln", "Maserati", "Maybach", "McLaren", "Mercedes-Benz", "Mitsubishi", "Nissan", "Opel", "Peugeot", "Porsche", "Renault", "Rolls-Royce", "Rover", "Saab", "SEAT", "Skoda", "Smart", "Subaru", "Suzuki", "Toyota", "Ferrari", "Fiat", "Ford", "Honda", "Hummer", "Hyundai", "Chevrolet", "Chrysler", "Jaguar"];
    $('#brand').autocomplete({
        source: brandNames
    });
    filterBlock.on('click', '#manualBtn', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        }
        else {
            $(this).addClass('active');
            $('#auto').removeClass('active');
        }
    });
    filterBlock.on('click', '#autoBtn', function () {
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
        if (document.location.pathname !== '/admin') {
            document.location.href = `search?${filterValue}`;
        }
        else {
            document.location.href = `/admin/search?${filterValue}`;
        }
        e.preventDefault();
    });
}