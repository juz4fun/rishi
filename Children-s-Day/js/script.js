var textHolder = document.getElementsByTagName('div')[0],
  text = textHolder.innerHTML,
  chars = text.length,
  newText = '',
  i;

for (i = 0; i < chars; i += 1) {
  newText += '<i>' + text.charAt(i) + '</i>';
}

textHolder.innerHTML = newText;

var letters = document.getElementsByTagName('i'),
  flickers = [5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27],
  randomLetter,
  flickerNumber,
  counter;

function randomFromInterval(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

function hasClass(element, cls) {
  return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function flicker() {
  counter += 1;

  if (counter === flickerNumber) {
    return;
  }

  setTimeout(function() {
    if (hasClass(randomLetter, 'off')) {
      randomLetter.className = '';
    } else {
      randomLetter.className = 'off';
    }

    flicker();
  }, 30);
}

(function loop() {
  var rand = randomFromInterval(500, 3000);

  randomLetter = randomFromInterval(0, 20);
  randomLetter = letters[randomLetter];

  flickerNumber = randomFromInterval(0, 10);
  flickerNumber = flickers[flickerNumber];

  setTimeout(function() {
    counter = 0;
    flicker();
    loop();
  }, rand);
}());
