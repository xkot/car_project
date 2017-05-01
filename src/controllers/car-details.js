import $ from 'jquery';
import template from '../view/templates/car-details.ejs';

export default function(id) {
    const content = template({
        supplies: ['one', 'two', 'three']
    });

    $('#app').html(content);
}