var map,
    marker,
    contentString;

$(document).ready(function () {

    let items = $('.slider_block_item'),
        StartsSlide = 0,
        hamburger = $('.hamburger'),
        navigation = $('nav > ul'),
        details = $('.button_details'),
        prices = $('.prices_item');

    function IniteSlide(i) {
        $(items[i]).removeClass('fog');
        let style = window.getComputedStyle(items[i]),
            CurOrder = style.getPropertyValue('order');

        items[1].style.order = CurOrder;
        items[i].style.order = '2';

    }

    function PushDetail(id) {
        let wrapper = prices[id],
            block = $(wrapper).children().eq(1),
            content = $(block).children().eq(0),
            button = details[id];
        detail = $(block).children().eq(1);

        // console.log(content);
        if (content.hasClass('active-content')) {
            content.removeClass('active-content');
            detail.addClass('active-details');
            button.innerHTML = "НАЗАД";
        } else {
            detail.removeClass('active-details');
            content.addClass('active-content');
            button.innerHTML = "ПОДРОБНЕЕ";
        }

    }

    IniteSlide(StartsSlide);

    $('.slider_block_slick-prev').on('click', function () {
        $(items).addClass('fog');
        
        items[0].style.animation = 'none';
        items[1].style.animation = 'none';
        items[2].style.animation = 'none';

        for (let i = 0; i < items.length; i++) {
            let style = window.getComputedStyle(items[i]),
                CurOrder = Number(style.getPropertyValue('order'));
            if (CurOrder == 3) {
                items[i].style.animation = 'fadeIn2 1.5s';
                items[i].style.order = '1';
            } else {
                items[i].style.animation = 'fadeIn2 1.5s';
                items[i].style.order = String(CurOrder + 1);
                if (items[i].style.order == 2) {
                    items[i].style.animation = 'fadeIn 1.5s';
                    $(items[i]).removeClass('fog');
                }
            }

        }
        this.blur();
    });

    $('.slider_block_slick-next').on('click', function () {
        $(items).addClass('fog');
        items[0].style.animation = 'none';
        items[1].style.animation = 'none';
        items[2].style.animation = 'none';

        for (let i = 0; i < items.length; i++) {
            let style = window.getComputedStyle(items[i]),
                CurOrder = Number(style.getPropertyValue('order'));
            if (CurOrder == 1) {

                items[i].style.animation = 'fadeIn2 1.5s';

                // items[i].style.animation = 'fadeInRight 1.5s';
                items[i].style.order = '3';


            } else {

                items[i].style.animation = 'fadeIn2 1.5s';
                items[i].style.order = String(CurOrder - 1);
                if (items[i].style.order == 2) {
                    items[i].style.animation = 'fadeIn 1.5s';
                    $(items[i]).removeClass('fog');
                }
            }

        }

        this.blur();
    });

    details.on('click', function (element) {
        if (element.target == details[0]) {
            PushDetail(0);
        } else if (element.target == details[1]) {
            PushDetail(1);
        } else if (element.target == details[2]) {
            PushDetail(2);
        } else if (element.target == details[3]) {
            PushDetail(3);
        }
    });

    hamburger.on('click', ()=>{
        hamburger.toggleClass('hamburger-active');
        navigation.toggleClass('nav-active');
    });


    new WOW().init();

});

function initMap() {

    // В переменной map создаем объект карты GoogleMaps и вешаем эту переменную на <div id="map"></div>
    map = new google.maps.Map(document.getElementById('map'), {
        // При создании объекта карты необходимо указать его свойства
        // center - определяем точку на которой карта будет центрироваться
        center: {

            lat: 55.748024,
            lng: 37.627220
        },
        // zoom - определяет масштаб. 0 - видно всю платнеу. 18 - видно дома и улицы города.
        zoom: 18
    });

    marker = new google.maps.Marker({

        // Определяем позицию маркера

        position: {
            lat: 55.748024,
            lng: 37.627220
        },

        // Указываем на какой карте он должен появится. (На странице ведь может быть больше одной карты)
        map: map,
        icon: 'icons/2-layers.svg',

        // Пишем название маркера - появится если навести на него курсор и немного подождать
        title: 'Наш маркер: Большой театр'
    });


    // Создаем наполнение для информационного окна
    contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h2 id="firstHeading" class="firstHeading">г. Москва</h1>' +
        '<div id="bodyContent">' +
        '<p>ул. Садовническая, дом 5, офис 4-6</p>' + '<p>700 метров от м. Новокузнецкая</p>' +
        '<p> Тел: +7 (926) 423 01 00</p>' +
        '<a href="http://info@glopt.ru" target="_blank">info@glopt.ru</a>' +
        '</div>' +
        '</div>';


    infowindow = new google.maps.InfoWindow({
        content: contentString,
        // maxWidth: 400
        width: 329,
        height: 158
    });

    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
}