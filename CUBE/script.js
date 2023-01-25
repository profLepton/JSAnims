var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var cw = canvas.width = window.innerWidth;
var ch = canvas.height = window.innerHeight;


const width = innerWidth/2;
const height = innerHeight/3;

const cubeWidth = 50;


function getX(i, j, k, A, B, C){
    return j * Math.sin(A) * Math.sin(B) * Math.cos(C) - k * Math.cos(A) * Math.sin(B) * Math.cos(C) + j * Math.cos(A) * Math.sin(C) + 
    k * Math.sin(A) * Math.sin(C) + i * Math.cos(B) * Math.cos(C);
}

function getY(i, j, k, A, B, C) {
    return j * Math.cos(A) * Math.cos(C) + k * Math.sin(A) * Math.cos(C) - 
    j * Math.sin(A) * Math.sin(B) * Math.sin(C) + k * Math.cos(A) * Math.sin(B) * Math.sin(C) -
    i * Math.cos(B) * Math.sin(C);
}

function getZ(i, j, k, A, B, C) {
    return k * Math.cos(A) * Math.cos(B) - j * Math.sin(A) * Math.cos(B) + i * Math.sin(B);
}


function draw() {

    const time = new Date();
    const radians = ((Math.PI/60) * time.getSeconds() + (Math.PI/60000) * time.getMilliseconds())*10;
    output = getLuminance(radians, radians, radians);


    ctx.clearRect(0, 0, cw, ch);
    
    for (let i=0; i<width; i++){
        for (let j=0; j<height; j++){
        let o = output[i][j]
        ctx.fillStyle = 'rgb(' + o + ',' + o + ',' + o + ')';
        ctx.fillRect(i, j, 1, 1);
        }
    }
    setInterval(draw, 10);
}


function getLuminance(A, B, C){
        
    // Calculating the Math.sines and coMath.sines of the angles.
        var cosA = Math.cos(A); var sinA = Math.sin(A); var cosC = Math.cos(C);
        var sinB = Math.sin(B); var cosB = Math.cos(B); var sinC = Math.sin(C);
        

    // Creating output and zbuffer arrays.
        var output = [];
        var temp;
        for(let i=0; i<width;i++){
            temp = [];
            for(let j=0; j<height; j++){
                temp.push(0);
            }
            output[i] = temp;
        }
        temp = [];
    
        var zbuffer = output;
    

    // Calculating the luminance index.
        var L = 1;
        var resolution = 2;
        for(let i=-cubeWidth/2; i< cubeWidth/2; i+= resolution){
            for (let j=-cubeWidth/2; j< cubeWidth/2; j+= resolution) {
                for (let k=-cubeWidth/2; k< cubeWidth/2; k+=resolution) {
                    var x = getX(i, j, k, A, B, C);
                    var y = getY(i, j, k, A, B, C);
                    var z = 10 * getZ(i, j, k , A, B, C) ;
                    var ooz = 1/z;
                    var xp = Math.floor(width/2 + width/2 * ooz * x);
                    var yp = Math.floor(height/2 + height/2 * ooz * y);
                    if(xp > 0 && xp < width && yp > 0 && yp < height){
                        if(ooz > zbuffer[xp][yp]){
                            zbuffer[xp][yp] = ooz;
                            output[xp][yp] = L* 255;
                        }
                    }
                }
            }
        }

    
        return output;
}

draw();