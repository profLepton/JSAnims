var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');



const width = innerWidth;
const height = innerHeight;



var cw = canvas.width = width;
var ch = canvas.height = height;

function draw() {

    output = getColors(1000000);


    ctx.clearRect(0, 0, cw, ch);
    
    for (let i=0; i<width; i++){
        for (let j=0; j<height; j++){
        let o = output[i][j]
        ctx.fillStyle = 'rgb(' + o + ',' + o + ',' + o + ')';
        ctx.fillRect(i, j, 1, 1);
        }
    }
}


function getColors(n){
    //Create a 2D array of size width x height with initial value 0
    let output = Array.from(Array(width), () => new Array(height).fill(255));
    //Three vertices of the triangle
    let p1 = [0, height];
    let p2 = [width, height];
    let p3 = [width/2, 0];
    //Starting point
    let p = [Math.random() * width, Math.random() * height];
    for (let i=0; i<n; i++){
        let r = Math.random() * 3;
        if (r < 1){
            p = [(p[0] + p1[0])/2, (p[1] + p1[1])/2];
        }
        else if (r < 2 && r > 1){
            p = [(p[0] + p2[0])/2, (p[1] + p2[1])/2];
        }
        else{
            p = [(p[0] + p3[0])/2, (p[1] + p3[1])/2];
        }
        output[Math.floor(p[0])][Math.floor(p[1])] = 0;
    }
    return output;
}


    


draw();