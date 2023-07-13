

let map;

main();
async function main() {
    // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты API
    await ymaps.ready;

    // Создание карты
    map = new ymaps.Map('map', {
        location: {
            // Координаты центра карты
            // Порядок по умолчанию: «долгота, широта»
            center: [44.10980186173801,44.60411216152926],

            // Уровень масштабирования
            // Допустимые значения: от 0 (весь мир) до 21.
            zoom: 13
        }
    });

    
    // map.controls.add('searchControl')

    // Добавляем слой для отображения схематической карты
    map.addChild(new ymaps.YMapDefaultSchemeLayer());
}