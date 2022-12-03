document.addEventListener('DOMContentLoaded', () => {
 const bird = document.querySelector('.bird');
 const gameDisplay = document.querySelector('.game-container');
 const ground = document.querySelector('.ground');

 let birdLeft = 220;
 let birdBottom = 100;
 let gravity = 2;
 let isGameOver = false;
 let gap = 430;

 function startGame() {
  birdBottom -= gravity;
  bird.style.left = birdLeft + 'px';
  bird.style.bottom = birdBottom + 'px';
 }
 let startTimerId = setInterval(startGame, 20); // run start game every 20ms so the bird automatically moves down


 function control(e) { // the bird moves up by pressing space bar
  if(e.keyCode === 32) {
   jump();
  }
 }

 function jump() {
  if(birdBottom < 500) { // the bird does not hit the top of the game container at 500px
  birdBottom += 50; // increase the height of the bird
  bird.style.bottom = birdBottom + 'px'; // assign the new height of the bird
  }
 }
 document.addEventListener('keydown', control); // event listener for space bar that controls the bird

 function generateObstacle() { // generate obstacles
  let obstacleLeft = 500; // the obstacle come from outside the width of the container
  let randomHeight = Math.random() * 60; // the height of the obstacle between 0-60px
  let obstacleBottom = randomHeight; // assign the new height of the obstacle
  const obstacle = document.createElement('div');
  const topObstacle = document.createElement('div');
  if(!isGameOver) {
   obstacle.classList.add('obstacle');
   topObstacle.classList.add('topObstacle');
  }
  gameDisplay.appendChild(obstacle); // add the obstacle div into the game-container
  gameDisplay.appendChild(topObstacle); // add the top obstacle div into the game-container
  obstacle.style.left = obstacleLeft + 'px';
  obstacle.style.bottom = obstacleBottom + 'px';
  topObstacle.style.left = obstacleLeft + 'px';
  topObstacle.style.bottom = obstacleBottom + gap + 'px'; // assign the gap to the top obstacle 


  function moveObstacle() {
   obstacleLeft -=2; // move the obstacles backwards
   obstacle.style.left = obstacleLeft + 'px'; // assign the new position of the obstacle
   topObstacle.style.left = obstacleLeft + 'px'; // assign the new position of the obstacle

   if(obstacleLeft === -60) { // obstacle hits the end of the screen
    clearInterval(timerId); // stop moving the obstacle
    gameDisplay.removeChild(obstacle); // remove the obstacle from the game container
    gameDisplay.removeChild(topObstacle); // remove the obstacle from the game container
   }
   if(obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && 
    (birdBottom < obstacleBottom + 150 || birdBottom > obstacleBottom + gap -197) || birdBottom === 0) {
    gameOver(); // game over
    clearInterval(timerId); // stop moving the obstacle
   } 
  }
  let timerId = setInterval(moveObstacle,20); // move obstacles backwards every 20ms
  if(!isGameOver) {
   setTimeout(generateObstacle,3000); // execute the function every 3 seconds
  }
 }
generateObstacle(); // generate obstacles

function gameOver() {
 clearInterval(startTimerId); // when the game is over the bird stops moving
 isGameOver = true;
 document.removeEventListener('keydown', control); // remove the event listener of space bar
}

});