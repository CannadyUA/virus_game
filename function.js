//==================================Переменные============================
var gameArea = document.querySelector("#game_area");
var startScreen = null;
var startBut = null
var doctor = null;
var lifes = 0;
var colLifes = 3;
var virus = 0;
var stars = 0;
var timerBlock = null;
var chasy = null;
var drWin = null;
var textWin = null;

//============================Функции создания элементов===================
//===========================Экран при проигрыше===========================
function createGameOverScreen() {
	var overScreen = document.createElement("div");
	overScreen.id = "over_screen";
	gameArea.appendChild(overScreen);

	var lose = document.createElement("h2");
	lose.innerText = "You lose";
	overScreen.appendChild(lose);

	var result = document.createElement("p");
	result.innerText = "Your result:" + " " + stars;
	overScreen.appendChild(result);

	 var buttRetry = document.createElement("span");
	 buttRetry.innerText = "Play again";
	overScreen.appendChild(buttRetry);
	buttRetry.onclick = retryEndLifes;
}

//========================экран окончания времени========================
function overTimeScreen() {
	var overTimeScr = document.createElement("div");
	overTimeScr.id = "over_time";
	gameArea.appendChild(overTimeScr);

	var timeUp = document.createElement("h2");
	timeUp.innerText = "Time is up";
	overTimeScr.appendChild(timeUp);

	var resultTime = document.createElement("p");
	resultTime.innerText = "Your result:" + " " + stars;
	overTimeScr.appendChild(resultTime);

	 var buttAgain = document.createElement("span");
	 buttAgain.innerText = "Play again";
	overTimeScr.appendChild(buttAgain);
	buttAgain.onclick = retryEndTime;
}

//======================Создание начального экрана========================= 
function createStartScreen() {
	var startScreen = document.createElement("div");
	startScreen.id = "start_screen";
	gameArea.appendChild(startScreen);

  	startBut = document.createElement("div");
	startBut.id = "start_button";
	startBut.innerText = "Start game";
	startScreen.appendChild(startBut);
}
//=======================Функция скрытия инфо==========================
function infoDispNone() {
	var text = document.querySelector("#text");
	text.style.display = "none";
	var nurse = document.querySelector("#rules");
	nurse.style.display = "none";
}
//====================Поздравление с победой======================
function win() {
	 drWin = document.querySelector("#win_dr");
	drWin.style.display = "block";
	 textWin = document.querySelector("#text_win");
	textWin.style.display = "block";
} 

function deleteWin() {
	drWin.style.display = "none";
	textWin.style.display = "none";
}
//========================Создание таймера============
//функция для создания блока таймера игры с обратным отсчетом
function sozdanieTimerBlock(){
	 var infoBlock = document.createElement("div");
	 infoBlock.id = "info-block";
	//создаем заголовок2 в блоке инфо-блок  с текстом Time
	var h2 = document.createElement("h2");
		h2.innerText = "Time: ";
			//создадим в заголовке таймер span
			timerBlock = document.createElement("span");
			//добавляем тегу span => id="timer"
			timerBlock.id = "timer";
			//добавляяем текст таймера =60
			timerBlock.innerText = "30";
			//добавляем в h2- ребенка span (внутренний) с таймером
			h2.appendChild(timerBlock);
		// добавляем в инфо блок Заголовок h2
	infoBlock.appendChild(h2);
	// добавляем в gameArea  блок infoBlock
	gameArea.appendChild(infoBlock);
}

//=========Функция таймер обратного отсчета времени игры===========
function timerIgra() {
	//в переменной часы храним таймер,
	// чтобы потом можно было его остановить
	chasy = setInterval(function() { 
		//текст timer блока уменьшать на -1 -обратный отсчет от10 до 0
		//var timerBlock = document.querySelector("timer");
		timerBlock.innerText = timerBlock.innerText - 1;
		//Если таймер равен 0, то
		if (timerBlock.innerText < 0) {
			gameArea.innerText = "";
			overTimeScreen();
			soundWin();
			win();
			stars = 0;
			//очистить переменную chasy - равна таймеру игры
			clearInterval (chasy);
			colLifes = 3;	
		}
	}, 1000);
}
//==========================Создание врача=============================
function createEnemy() {
var doctor = document.createElement("div");
doctor.id = "enemy";
gameArea.appendChild(doctor);
}
//==========================Создание блока очков=======================
function createScores() {
	scores = document.createElement("div");
	scores.id = "score";
	scores.innerText = 0;
	gameArea.appendChild(scores);
}
//=====================Создание жизней============================
function createLifes() {
	lifes = document.createElement("div");
	lifes.id = "lifes";
	var nowLifes = 0;
		while (nowLifes < colLifes) {
			var span = document.createElement("span");
			lifes.appendChild(span);
			nowLifes = nowLifes + 1;
			};
	gameArea.appendChild(lifes);		
	}
//=====================Создание микробов=========================
function createVirus() {
var timeCreate = setInterval(function() {
	var virus = document.createElement("div");
	//virus.className = "virus";
	//=======================Изменение гифки вируса====================
	var chVirus = rand(1, 4);
	switch(chVirus) {
		case 1:
			virus.className = "virus blue";
			break;
		case 2:
			virus.className = "virus red";
			break;
		case 3:
			virus.className = "virus yellow";
			break;	
	}
//========================Начальная точка движения=======================
	
	setTimeout(function() {
		var napr = rand(1, 4);
		if(napr == 1) {
				virus.style.left = rand(-70, 900) + "px";
				virus.style.top = -50 + "px";
			} else if(napr ==2) {	
				virus.style.left = -70 + "px";
				virus.style.top = rand(0, 330) + "px";
			} else {
				virus.style.left = 900 + "px";
				virus.style.top = rand(0, 330) + "px";
		}
	}, 20);
//=========================Движение и достижении цели==================
	setTimeout(function() {
		virus.style.transition = "all 10s";
		var virusMove = setInterval(function() {
			virus.style.left = 380 + "px";
			virus.style.top = 375 + "px";
//=========================События при достижении цели==================
			if (virus.offsetTop >= 370) {
				virus.remove();//Удаление микроба
				colLifes = colLifes - 1;//кол-во жизней -1
				lifeDown();
				lifes.remove();
				createLifes();
//=====================Событие при кол-ве жизней 0=================
				if(colLifes <=0) {
					gameArea.innerText = "";
					createGameOverScreen();
					soundLose();
					colLifes = 3;
					clearInterval(chasy);
					clearInterval(timeCreate);				
					stars = 0;
				}
			}
		}, 50)
	}, 500);
//==============================События при клике на микроб================================
	virus.onclick = function () {
		virus.remove();
		clickOnVirus();
		//Проверка был ли клик по микробу
		if(virus.className != "virus delete") {
			stars = stars + 1;//Увеличение кол-ва очков
			scores.innerText = stars;
			//при наборе 20 очков +1 жизнь
			if (stars == 20) {
				colLifes = colLifes + 1;
				lifeUp();
				lifes.remove();
				createLifes();
			}	
			//при наборе 40 очков +1 жизнь	
			if (stars == 40) {
				colLifes = colLifes + 1;
				lifeUp();
				lifes.remove();
				createLifes();
			}		
			}
			virus.className = "virus delete";
		}			
	gameArea.appendChild(virus);
	}, rand(800, 1000));//Интервал создания микробов
	setTimeout(() => { clearInterval(timeCreate)}, 30000);
}
//=====================Удаление элементов============================
//=====================Удаление стартового экрана==============================
function startOnclick() {
	var startBlock = document.querySelector("#start_screen");
	startBlock.remove();
}
//=====================Удаление экрана выигрыша===================
function deleteOverTime() {
	var timeScr = document.querySelector("#over_time");
	timeScr.remove();
}
//===========================Удаление экрана проигрыша========
function deleteGameOver() {
	var gameOver = document.querySelector("#over_screen");
	gameOver.remove();
}



//==============================Sounds=============================
function clickStart() {
	var clickStart = new Audio();
	button.src = "sound/butt.mp3";
	button.autoplay = true;
}

function clickOnVirus() {
	var clickVirus = new Audio();
	kill.src = "sound/kill-viris.mp3";
	kill.autoplay = true;
}
function soundLose() {
	var soundLose = new Audio();
	gameover.src = "sound/gameover.wav";
	gameover.autoplay = true;
}

function soundWin() {
	var soundWin = new Audio();
	soundwin.src = "sound/win.wav";
	soundwin.autoplay = true;
}

function lifeUp() {
	var lifeUp = new Audio();
	lifeup.src = "sound/lifeup.wav";
	lifeup.autoplay = true;
}

function lifeDown() {
	var lifeDown = new Audio();
	lifedown.src = "sound/lifemin.mp3";
	lifedown.autoplay = true;
}

//=======================функция выбора случайного значения======================
	function rand(min, max) {
		return(Math.floor(Math.random() * (max - min)) + min);
	}




	


