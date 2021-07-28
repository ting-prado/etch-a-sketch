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
const colorPicker = document.querySelector('#color-picker');
const blackBtn = document.querySelector('#black');
const rainbowBtn = document.querySelector('#rainbow');

clearBtn.addEventListener('click', clearSketch);
colorPicker.addEventListener('change', customPen);
blackBtn.addEventListener('click', blackPen);
rainbowBtn.addEventListener('click', rainbowPen);

function clearSketch() {
    divs.forEach(div => {
        div.style.backgroundColor = 'white';
    });
}

function customPen(e) {
    container.addEventListener('click', drawCustomColor);
    colorPicker.addEventListener('change', drawCustomColor);
    container.removeEventListener('click', drawBlack);
    container.removeEventListener('click', drawRainbow);
}

function blackPen(e) {
    container.removeEventListener('click', drawRainbow);
    container.removeEventListener('click', drawCustomColor);
    container.addEventListener('click', drawBlack);
}

function rainbowPen(e) {
    container.removeEventListener('click', drawBlack);
    container.removeEventListener('click', drawCustomColor);
    container.addEventListener('click', drawRainbow);
}

function drawCustomColor(e) {
    if(clickState == 0){
        divs.forEach(div => {
            div.addEventListener('mouseover', makeCustom);
        });
        clickState = 1;
    }
    else {
        divs.forEach(div => {
            div.removeEventListener('mouseover', makeCustom);
        });
        clickState = 0;
    }
}

function drawRainbow(e){
    if(clickState == 0){
        divs.forEach(div => {
            div.addEventListener('mouseover', makeRainbow);
        });
        clickState = 1;
    }
    else {
        divs.forEach(div => {
            div.removeEventListener('mouseover', makeRainbow);
        });
        clickState = 0;
    }
}

function drawBlack(e) {
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

function makeCustom(e) {
    this.style.backgroundColor = colorPicker.value;
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

function makeBlack(e) {
    this.style.backgroundColor = 'black';
}

