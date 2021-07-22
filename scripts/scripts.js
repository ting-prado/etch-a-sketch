const container = document.querySelector('#container');

function addDiv(size){
    for(let i=1; i<=(size*size); i++){
        const div = document.createElement('div');
        div.setAttribute('style', `width: ${400/size}px; height: ${400/size}px`);
        div.classList.add('div-style');
        div.addEventListener('mouseover', makeBlack);
        container.appendChild(div);
    }
}

function makeBlack(e) {
    this.classList.add('makeBlack');
}

addDiv(24);

