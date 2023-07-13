ymaps.ready(init);

function init() {
  let myMap = new ymaps.Map(
    "map",
    {
      center: [44.60411216152926, 40.10980186173801],
      zoom: 18,
    },
    {
      searchControlProvider: "yandex#search",
    }
  );

  // Создадим объекты на основе JSON-описания геометрий.
  let objects = ymaps.geoQuery([
    {
      type: "Point",
      coordinates: [44.60411216152926, 40.10980186173801],
    },
    {
      type: "Point",
      coordinates: [55.1, 37.45],
    },
    {
      type: "Point",
      coordinates: [55.25, 37.35],
    },
    {
      type: "Point",
      coordinates: [55.25, 67.35],
    },
  ]);

  // Найдем объекты, попадающие в видимую область карты.
  objects
    .searchInside(myMap)
    // И затем добавим найденные объекты на карту.
    .addToMap(myMap);

  myMap.events.add("boundschange", function () {
    // После каждого сдвига карты будем смотреть, какие объекты попадают в видимую область.
    let visibleObjects = objects.searchInside(myMap).addToMap(myMap);
    // Оставшиеся объекты будем удалять с карты.
    objects.remove(visibleObjects).removeFromMap(myMap);
  });
}
