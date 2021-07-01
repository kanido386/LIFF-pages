const board = document.getElementById('board');
const clock = document.getElementById('clock');
const squares = document.getElementsByClassName('square');
const button = document.getElementById('button');

// color variant setting
const setting = [
  30, 25, 20, 15, 10,
  30, 25, 20, 15, 10,
  30, 25, 20, 15, 10,
];

var numSquare;
var randomIndex;

var r, g, b;
var squareColor;
var v;  // color variant

var level = 1;
var timeRemain = 10;
var timerID;

// ========================= ⬆️ 變數 ⬆️ =========================

button.addEventListener('click', startTimer);
document.addEventListener('mouseover', stopTimer);

// ========================= ⬇️ LIFF ⬇️ =========================

function initializeLiff(myLiffId) {
  liff.init({
    liffId: myLiffId
  })
  .then(() => {
    // start to use LIFF's api
    initializeApp();
  })
  .catch((err) => {
  });
}

initializeLiff('1656147392-N9OGxeGa');

// ========================= ⬇️ 函數 ⬇️ =========================

function stopTimer() {
  if (timeRemain <= 0) {
    clearInterval(timerID);
    board.textContent = 'GAME OVER';
    button.style.fontSize = '48px';
    button.textContent = '失敗';
    document.removeEventListener('mouseover', stopTimer);
    // TODO: LIFF
    liff.sendMessages([{
      'type': 'text',
      'text': '差一點點，再加把勁吧！'
    }])
    liff.closeWindow();
  }
}

function startTimer() {
  timerID = setInterval(function() {
    changeTime(-1);
    clock.textContent = timeRemain;
  }, 1000);

  button.removeEventListener('click', startTimer);
  button.style.fontSize = '40px';
  button.style.backgroundColor = 'pink';
  button.textContent = '進行中';
  game();
}

function changeTime(t) {
  timeRemain = timeRemain <= 0 ? 0 : timeRemain + t;
}

function modifyColor() {
  if (r >= g && r >= b) {
    r = (r+v <= 256) ? r+v : r-v;
  } else if (g >= r && g >= b) {
    g = (g+v <= 256) ? g+v : g-v;
  } else {
    b = (b+v <= 256) ? b+v : b-v;
  }
}

function game() {

  if (level <= 5) {
    modeOne();
  } else if (level <= 10) {
    modeTwo();
  } else if (level <= 15) {
    modeThree();
  } else {
    dope();
  }

  r = random(256);
  g = random(256);
  b = random(256);
  squareColor = rgbString(r,g,b);
  v = setting[level-1];  // count from 0!

  for (var i = 0; i < numSquare; ++i) {
    squares[i].style.backgroundColor = squareColor;
    squares[i].addEventListener('click', punish);
  }

  randomIndex = random(numSquare);
  modifyColor();
  squares[randomIndex].style.backgroundColor = rgbString(r, g, b);
  squares[randomIndex].removeEventListener('click', punish);
  squares[randomIndex].addEventListener('click', next);
}

function next() {
  squares[randomIndex].removeEventListener('click', next);
  changeTime(2);
  clock.textContent = timeRemain;
  level += 1;
  game();
}

function rgbString(r,g,b) {
  return 'rgb(' + r + ',' + g + ',' + b + ')'
}

function random(num) {
  return Math.floor(Math.random()*num);
}

function punish() {
  changeTime(-1);
  clock.textContent = timeRemain;
}

function dope() {
  board.innerHTML = '<div style="font-size: 100px; text-align: center; line-height: 400px">That was dope!</div>';
  button.style.fontSize = '48px';
  button.textContent = '成功';
  clearInterval(timerID);
  // TODO: LIFF
  liff.sendMessages([{
    'type': 'text',
    'text': '太神啦！'
  }])
  liff.closeWindow();
}

// ========================= ⬇️ 待化簡 ⬇️ =========================

function modeOne() {
  numSquare = 8;
  board.innerHTML = '<div class="square"></div>'.repeat(8);
  for (var i = 0; i < numSquare; ++i) {
    squares[i].style.width = '200px';
    squares[i].style.height = '200px';
  }
}

function modeTwo() {
  numSquare = 32;
  board.innerHTML = '<div class="square"></div>'.repeat(32);
  for (var i = 0; i < numSquare; ++i) {
    squares[i].style.width = '100px';
    squares[i].style.height = '100px';
  }
}

function modeThree() {
  numSquare = 128;
  board.innerHTML = '<div class="square"></div>'.repeat(128);
  for (var i = 0; i < numSquare; ++i) {
    squares[i].style.width = '50px';
    squares[i].style.height = '50px';
  }
}