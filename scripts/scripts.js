const container = document.querySelector('#container');
let clickState = 0;

function createGrid(size){
    for(let i=1; i<=(size*size); i++){
        const div = document.createElement('div');
        div.setAttribute('style', `width: ${700/size}px; height: ${550/size}px`);
        div.classList.add('div-style');
        div.setAttribute('class', 'divs');
        container.appendChild(div);
    }
}
createGrid(24);
const divs = document.querySelectorAll('.divs');
const clearBtn = document.querySelector('#clear');
container.addEventListener('click', togglePen);
clearBtn.addEventListener('click', clearSketch);

function clearSketch() {
    divs.forEach(div => {
        div.classList.remove('makeBlack');
    });
}
function togglePen() {
    if(clickState == 0){
        divs.forEach(div => {
            div.addEventListener('mouseover', makeBlack);
        });
        clickState = 1;
    }
    else {
        divs.forEach(div => {
            div.removeEventListener('mouseover', makeBlack);
        });
        clickState = 0;
    }
}

function makeRainbow(e) {
    const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    let randomColor = '#';
    for(let i=0; i<6; i++){
        randomColor += hex[Math.floor(Math.random()*(hex.length-1))];
    }
    this.style.backgroundColor = `${randomColor}`;
}

function makeBlack(e) {
    this.classList.add('makeBlack');
}

