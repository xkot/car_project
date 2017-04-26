import template from '../templates/new-car.ejs';

export default function() {
    const content = template();
    $('#app').html(content);
}