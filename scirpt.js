/*********************************************************************
 * Copyright (C) 2014 Shanavas m <shanavas[dot]m2[at]gmail.com>
 *
 * This script is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 2 of the License, or (at your option) any later
 * version. See http://www.gnu.org/copyleft/gpl.html for the full text of the
 * license.
 ********************************************************************/

var ballCount = null; //Two dimensional array which stored the ball count.
var player = ''; //Next player
var divClass = null; // array which stores class of each division


function init(noPlayers){
	auto = noPlayers; //auto mode true or false
	Frame = document.getElementById("frame");
	Frame.innerHTML='';
	divWidth = '60';
	divHeight = '60';
	ballCount = new Array();
	divClass = new Array();
	player = 'red'; //default player
	Frame.className = 'red';

	//creates 8 x 8 grid and initialize ballCount as 0 and className as default
	for(var row=0;row<8;row++){
		ballCount[row] = new Array();
		divClass[row] = new Array();
		for(var col = 0; col<8; col++){
			newDiv = document.createElement('DIV');
			newDiv.id = 'div' + row + col;
			newDiv.className = 'default';
			newDiv.style.width = divWidth + 'px';
			newDiv.style.height = divHeight + 'px';
			newDiv.style.position = "absolute";
			newDiv.style.left = col * divWidth +"px";
			newDiv.style.top = row * divHeight + "px";
			newDiv.setAttribute('onClick', "action("+row+","+col+");");
			Frame.appendChild(newDiv);
			ballCount[row][col] = 0;
			divClass[row][col] = 'default';
		}
	}
}

//function on clicking a grid
function action(a_row, a_col){
	if(divClass[a_row][a_col] == 'default' || divClass[a_row][a_col] == player){
		reaction(a_row, a_col);
		Frame.className = toggle(Frame.className);
		player = toggle(player);
		//auto mode
		if(auto && (player == 'blue')){
			do{
				auto_row = Math.floor(Math.random()*8);
				auto_col = Math.floor(Math.random()*8);
			}
			while(divClass[auto_row][auto_col] == 'red');
			action(auto_row, auto_col);
		}
	}
}

function toggle(arg){
	if(arg == 'red'){
		return 'blue';
	}else{
		return 'red';
	}
	
}

function gameOver(){
	var redCount = 0;
	var blueCount = 0;
	for(var rcount=0; rcount<8; rcount++){
		for(var ccount=0; ccount<8; ccount++){
			if(divClass[rcount][ccount]=='red'){
				redCount++;
			}else if(divClass[rcount][ccount]== 'blue'){
				blueCount++;
			}
			
		}
	}
	if((redCount>2 && blueCount==0) || (blueCount>2 && redCount==0)){
		if(auto){
			if(player == 'red'){
				message = 'You Win';
			}else{
				message = 'You Lose';
			}
		}else{
			message = player + ' Wins';
		}
		Frame.innerHTML='<h2>'+message+'</h2><p>Click To Play Again</p><p onClick="init(true);">One Player</p><p onClick="init(false);">Two Players</p>';
	}
}
function reaction(r_row, r_col){
	var limit = 3;
	if(r_row == 0 || r_row == 7){
		limit--;
	}
	if(r_col == 0 || r_col == 7){
		limit--;
	}
	if(ballCount[r_row][r_col] == limit){
		document.getElementById('div'+r_row+r_col).className = "default";
		divClass[r_row][r_col] = 'default';
		ballCount[r_row][r_col] = 0;
		if(r_row != 0){
			reaction(r_row-1, r_col);
		}
		if(r_row != 7){
			reaction(r_row+1, r_col);
		}
		if(r_col !=0){
			reaction(r_row, r_col-1);
		}
		if(r_col != 7){
			reaction(r_row, r_col+1);
		}
	}else{
		ballCount[r_row][r_col] +=1;
		divClass[r_row][r_col] = player;
		document.getElementById('div'+r_row+r_col).className = player+ballCount[r_row][r_col];
		gameOver();
	}
}



