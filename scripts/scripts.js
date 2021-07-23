const container = document.querySelector('#container');

// const rainbowBtn = document.querySelector('#rainbow');
// rainbowBtn.addEventListener('click', )

function createGrid(size){
    for(let i=1; i<=(size*size); i++){
        const div = document.createElement('div');
        div.setAttribute('style', `width: ${700/size}px; height: ${550/size}px`);
        div.classList.add('div-style');
        container.appendChild(div);
    }
}

function makeBlack(e) {
    this.classList.add('makeBlack');
}

console.dir(document.querySelector('#color-picker').value);

createGrid(16);

