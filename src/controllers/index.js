import $ from 'jquery';
import template from '../view/templates/index.ejs';

export default function() {
    const content = template();
    $('#app').html(content);
}
