

 // inserisco in una costante l'elemento bottone

 document.getElementById('play').addEventListener('click', play);


 function play(){
     const N_BOMBE = 16;

     console.log('avvio del gioco');

     //resetto la griglia

     const gioco= document.getElementById('cont-2');
     gioco.innerHTML='';

     const difficolta = document.getElementById('select').value;

     let numeroCelle;
     let celleperRiga;
     const tentativi =[];

     switch(difficolta) {

        case"Easy":
        default:
            numeroCelle=100;
            break;

        case "Medium":
            numeroCelle=81;
            break;
        
        case "Insane":
            numeroCelle=49;
            break;

     }

     GeneraCampoGioco(numeroCelle);
    
 



/*FUNZIONI */


const bombe = GeneraBombe(N_BOMBE , numeroCelle);
console.log(bombe);

    


function GeneraCampoGioco (numeroCelle) {
    celleperRiga = Math.sqrt(numeroCelle);

    for(let i=1; i<= numeroCelle;i++) {

        const nodo = document.createElement('div');
        nodo.classList.add('square');
        const dimensione = `calc(100% / ${celleperRiga})`;
        nodo.style.width = dimensione;
        nodo.style.height =dimensione;

        nodo.innerText = i;

        nodo.addEventListener('click' , handleCellClick);

        gioco.appendChild(nodo);

    }

    return true;
}


function handleCellClick (){

    this.classList.add('squareBlue');

    this.removeEventListener('click' , handleCellClick); //impedisco di ricliccare

    const cell= parseInt(this.innerText);

    if(bombe.includes(cell)) {
        terminaGioco(tentativi, "sei riuscito a colpire" + ArrayTentativi.lenght);
    }else {
        tentativi.push(cell);
    }

    if(tentativi.lenght >=(numeroCelle-N_BOMBE)) {
        terminaGioco(tentativi, "Hai vinto!");
    }

    console.log('numero di celle cliccate');

}





function terminaGioco (ArrayTentativi, messaggio) {
    const quadrati =document.getElementsByClassName('square');
    for (let i =0; i< quadrati.length;i++) {
        if(bombe.includes(parseInt(quadrati[i].innerText))) {
            quadrati[i].classList.add('squareRed');
        }

        //rimuovo ascoltatore di eventi
        quadrati[i].removeEventListener('click' , handleCellClick);
    }

    //stampo i tentativi

    alert(messaggio);

}

function GeneraBombe(numeroBombe, numeroCelle) {
    const bombeGenerate = [];
    while(bombeGenerate.lenght < numeroBombe) {
        const bomba =getRandomNumber(1,numeroCelle);

        if(!bombeGenerate.includes(bomba)) {
            bombeGenerate.push(bomba);
        }
    }

}
 }