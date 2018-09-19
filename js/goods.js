'use strict';

var names = [
  'Чесночные сливки',
  'Огуречный педант',
  'Молочная хрюша',
  'Грибной шейк',
  'Баклажановое безумие',
  'Паприколу итальяно',
  'Нинзя-удар васаби',
  'Хитрый баклажан',
  'Горчичный вызов',
  'Кедровая липучка',
  'Корманный портвейн',
  'Чилийский задира',
  'Беконовый взрыв',
  'Арахис vs виноград',
  'Сельдерейная душа',
  'Початок в бутылке',
  'Чернющий мистер чеснок',
  'Раша федераша',
  'Кислая мина',
  'Кукурузное утро',
  'Икорный фуршет',
  'Новогоднее настроение',
  'С пивком потянет',
  'Мисс креветка',
  'Бесконечный взрыв',
  'Невинные винные',
  'Бельгийское пенное',
  'Острый язычок'
];

var pictures = [
  'gum-cedar',
  'gum-chile',
  'gum-eggplant',
  'gum-mustard',
  'gum-portwine',
  'gum-wasabi',
  'ice-cucumber',
  'ice-eggplant',
  'ice-garlic',
  'ice-italian',
  'ice-mushroom',
  'ice-pig',
  'marmalade-beer',
  'marmalade-caviar',
  'marmalade-corn',
  'marmalade-new-year',
  'marmalade-sour',
  'marshmallow-bacon',
  'marshmallow-beer',
  'marshmallow-shrimp',
  'marshmallow-spicy',
  'marshmallow-wine',
  'soda-bacon',
  'soda-celery',
  'soda-cob',
  'soda-garlic',
  'soda-peanut-grapes',
  'soda-russian'
];

var contents = [
  'молоко',
  'сливки',
  'вода',
  'пищевой краситель',
  'патока',
  'ароматизатор бекона',
  'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному',
  'ароматизатор картофеля',
  'лимонная кислота',
  'загуститель',
  'эмульгатор',
  'консервант: сорбат калия',
  'посолочная смесь: соль, нитрит натрия',
  'ксилит',
  'карбамид',
  'вилларибо',
  'виллабаджо'
];

var classCatalogCards = document.querySelector('.catalog__cards');
var classCatalogLoad = document.querySelector('.catalog__load');
var classGoodsCardEmpty = document.querySelector('.goods__card-empty');
var templateCard = document.querySelector('#card').content.querySelector('article');
var templateCardOrder = document.querySelector('#card-order').content.querySelector('article');
var classGoodsCards = document.querySelector('.goods__cards');

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomBool () {
  return Math.random() < 0.5;
}

function getRandomItems (arr) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (getRandomBool()) {
      newArr.push(arr[i]);
    }
  }

  return newArr;
}

// Формирование массива

function createItemsArray () {
  var items = [];
  for (var i = 0; i < 26; i++) {

    var nameRand = getRandomInt(0, (names.length - 1));
    var picRandIndex = getRandomInt(0, (pictures.length - 1));
    var picRand = 'img/cards/' + pictures[picRandIndex] + '.jpg';

    var item = {
      name: names[nameRand],
      picture: picRand,
      amount: getRandomInt(0, 21),
      price: getRandomInt(100, 1500),
      weight: getRandomInt(30, 300),
      rating: {
        value: getRandomInt(1, 5),
        number: getRandomInt(10, 900)
      },
      nutritionFacts: {
        sugar: getRandomBool(),
        energy: getRandomInt(700, 500),
        contents: getRandomItems(contents)
      }
    };

    names.splice(nameRand, 1);
    pictures.splice(picRandIndex, 1);
    items.push(item);
  }

  return items;
}

var items = createItemsArray();

// Добавление

classCatalogCards.classList.remove('catalog__cards--load');
classCatalogLoad.classList.add('visually-hidden');

function createCard () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < items.length; i++) {
    var element = templateCard.cloneNode(true);
    var classCardTitle = element.querySelector('.card__title');
    var classCardImg = element.querySelector('.card__img');
    var classCardPrice = element.querySelector('.card__price');
    var classStarsRating = element.querySelector('.stars__rating');
    var classStarCount = element.querySelector('.star__count');
    var classCardCompositionList = element.querySelector('.card__composition-list');
    var classCardCharacteristic = element.querySelector('.card__characteristic');

    classCardTitle.textContent = items[i].name;
    classCardImg.src = items[i].picture;
    classCardImg.alt = items[i].name;
    classCardPrice.innerHTML = items[i].price + ' <span class="card__currency">₽</span><span class="card__weight">/ ' + items[i].weight + ' Г</span>';
    classStarsRating.textContent = 'Рейтинг: ' + items[i].rating.value + ' звёзд';
    classStarCount.textContent = '(' + items[i].rating.number + ')';

    var starStrings = ['one', 'two', 'three', 'four', 'five'];
    var starIndex = starStrings[items[i].rating.value - 1];

    classStarsRating.classList.remove('stars__rating--five');
    classStarsRating.classList.add('stars__rating--' + starIndex);

    var isSugar = items[i].nutritionFacts.sugar ? 'Содержит сахар' : 'Без сахара';

    classCardCharacteristic.textContent = isSugar + '. ' + items[i].nutritionFacts.energy + ' ккал';
    classCardCompositionList.textContent = items[i].nutritionFacts.contents;

    if (items[i].amount === 0) {
      element.classList.remove('card--in-stock');
      element.classList.add('card--soon');
    } else if (items[i].amount <= 5) {
      element.classList.remove('card--in-stock');
      element.classList.add('card--little');
    }

    fragment.appendChild(element);
  }

  return fragment;
}

var cards = createCard();
classCatalogCards.appendChild(cards);

function getOrderItems (items) {
  var copyItems =items.slice();
  var selectedItems = [];
  for (var i = 0; i < 3; i++) {
    var randomIndex = getRandomInt(0, (items.length - 1));
    selectedItems[i] = copyItems[randomIndex];
    copyItems.splice(randomIndex, 1);
  }

  return selectedItems;
}

var orderCardsInfo = getOrderItems(items);

function createOrderCard (data) {
  var element = templateCardOrder.cloneNode(true);
  var classCardTitle = element.querySelector('.card-order__title');
  var classCardImg = element.querySelector('.card-order__img');
  var classCardPrice = element.querySelector('.card-order__price');

  classCardTitle.textContent = data.name;
  classCardImg.src = data.picture;
  classCardImg.alt = data.name;
  classCardPrice.textContent = data.price + ' ₽';

  return element;
}

function createOrderCards (selectedItems) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < selectedItems.length; i++) {
    var orderCard =createOrderCard(selectedItems[i]);
    fragment.appendChild(orderCard);
  }

  return fragment;
}

var orderCards = createOrderCards(orderCardsInfo);
classGoodsCards.appendChild(orderCards);

classGoodsCards.classList.remove('goods__cards--empty');
classGoodsCardEmpty.classList.add('visually-hidden');

