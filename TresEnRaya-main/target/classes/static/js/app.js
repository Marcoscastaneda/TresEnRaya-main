const events = {
    
	outgoing: {
        JOIN_GAME: 'JOIN_GAME',
        MARK: 'MARK',
        RESTART: 'RESTART'
    },
    
    incoming: {
        JOIN_GAME: 'JOIN_GAME',
        MARK: 'MARK',
        SET_TURN: 'SET_TURN',
        OPPONENT_READY: 'OPPONENT_READY',
        GAME_OVER: 'GAME_OVER',
        ERROR: 'ERROR',
        RESTART: 'RESTART',
        RECONNECT: 'RECONNECT'
    }
}


let container = document.querySelector('#gameBoard');
let joinForm = document.querySelector('#joinForm');

let startBtn = document.querySelector('#startBtn');
let nameInput = document.querySelector('#nickname');

let scoreBoard = [
    document.querySelector('#p1Score'),
    document.querySelector('#p2Score')
];

let socket;
let player = {};
let board;

function initJoinForm(){
	player = {};
	board = new Board(scoreBoard);
	startBtn.setAttribute('disabled', true);
	nameInput.setAttribute('disabled', true);
	nameInput.setAttribute('placeholder', 'Loading...');
}

function start(){
	
	initJoinForm();

	socket = new WebSocket('ws://'+location.hostname+(location.port ? ':'+location.port: '')+'/tictactoe')
	socket.onmessage = event => {
		
	    var msg = JSON.parse(event.data);

	    switch (msg.action) {
	        
	    	case events.incoming.ERROR:
	            alert('Error: ' + msg.data);
	            break;
	            
	        case events.incoming.JOIN_GAME:
	        	
	        	for(let msgPlayer of msg.data){
	        		board.addPlayer(msgPlayer);
	        		if (msgPlayer.name === player.name) {
	        			player = msgPlayer;
	        			startGame();
	        		}
	        	}

	            break;
	            
	        case events.incoming.SET_TURN:
	            board.highlightScoreboard(msg.data.id);
	            board.ready = true;
	            if (msg.data.id === player.id) {
	                board.enableTurn();                
	            } 

	            break;
	            
	        case events.incoming.MARK:
	            board.doMark(msg.data.cellId, msg.data.player.label);

	            break;

	        case events.incoming.GAME_OVER:
	            if (msg.data) {
	                board.doWinner(msg.data.player.name, msg.data.pos);
	            } else {
	            	board.doDraw();
	            }
	            
	            if(player.id === 1){
	            	setTimeout(()=> 
	            		sendMessage(events.outgoing.RESTART, { playerId: player.id}), 2000);
	            }

	            break;

	        case events.incoming.RESTART:
	            
	        	board.restart();
	        	
	            break;
	            
	        case events.incoming.RECONNECT:
	        	
	        	joinForm.style.display = "block";
	        	
	        	while (container.lastChild) {
	    	        container.removeChild(container.lastChild);
	    	    }
	        	
	        	socket.close();
	        	
	        	start();
	        	
	        	break;
	    }
	};

	socket.onopen = event => {
	    startBtn.removeAttribute('disabled');
	    nameInput.removeAttribute('disabled');
	    nameInput.removeAttribute('placeholder');
	    nameInput.focus();
	};

	board = new Board(scoreBoard);
	board.onMark = cellId => {
		sendMessage(events.outgoing.MARK, { playerId: player.id, cellId: cellId });
	};
	
	player = {};
}



function comprobar_iniciar(){
	var name = nameInput.value.trim();

	if (name.length > 0) {
		player.name = name;
		sendMessage(events.outgoing.JOIN_GAME, { name: name });
	}
}

startBtn.addEventListener('click', event => {
	comprobar_iniciar()
});

window.addEventListener("keydown", (event) => {
	var tecla = event.keyCode
	if(tecla == 13){
		comprobar_iniciar()
	}
  
})



function startGame() {
	
	joinForm.style.display = "none";
    
    if (board.players.length === 1) {
        scoreBoard[1].textContent = 'waiting...';
    }

    board.addTable(container);




	/* EMOJIS */


	/*function showBlueDiv() {
		let div = document.createElement('div');
		div.style.width = '100px';
		div.style.height = '100px';
		div.style.background = 'blue';
		div.style.position = 'absolute';
		div.style.top = Math.floor(Math.random() * (window.innerHeight - 200)) + 'px';
		div.style.left = Math.floor(Math.random() * (window.innerWidth - 200)) + 'px';
		document.body.appendChild(div);
		setTimeout(() => {
		  document.body.removeChild(div);
		}, 500);
	}*/

	var boton_emojis = document.getElementById("boton_emojis")
	boton_emojis.style.display = "flex"



	var beso = document.getElementById("beso");
	beso.addEventListener("click", function(event) {
		showBlueDiv(event, 'img/beso.png');
	});

	var enojado = document.getElementById("enojado");
	enojado.addEventListener("click", function(event) {
		showBlueDiv(event, 'img/enojado.png');
	});

	var feliz = document.getElementById("feliz");
	feliz.addEventListener("click", function(event) {
		showBlueDiv(event, 'img/feliz.png');
	});

	var llorando = document.getElementById("llorando");
	llorando.addEventListener("click", function(event) {
		showBlueDiv(event, 'img/llorando.png');
	});

	var riendo = document.getElementById("riendo");
	riendo.addEventListener("click", function(event) {
		showBlueDiv(event, 'img/riendo.png');
	});

	var sonoliento = document.getElementById("sonoliento");
	sonoliento.addEventListener("click", function(event) {
		showBlueDiv(event, 'img/sonoliento.png');
	});




	function showBlueDiv(event, img) {
		let emoji = document.createElement('img');
		emoji.style.width = '100px';
		emoji.style.height = '100px';
		emoji.style.position = 'absolute';
		emoji.style.top = Math.floor(Math.random() * (window.innerHeight - 200)) + 'px';
		emoji.style.left = Math.floor(Math.random() * (window.innerWidth - 200)) + 'px';
		emoji.src = img
		document.body.appendChild(emoji);
		setTimeout(() => {
			document.body.removeChild(emoji);
		}, 500);
	}
	
	
	  

}

function sendMessage(action, data) {

    let resp = {
        action: action,
        data: data
    };

    socket.send( JSON.stringify(resp) );
}

start();