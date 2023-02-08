let reviews = []

let myMap;

const init = () => {
    myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 13
    }, {
      balloonMaxWidth: 400,
      searchControlProvider: 'yandex#search'
    });

    const marks = []

    // setInterval(() => {
    //   console.log(marks)
    // }, 3000)

    const myCollection = new ymaps.GeoObjectCollection({}, {
        draggable: false,
        iconLayout: 'default#image',
        iconImageSize: [46,57],
        iconImageOffset: [-35,-52],
    })

    // marks.forEach(coord => {
    //     myCollection.add(new ymaps.Placemark(coord))
    // })

    myMap.geoObjects.add(myCollection)

    myMap.events.add('click', function (e) {
      if (!myMap.balloon.isOpen()) {
          let coords = e.get('coords');
          myMap.balloon.open(coords, {
              contentBody: `<h2 class="title">Отзыв:</h2>
              <input id="nameEl" type="text" placeholder="Укажите ваше имя">
              <input id="placeEl" type="text" placeholder="Укажите место">
              <textarea id="textEl" class="textarea" placeholder="Оставьте отзыв"></textarea>
              <button id="button">Добавить</button>`,
          });
          const buttonEl = document.querySelector('#button')
          const inputName = document.querySelector('#nameEl')
          const inputPlace = document.querySelector('#placeEl')
          const inputReview = document.querySelector('#textEl')
          buttonEl.addEventListener('click', () => {
            marks.push({
              mark: coords,
              name: inputName.value,
              place: inputPlace.value,
              review: inputReview.value
            })
            myMap.balloon.close();
          }, { once: true })
      }
      else {
          myMap.balloon.close();
      }
  });

};

ymaps.ready(init);