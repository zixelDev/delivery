var map,
    marker,
    contentString;

$(document).ready(function () {

    $('.slider_block').slick({

        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left_arrow.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right_arrow.svg"></button>'

    });
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
        '<p>ул. Садовническая, дом 5, офис 4-6</p>'+'<p>700 метров от м. Новокузнецкая</p>'+
        '<p> Тел: +7 (926) 423 01 00</p>' +
        '<a href="http://info@glopt.ru" target="_blank">info@glopt.ru</a>'+
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