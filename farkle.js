var diceArr = [];
function initializeDice(){
	for(let i = 0; i < 6; i++){
		diceArr[i] = {};
		diceArr[i].id = "die" + (i + 1);  // added () so it will add instead of concat
		diceArr[i].value = i + 1;
		diceArr[i].clicked = 0;
	}
	updateDiceImg()
	console.log("initialized", diceArr)
}

/*Rolling dice values*/
function rollDice(){
	console.log("clicked", diceArr)
	for(var i=0; i < 6; i++){
		if(diceArr[i].clicked === 0){
			diceArr[i].value = Math.floor((Math.random() * 6) + 1);
		}
	}
	updateDiceImg();
	if(checkFarkle()) {
		console.log("farkle")
		initializeDice()
	} else {
		console.log('keep playing')
	}
}

/*Updating images of dice given values of rollDice*/
function updateDiceImg(){
	var diceImage;
	for(var i = 0; i < 6; i++){
		diceImage = "images/" + (diceArr[i].value) + ".png";  // changed the variable to get correct object
		document.getElementById(diceArr[i].id).setAttribute("src", diceImage);
	}
}

// Checks if roll is farkle
let threeOfKind = false
let threeOfKindValue 
const checkFarkle = () => {
	let farkle = true
	let value = []
	
	for (let i = 0; i < 6; i ++) {
		if (diceArr[i].clicked === 0) // this will prevent selected die from previous turn from being checked
			value.push(diceArr[i].value)
	}
	value.sort((a, b) => a - b)
	for (let i = 0; i < value.length; i ++) {
		if (value.length >= 3) {  // this will only check for 3ofkind if there are 3 die left
			if (value[i] === value[i + 1] && value[i] === value[i + 2]) {
				threeOfKind = true
				threeOfKindValue = value[i]
			}
		}
		if (value[i] === 1 || value[i] === 5 || threeOfKind) {
			farkle = false
		}
		
	}
	return farkle
}

// Scoring

let score = document.querySelector("score")
let tempScore = 0
let clickedValue = []
const bankScore = () => {
	clickedValue.sort((a, b) => (a - b))
	if (!threeOfKind) {
		clickedValue.forEach((e) => {
			console.log(e)
			if (e === 1) {
				tempScore += 100
			}
			if (e === 5) {
				tempScore += 50
			}
		})
	} else if (threeOfKind && clickedValue.length === 3) {
		if (threeOfKindValue === 1) {
			tempScore += 1000
		} else if (threeOfKindValue === 2) {
			tempScore += 200
		} else if (threeOfKindValue === 3) {
			tempScore += 300
		} else if (threeOfKindValue === 4) {
			tempScore += 400
		} else if (threeOfKindValue === 5) {
			tempScore += 500			
		} else if (threeOfKindValue === 6) {
				tempScore += 600
		}	
	} 
	
	clickedValue =[]
	console.log("bankscore", clickedValue, tempScore, threeOfKind)
}




function diceClick(img){
	var i = img.getAttribute("data-number");

	img.classList.toggle("transparent");
	if(diceArr[i].clicked === 0){
		diceArr[i].clicked = 1; //changed the == to = so it can save state correctly
		clickedValue.push(diceArr[i].value)
	}	
	else{
		diceArr[i].clicked = 0; //changed the == to =
	}
}

