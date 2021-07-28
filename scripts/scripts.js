const container = document.querySelector('#container');
let clickState = 0,
    penColor = 'yellow';

function createGrid(size){
    for(let i=1; i<=(size*size); i++){
        const div = document.createElement('div');
        div.setAttribute('style', `width: ${700/size}px; height: ${550/size}px`);
        div.classList.add('div-style');
        div.setAttribute('class', 'divs');
        container.appendChild(div);
    }
}

createGrid(16);

const divs = document.querySelectorAll('.divs');
const clearBtn = document.querySelector('#clear');
const colorPicker = document.querySelector('#color-picker');
const blackBtn = document.querySelector('#black');
const rainbowBtn = document.querySelector('#rainbow');
const gridSizeBtn = document.querySelector('#grid-size');

clearBtn.addEventListener('click', clearSketch);
container.addEventListener('click', togglePen);
blackBtn.addEventListener('click', selectBlack);
colorPicker.addEventListener('change', selectCustom);
gridSizeBtn.addEventListener('click', newGrid);

function newGrid() {
    const size = prompt("Please enter grid size", "16");
}

function clearSketch() {
    divs.forEach(div => {
        div.style.backgroundColor = 'white';
    });
}

function togglePen(e) {
    if(clickState == 0){
        divs.forEach(div => {
            div.addEventListener('mouseover', drawColor);
        });
        clickState = 1;
    }
    else {
        divs.forEach(div => {
            div.removeEventListener('mouseover', drawColor);
        });
        clickState = 0;
    }
}

function drawColor() {
    this.style.backgroundColor = penColor;
}

function selectCustom() {
    penColor = colorPicker.value;
}

function selectBlack() {
    penColor = 'black';
}

function makeRainbow(e) {
    let h = [Math.floor(Math.random()*360)],
        smin = Math.ceil(50),
        smax = Math.floor(100),
        s = [Math.floor(Math.random()*(smax - smin) + smin)],
        l = 50;
    if (this.style.backgroundColor == "" || this.style.backgroundColor == 'white'){
        let randomColor = `hsl(${h}, ${s}%, ${l}%)`;
        this.style.backgroundColor = randomColor;
    }
    else {
        let splitrgb = this.style.backgroundColor.split(/[\s,()]+/, 4),
        r = splitrgb[1],
        g = splitrgb[2],
        b = splitrgb[3],
        hslValue = rgbToHsl(r, g, b);
        this.style.backgroundColor = darkenColor(hslValue[0], hslValue[1], hslValue[2]);
    }
}

function darkenColor(h, s, l){
    let newColor = `hsl(${h}, ${s}%, ${l-5}%)`;
    return newColor;
}

function rgbToHsl(r, g, b){
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;
  
    // Find greatest and smallest channel values
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    // Calculate hue
    // No difference
    if (delta == 0)
        h = 0;
    // Red is max
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
        h = (b - r) / delta + 2;
    // Blue is max
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);
  
    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;

      // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
  // Multiply l and s by 100
  s = +(s * 100).toFixed(0);
  l = +((l) * 100).toFixed(1);

   return [h,s,l];
}

