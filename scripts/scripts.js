const container = document.querySelector('#container');
let clickState = 0,
    penColor = 'yellow';

function createGrid(size){
    for(let i=1; i<=(size*size); i++){
        const div = document.createElement('div');
        div.setAttribute('style', `width: ${700/size}px; height: ${550/size}px`);
        div.setAttribute('class', 'divs');
        container.appendChild(div);
    }
}

createGrid(16);

const clearBtn = document.querySelector('#clear');
const colorPicker = document.querySelector('#color-picker');
const blackBtn = document.querySelector('#black');
const rainbowBtn = document.querySelector('#rainbow');
const eraserBtn = document.querySelector('#eraser');
const gridSlider = document.querySelector('#slider');
const gridInput = document.querySelector('#num-input');

clearBtn.addEventListener('click', clearSketch);
container.addEventListener('click', togglePen);
blackBtn.addEventListener('click', selectBlack);
rainbowBtn.addEventListener('click', selectRainbow);
colorPicker.addEventListener('change', selectCustom);
eraserBtn.addEventListener('click', selectEraser);
gridSlider.addEventListener('change', newGridSlider);
gridInput.addEventListener('change', newGridInput);

function newGridSlider() {
    deleteGrid();
    createGrid(gridSlider.value);
    penColor = colorPicker.value;
    gridInput.value = gridSlider.value;
}

function newGridInput() {
    deleteGrid();
    createGrid(gridInput.value);
    penColor = colorPicker.value;
    gridSlider.value = gridInput.value;
}

function deleteGrid() {
    container.innerHTML = "";
}

function clearSketch() {
    const divs = document.querySelectorAll('.divs');
    divs.forEach(div => {
        div.style.backgroundColor = 'white';
    });
}

function togglePen(e) {
    const divs = document.querySelectorAll('.divs');
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

function selectEraser() {
    const divs = document.querySelectorAll('.divs');
    penColor = 'white';
    divs.forEach(div => {
        div.removeEventListener('mouseover', makeRainbow);
    });
}

function selectCustom() {
    const divs = document.querySelectorAll('.divs');
    penColor = colorPicker.value;
    divs.forEach(div => {
        div.removeEventListener('mouseover', makeRainbow);
    });
}

function selectBlack() {
    const divs = document.querySelectorAll('.divs');
    penColor = 'black';
    divs.forEach(div => {
        div.removeEventListener('mouseover', makeRainbow);
    });
}

function selectRainbow() {
    const divs = document.querySelectorAll('.divs');
    divs.forEach(div => {
        div.addEventListener('mouseover', makeRainbow);
    });
}

function makeRainbow(e) {
    let h = [Math.floor(Math.random()*360)],
        smin = Math.ceil(50),
        smax = Math.floor(100),
        s = [Math.floor(Math.random()*(smax - smin) + smin)],
        l = 50;
    if (this.style.backgroundColor == "" || this.style.backgroundColor == 'white'){
        let randomColor = `hsl(${h}, ${s}%, ${l}%)`;
        penColor = randomColor;
    }
    else {
        let splitrgb = this.style.backgroundColor.split(/[\s,()]+/, 4),
        r = splitrgb[1],
        g = splitrgb[2],
        b = splitrgb[3],
        hslValue = rgbToHsl(r, g, b);
        penColor = darkenColor(hslValue[0], hslValue[1], hslValue[2]);
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

