//Здесь наше представление
var view ={
	dislayMessage: function(msg){
		var messageArea = document.querySelector('#messageArea');
		messageArea.innerHTML = msg;
	},
	dislayHit: function(location){
		var cell = document.getElementById(location);
		cell.setAttribute('class', 'hit');
	},
	dislayMiss: function(location){
		var cell = document.getElementById(location);
		cell.setAttribute('class', 'miss');
	}
}//

//Здесь наша модель поведения игры


var model ={
	bordSize :7, //размер игровоо поля
	numShips :3,//количество кораблей в игре
	shipLength :3, //длина коробля в клетках
	shipsSunk:0,// количество потопленных кораблей

ships :[
    ship1 ={location:['10', '20', '30'], hits:['','','']},
    ship2 ={location:['32', '33', '34'], hits:['','','']},
    ship3 ={location:['63', '64', '65'], hits:['','','']}
],
fier: function(guess){///получает координаты выстрела
for (var i = 0; i < this.numShips; i++) {
	var ship = this.ships[i];
	var index = ship.location.indexOf(guess);
	if(index >=0){
      ship.hits[index] = 'hit'
	  view.dislayHit(guess);
	  view.dislayMessage('Hit !!!');
	  if(this.isSunk(ship)){
		  this.shipsSunk++;
	  }
      return true
	            }
    }
	view.dislayMiss(guess);
	view.dislayMessage('Miss !!!')
    return false;
},
isSunk: function(ship){
	for (var i=0; i < this.shipLength; i++){
		if(ship.hits[i] !== 'hit'){
			return false;
		}
	}
    return true;
  } 
}
var controller ={
	guesses:0,
	processGuess: function(guess){
		var location = parceGuess(guess);
		if(location){
			this.guesses++;
			var hit = model.fier(location)
			if(hit && model.shipsSunk === model.numShips){
				view.dislayMessage("Вы потопили все корабли за"+ this.guesses +"выстрелов!")
			}
		}
	}
}

document.forms.publish.onsubmit = function() {
	var message = this.message.value;
	console.log(message)
	return false;
  };
  
function parceGuess(guess){
	var alfabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
 if(guess === null || guess.length !== 2){
	   alert("Вы ввели не верные координаты!")
 }else{
	 var firstChar = guess.charAt(0);
	 var row = alfabet.indexOf(firstChar);
	 var column = guess.charAt(1);
	 if(isNaN(row) || isNaN(column)){
		alert("Вы ввели не верные координаты!")
	 }else if(row<0 || row >= model.bordSize || column<0 || column>= model.bordSize){
		alert("Вы ввели не верные координаты!")
	 }else{
		 return row+column
	 }
 }
 return null
}


function init(){
	var fireButton = document.getElementById('fireButton')
	fireButton.onclick = hadelFireButton;
}

function hadelFireButton(){
	var guessInpt = document.getElementById('guessInput');
	var guess = guessInpt.value;
	controller.processGuess(guess);
	guessInpt.value = '';
}
window.onload = init;
// console.log(parceGuess('A5'))
// console.log(parceGuess('G5'))