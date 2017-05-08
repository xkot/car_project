import $ from 'jquery';
import 'jquery-validation';
import 'jquery-ui-browserify';
import {addCar} from '../../service/api';
import {Car} from '../../models/car';
import {editCar} from '../../service/api';
import {getCarById} from '../../service/api';
import template from '../../view/templates/admin-components/edit-car-page.ejs';

export default function () {
    const content = template();
    $('#app').html(content);
    const form = $('form');
    $(document).ready(function () {
        $('#photo').on('change', readFile);
        if (document.location.pathname === '/admin/edit') {
            const hash = document.location.hash;
            const id = hash.substr(1);
            const car = getCarById(id);
            setCarInfo(car);
        }
        form.validate({
            rules: {
                carBrand: 'required',
                carModel: 'required',
                mileage: {
                    required: true,
                    min: 0
                },
                price: {
                    required: true,
                    number: true,
                },
                capacity: {
                    required: true,
                    number: true,
                    min: 0.8,
                    max: 9
                }
            },
            messages: {
                carBrand: 'Введите название марки',
                carModel: 'Введите название модели',
                mileage: {
                    required: 'Введите пробег автомобиля'
                },
                capacity: {
                    required: 'Введите объем двигателя'
                }
            },
            submitHandler: function () {
                if (document.location.pathname === '/admin/edit') {
                    const hash = document.location.hash;
                    const id = hash.substr(1);
                    const newInfo = getCarInfo();
                    editCar(newInfo, id);
                    alert('Информация изменена');
                    document.location.href = '/admin';
                }
                else {
                    const newCar = getCarInfo();
                    addCar(newCar);
                    alert('Информация сохранена');
                    document.location.href = '/admin';
                }
            }
        });
        form.on('reset', function (e) {
            let reset = confirm('Вы уверены, что хотите удалить введенные данные?');
            if (!reset) {
                e.preventDefault();
            }
        });
        form.on('click', '#cancel', function () {
            let cancel = confirm('Вы уверены, что хотите выйти?');
            if (cancel) {
                document.location.href = '/admin';
            }
        });
        const brandNames = ["Acura", "Alfa", "Romeo", "Alpina", "Alpine", "Aro", "Asia", "Aston", "Martin", "Audi", "Austin", "BAW", "Beijing", "Bentley", "BMW", "Brilliance", "Bristol", "Bugatti", "Buick", "BYD", "Богдан", "Vector", "Venturi", "Volkswagen", "Volvo", "Vortex", "Wartburg", "Westfield", "Wiesmann", "Wuling", "ВАЗ", "(Lada)", "Geely", "Geo", "GMC", "Great", "Wall", "ГАЗ", "Dacia", "Dadi", "Daewoo", "Daihatsu", "Daimler", "Dallas", "Derways", "De", "Tomaso", "Dodge", "Dong", "Feng", "Doninvest", "Jeep", "Jiangling", "Jiangnan", "Eagle", "Zastava", "ZX", "ЗАЗ", "ЗИЛ", "Infiniti", "Innocenti", "Invicta", "Iran", "Khodro", "Isdera", "Isuzu", "IVECO", "Xin", "Kai", "ИЖ", "Cadillac", "Callaway", "Carbodies", "Caterham", "Citroen", "Cizeta", "Coggiola", "Kia", "Koenigsegg", "Qvale", "КАМАЗ", "Lamborghini", "Lancia", "Land", "Rover", "Landwind", "Lexus", "Lifan", "Lincoln", "Lotus", "LTI", "Luxgen", "ЛуАЗ", "Mahindra", "Marcos", "Marlin", "Marussia", "Maruti", "Maserati", "Maybach", "Mazda", "McLaren", "Mega", "Mercedes-Benz", "Mercury", "Metrocab", "MG", "Minelli", "Mini", "Mitsubishi", "Mitsuoka", "Monte", "Carlo", "Morgan", "Москвич", "Nissan", "Noble", "Oldsmobile", "Opel", "Pagani", "Panoz", "Paykan", "Perodua", "Peugeot", "Plymouth", "Pontiac", "Porsche", "Premier", "Proton", "Puma", "Reliant", "Renault", "Rolls-Royce", "Ronart", "Rover", "Saab", "Saleen", "Samsung", "Saturn", "Scion", "SEAT", "Skoda", "SMA", "Smart", "Soueast", "Spectre", "SsangYong", "Subaru", "Suzuki", "СеАЗ", "Talbot", "Tata", "Tatra", "Tianma", "Tofas", "Toyota", "Trabant", "TVR", "ТагАЗ", "УАЗ", "FAW", "Ferrari", "Fiat", "Ford", "FSO", "Fuqi", "Hafei", "Haima", "Hindustan", "Holden", "Honda", "HuangHai", "Hummer", "Hyundai", "Chana", "ChangFeng", "Changhe", "Chery", "Chevrolet", "Chrysler", "Shifeng", "ShuangHuan", "JAC", "Jaguar"];
        $('#carBrand').autocomplete({
            source: brandNames
        });
    });
}

function setCarInfo(options) {
    $('#carBrand').val(options.brand);
    $('#carModel').val(options.model);
    $('#mileage').val(options.mileage);
    $('#year').val(options.year);
    if (options.gasoline === 'Бензин') {
        $('#petrol').prop('checked', true);
    }
    else if (options.gasoline === 'Дизель') {
        $('#diesel').prop('checked', true);
    }
    $('#capacity').val(options.capacity);
    if (options.transmission === 'Механика') {
        $('#manual').prop('checked', true);
    }
    else {
        $('#automatic').prop('checked', true);
    }
    $('#price').val(options.price);
    $('#about').val(options.about);
    $('#img').attr('src', options.photo);
}

function getCarInfo() {
    let options = new Object(null);
    options.brand = $('#carBrand').val();
    options.model = $('#carModel').val();
    options.mileage = $('#mileage').val();
    options.year = $('#year').val();
    options.gasoline = $('#gasoline input:checked').val();
    options.capacity = $('#capacity').val();
    options.transmission = $('#transmission input:checked').val();
    options.price = $('#price').val();
    options.about = $('#about').val();
    options.photo = $('#img').attr('src');
    let newCar = new Car(options);
    return newCar;
}

function readFile() {
    if (this.files && this.files[0]) {
        const FR = new FileReader();
        FR.onload = function (e) {
            $('#img').attr('src', e.target.result);
        };
        FR.readAsDataURL(this.files[0]);
    }
}

