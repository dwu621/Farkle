var diceArr = [];
function initializeDice(){
	for(i = 0; i < 6; i++){
		diceArr[i] = {};
		diceArr[i].id = "die" + (i + 1);  // added () so it will add instead of concat
		diceArr[i].value = i + 1;
		diceArr[i].clicked = 0;
	}
}

/*Rolling dice values*/
function rollDice(){
	console.log("clicked")
	console.log(diceArr)
	for(var i=0; i < 6; i++){
		if(diceArr[i].clicked === 0){
			diceArr[i].value = Math.floor((Math.random() * 6) + 1);
		}
	}
	updateDiceImg();
}

/*Updating images of dice given values of rollDice*/
function updateDiceImg(){
	var diceImage;
	for(var i = 0; i < 6; i++){
		diceImage = "images/" + (diceArr[i].value) + ".png";  // changed the variable to get correct object
		document.getElementById(diceArr[i].id).setAttribute("src", diceImage);
	}
	if(checkFarkle()) {
		console.log("farkle")

	} else {
		console.log('keep playing')
	}
}

// Checks if roll is farkle

const checkFarkle = () => {
	let farkle = true
	let value = []
	let threeOfKind = false
	for (let i = 0; i < 6; i ++) {
		if (diceArr[i].clicked === 0) // this will prevent selected die from previous turn from being checked
			value.push(diceArr[i].value)
	}
	value.sort((a, b) => a - b)
	for (let i = 0; i < value.length; i ++) {
		if (value.length >= 3) {  // this will only check for 3ofkind if there are 3 die left
			if (value[i] === value[i + 1] && value[i] === value[i + 2]) {
				threeOfKind = true
			}
		}
		if (value[i] === 1 || value[i] === 5 || threeOfKind) {
			farkle = false
		}
		
	}
	return farkle
}



function diceClick(img){
	var i = img.getAttribute("data-number");

	img.classList.toggle("transparent");
	if(diceArr[i].clicked === 0){
		diceArr[i].clicked = 1; //changed the == to = so it can save state correctly
	}	
	else{
		diceArr[i].clicked = 0; //changed the == to =
	}
	console.log(diceArr[i].clicked)

}