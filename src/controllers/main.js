import $ from 'jquery';
import template from '../view/templates/main.ejs';

export default function() {
    const content = template();
    $('#app').html(content);
}
