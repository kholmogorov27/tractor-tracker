const mock = [
  {
    name: "Первый сельхоз Майкопа",
    color: "FF0000",
    coordinates: [
      [44.62477, 40.039326],
      [44.626043, 40.041228],
      [44.622725, 40.045945],
      [44.618969, 40.04064],
      [44.620973, 40.039738],
      [44.622734, 40.039247],
      [44.624028, 40.03918],
    ],
  },
  {
    name: 'ЗАО "Арбузная банда"',
    color: "00FF00",
    coordinates: [
      [44.632801, 40.052272],
      [44.631811, 40.050404],
      [44.632147, 40.050054],
      [44.633006, 40.051933],
    ],
  },
  {
    name: 'ООО "Плодородие Майкопа"',
    color: "FFA500",
    coordinates: [
      [44.644619, 40.087791],
      [44.642483, 40.090814],
      [44.643763, 40.09264],
      [44.64594, 40.089578],
    ],
  },
];

ymaps.ready(["util.calculateArea"]).then(() => {
  const map = new ymaps.Map(
    "map",
    {
      center: [44.623864, 40.041707],
      zoom: 15,
      controls: ["searchControl", "zoomControl"],
    },
    {
      searchControlProvider: "yandex#search",
    }
  );

  mock.forEach((field) => {
    const polygon = new ymaps.GeoObject(
      {
        geometry: {
          type: "Polygon",
          coordinates: [field.coordinates],
        },
      },
      { fillColor: field.color, outline: false }
    );
    const collection = new ymaps.GeoObjectCollection();

    collection.add(polygon);

    map.geoObjects.add(collection);

    collection.each((area) => {
      // const areaSquare = pretifyAreaValue(
      //   Math.round(ymaps.util.calculateArea(area))
      // );

      // area.properties.set("balloonContentBody", areaSquare);

      map.geoObjects.add(
        new ymaps.Placemark(
          getCenter(area),
          { iconCaption: field.name },
          { preset: "islands#blueDotIconWithCaption" }
        )
      );

      area.events.add("click", onFieldClick);
    });
  });
});

function getCenter(area) {
  return ymaps.util.bounds.getCenter(area.geometry.getBounds());
}

function pretifyAreaValue(value) {
  // Если площадь превышает 1 000 000 м^2, то приводим ее к км^2.
  if (value <= 1e6) {
    return value + " м²";
  }

  return (value / 1e6).toFixed(3) + " км²";
}

function onFieldClick(event) {
  console.log(event.originalEvent.map);
}
