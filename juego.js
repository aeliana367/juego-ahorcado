

const wordContainer = document.getElementById('wordContainer');
const startButton = document.getElementById('startButton');
const usedLettersElement = document.getElementById('usedLetters');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width  = 0;
ctx.canvas.height = 0;

const bodyParts = [
    [4,2,1,1],
    [4,3,1,2],
    [3,5,1,1],    //todos estos arrays sirven para dibujar al hombre ahorcado a medida que 
    [5,5,1,1],    //que el usuario se vaya equivocando  
    [3,3,1,1],
    [5,3,1,1]
];

let selectedWord;// es la variable que guarda cada letra que el usuario ingresa
let usedLetters;
let mistakes;
let hits;

const addLetter = letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
}

const addBodyPart = bodyPart => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(...bodyPart);
};

const wrongLetter = () => {
    addBodyPart(bodyParts[mistakes]);  //esta funcion dibuja al hombre a medida que el usuario se vaya equibocando
    mistakes++; ///es la variable que guarda los errores 
    if(mistakes === bodyParts.length) endGame();


}

const endGame = () => {
    document.removeEventListener('keydown', letterEvent);
    startButton.style.display = 'block'; //esta linea de codigo permite mostrar el boton de 
    //nuevo juego una vez que el juego haya finalizado dependiendo de si acerto o no 



}

const correctLetter = letter => {
    const { children } =  wordContainer;
    for(let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            hits++; //es la variable que guarda los aciertos 
            
        }
    }
    if(hits === selectedWord.length) endGame();




}

const letterInput = letter => {
    if(selectedWord.includes(letter)) {
        correctLetter(letter);

    } else {
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);



    if(mistakes == 6){
        alert("Fin del juego");
    
    }else if(hits == selectedWord.length){
        alert("Ganaste,felicidades");
    
    }
};



const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    if(newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        //(/^[a-zñ]$/i) es una expresion regular indica si la letra inidicada esta entre la a
        // y la z, pero si se coloca un numero el if no funcionara 
        letterInput(newLetter);
    };


};

const drawWord = () => {
    selectedWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        wordContainer.appendChild(letterElement);
        
    });
};

const selectRandomWord = () => {
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase();
    selectedWord = word.split('');


};

const drawHangMan = () => {
    ctx.canvas.width  = 120;
    ctx.canvas.height = 160;
    ctx.scale(20, 20);//controla el tamaño de los pixeles del dibujo de la horca 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 7, 4, 1);
    ctx.fillRect(1, 0, 1, 8);    //estos arrays sirven para dibujar la horca 
    ctx.fillRect(2, 0, 3, 1);
    ctx.fillRect(4, 1, 1, 1);
};

const startGame = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    startButton.style.display = 'none';
    drawHangMan();
    selectRandomWord();
    drawWord();
    document.addEventListener('keydown', letterEvent);



};

startButton.addEventListener('click', startGame);


