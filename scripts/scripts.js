const container = document.querySelector('#container');

// const rainbowBtn = document.querySelector('#rainbow');
// rainbowBtn.addEventListener('click', )

function createGrid(size){
    for(let i=1; i<=(size*size); i++){
        const div = document.createElement('div');
        div.setAttribute('style', `width: ${700/size}px; height: ${550/size}px`);
        div.classList.add('div-style');
        div.addEventListener('mouseover', makeRainbow);
        container.appendChild(div);
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

createGrid(16);

