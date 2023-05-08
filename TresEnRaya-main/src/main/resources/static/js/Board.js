class Board {

    constructor(scoreBoard) {

    	this.scoreBoard = scoreBoard;
    	
        this.cells = [];
        this.players = [];
        this.ready = false;
        this.connectedPlayers = 0; // inicialmente, no hay jugadores conectados
        
        this.createTable();
    }


    createTable() {
    	
    	this.table = document.createElement('table');
        this.table.addEventListener('click', event => this.markEvent(event));    	
    	this.table.classList.add('gameBoard');
    	
        let rowCol = document.createElement('td');
        rowCol.classList.add('boardRow');
        rowCol.classList.add('bgDark');
        rowCol.setAttribute('colspan', 5);
        
        let row = document.createElement('tr');
        row.appendChild(rowCol);

        let col = document.createElement('td');
        col.classList.add('boardCol');
        col.classList.add('bgDark');

        let cell = document.createElement('td');
        cell.classList.add('gameCell');
        cell.classList.add('notActive');
        cell.setAttribute('marked', 'false');
        cell.setAttribute('data-intent', 'gameCell');

        for (let i = 0; i < 9; i++) {
        	let newCell = cell.cloneNode(true);
        	newCell.setAttribute('id', 'cell-'+i);
            this.cells.push(newCell);
        }

        for (let r, i = 0; i < 9; i += 3) {
            
        	r = row.cloneNode(false);
            r.appendChild(this.cells[i]);
            r.appendChild(col.cloneNode(false));
            r.appendChild(this.cells[i + 1]);
            r.appendChild(col.cloneNode(false));
            r.appendChild(this.cells[i + 2]);

            this.table.appendChild(r);

            if (i < 6) {
                this.table.appendChild(row.cloneNode(true));
            }
        }
    }

    addTable(container) {
        container.appendChild(this.table);
    }

    disableAll() {
        for (let cell of this.cells) {
            cell.classList.add('notActive');
            cell.setAttribute('active', 'false');
        }
    }

    enableAll() {
        for (let cell of this.cells) {
            cell.classList.remove('notActive');
            cell.setAttribute('marked', 'false');
        }
    }

    enableTurn() {
        for (let cell of this.cells) {
            if (cell.getAttribute('marked') === 'false') {
                cell.classList.remove('notActive');
                cell.setAttribute('active', 'true');
            }
        }
    }

    highlightCells(positions) {
        
        for (let i of positions) {
        	this.cells[i].classList.add('colorRed');
        }

        for (let cell of this.cells) {
            cell.setAttribute('marked', 'true');
        }
    }

    lowlightCells() {        
        for (let cell of this.cells) {
            cell.classList.add('colorWhite');
        }
    }

    onMark(cellId) { }
    
    markEvent(event) {
        let target = event.target;

        if (this.ready && target.getAttribute('data-intent') === 'gameCell' && 
        		target.getAttribute('active') === 'true') {
            this.onMark(this.cells.indexOf(target));
            this.disableAll();
        }
    }

    doMark(cellId, label) {
        let cell = this.cells[cellId];
        cell.textContent = label;
        cell.classList.add('notActive');
        cell.setAttribute('marked', 'true');
    }

    doWinner(winner, pos) {
    	
    	let looser;
    	if(winner === this.players[0].name){
    		looser = this.players[1].name;
    	} else {
    		looser = this.players[0].name;
    	}
    	
        
        document.getElementById("resultados").innerHTML = winner+" is the winner, "+looser+" is a looser ";

    	
    	this.disableAll();
        this.highlightCells(pos);
    }

    doDraw() {
    	alert("Draw!");
        this.lowlightCells();
    }

    highlightScoreboard(playerId) {

        for (let board of this.scoreBoard) {
            board.classList.remove('active');
            
            if (board.getAttribute('playerId') == playerId) {
                board.classList.add('active');
            }
        }
    }

    addPlayer(player) {
        if (this.players.length < 2) {
            if (this.players.length === 0 || this.players[0].id != player.id) {
                this.players.push(player);
    
                let score = this.scoreBoard[this.players.length - 1];
    
                if (this.players.length === 1) {
                    score.textContent = player.label + ' ' + player.name;
                } else {
                    score.textContent = player.name + ' ' + player.label;
                }
    
                score.setAttribute('playerId', player.id);

                this.connectedPlayers++; // incrementa el contador de jugadores conectados
    

                if(this.connectedPlayers == 2){ // comprueba si hay dos jugadores conectados
                    let div_crono = document.getElementById('div_crono');
                    div_crono.style.display = "flex"




                    let segundos_crono = 0;
                    let minutos_crono = 0;
                    let horas_crono = 0;


                    function updateTime() {
                        segundos_crono++;
                        if (segundos_crono === 60) {
                        segundos_crono = 0;
                        minutos_crono++;
                        if (minutos_crono === 60) {
                            minutos_crono = 0;
                            horas_crono++;
                        }
                        }
                        document.getElementById("texto_crono").textContent = `${horas_crono
                        .toString()
                        .padStart(2, "0")}:${minutos_crono.toString().padStart(2, "0")}:${segundos_crono
                        .toString()
                        .padStart(2, "0")}`;
                    }

                    setInterval(updateTime, 1000);
                }

            }
        }
    }
    
    
    restart(){
    	
    	for (let cell of this.cells) {
    		
    		cell.classList.remove('colorRed');
    		cell.classList.add('notActive');
    		
    		cell.classList.remove('colorWhite');    		
    		cell.classList.remove('colorRed');
    		
            cell.setAttribute('marked', 'false');            
            cell.setAttribute('active', 'false');
            
            cell.textContent = '';
        }    	
    }
}
