function start() {
	createStartScreen();
	startBut.onclick = startGame;
}

function startGame() {
	clickStart()
	infoDispNone();
	startOnclick();
	createEnemy();
	createLifes();
	createVirus();
	createScores();
	sozdanieTimerBlock();
	timerIgra();
}
//==============================Повтор=========================
//===================повтор при отсутствии жизней=============
function retryEndLifes() {
	 clickStart();
	deleteGameOver();
	 createEnemy();
	 createLifes();
	 createVirus();
	 createScores();
	 sozdanieTimerBlock();
	 timerIgra();
}
//===================Повтор при окончании времени===============
function retryEndTime() {
	 clickStart();
	deleteWin();
	deleteOverTime();
	 createEnemy();
	 createLifes();
	 createVirus();
	 createScores();
	 sozdanieTimerBlock();
	  timerIgra();
}


start();