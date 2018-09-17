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

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * ((max + 1) - min)) + min;
};

var getRandomBool = function() {
  if (Math.random() < 0.5) {
    return true;
  } else {
    return false;
  }
};

var getRandomItems = function(arr) {
  for (var j=0; j<arr.length; j++) {
    if (getRandomBool() === true) {
      arr.splice(j, 1);
    }
  }
  return arr;
};

var items = [];

for (var i=0; i<26; i++) {

  var nameRand = getRandomInt(0, (names.length - 1));

  for (var k=0; k<pictures.length; k++) {
    var picRandIndex = getRandomInt(0, (pictures.length - 1));
  }

  var picRand = `img/cards/${pictures[picRandIndex]}.jpg`;
  var amount = getRandomInt(0, 21);
  var price = getRandomInt(100, 1500);
  var weight = getRandomInt(30, 300);
  var value = getRandomInt(1, 5);
  var number = getRandomInt(10, 900);
  var sugar = getRandomBool();
  var energy = getRandomInt(700, 500);
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
  var contentsSelected = getRandomItems(contents);

  var item = {
    name: names[nameRand],
    picture: picRand,
    amount: amount,
    price: price,
    weight: weight,
    rating: {
      value: value,
      number: number
    },
    nutritionFacts: {
      sugar: sugar,
      energy: energy,
      contents: contentsSelected
    }
  };

  names.splice(nameRand,1);
  pictures.splice(picRandIndex,1);
  items.push(item);
}

// Классы

var classCatalogCards = document.querySelector('.catalog__cards');
var classCatalogLoad = document.querySelector('.catalog__load');
var classGoodsCardEmpty = document.querySelector('.goods__card-empty');

// Добавление

classCatalogCards.classList.remove('catalog__cards--load');
classCatalogLoad.classList.add('visually-hidden');

var templateCard = document.querySelector('#card').content.querySelector('article');
var fragment = document.createDocumentFragment();

for (var i=0; i<items.length; i++) {
  var element = templateCard.cloneNode(true);
  var classCardTitle = element.querySelector('.card__title');
  var classCardImg = element.querySelector('.card__img');
  var classCardPrice = element.querySelector('.card__price');
  var classCardWeight = element.querySelector('.card__weight');
  var classStarsRating = element.querySelector('.stars__rating');
  var classStarCount = element.querySelector('.star__count');
  var classCardCompositionList = element.querySelector('.card__composition-list');
  var classCardCharacteristic = element.querySelector('.card__characteristic');

  classCardTitle.textContent = items[i].name;
  classCardImg.src = items[i].picture;
  classCardImg.alt = items[i].name;
  classCardPrice.innerHTML = `${items[i].price} <span class="card__currency">₽</span><span class="card__weight">/ ${items[i].weight} Г</span>`;
  classStarsRating.textContent = `Рейтинг: ${items[i].rating.value} звёзд`;
  classStarCount.textContent = `(${items[i].rating.number})`;

  var starStrings = ['one', 'two', 'three', 'four', 'five'];
  var starIndex = starStrings[items[i].rating.value-1];

  classStarsRating.classList.remove('stars__rating--five');
  classStarsRating.classList.add(`stars__rating--${starIndex}`);

  if (items[i].nutritionFacts.sugar === true) {
    var isSugar = 'Содержит сахар';
  } else {
    var isSugar = 'Без сахара';
  }

  classCardCharacteristic.textContent = `${isSugar}. ${items[i].nutritionFacts.energy} ккал`;
  classCardCompositionList.textContent = items[i].nutritionFacts.contents;

  if (items[i].amount == 0) {
    element.classList.remove('card--in-stock');
    element.classList.add('card--soon');
  } else if (items[i].amount <= 5) {
    element.classList.remove('card--in-stock');
    element.classList.add('card--little');
  }

  fragment.appendChild(element);
}

classCatalogCards.appendChild(fragment);

var templateCardOrder = document.querySelector('#card-order').content.querySelector('article');
var classGoodsCards = document.querySelector('.goods__cards');

var selectedItems = [];

for (var j=0; j<3; j++) {
  var i = getRandomInt(0, (items.length - 1));
  selectedItems[j] = items[i];
  items.splice(i, 1);

  var element = templateCardOrder.cloneNode(true);
  var classCardTitle = element.querySelector('.card-order__title');
  var classCardImg = element.querySelector('.card-order__img');
  var classCardPrice = element.querySelector('.card-order__price');

  classCardTitle.textContent = selectedItems[j].name;
  classCardImg.src = selectedItems[j].picture;
  classCardImg.alt = selectedItems[j].name;
  classCardPrice.textContent = `${selectedItems[j].price} ₽`;

  fragment.appendChild(element);
}

classGoodsCards.appendChild(fragment);

classGoodsCards.classList.remove('goods__cards--empty');
classGoodsCardEmpty.classList.add('visually-hidden');

