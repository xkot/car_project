import $ from 'jquery';
import page from 'page';

function linkHandler () {
    $(document).on('click', 'a[href^="/"]', function (e) {
        const href = $(e.currentTarget).attr('href');

        e.preventDefault();
        page(href);
    });
}

export {
    linkHandler
}