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

    
     // Get an array of prime numbers less than width
     let primes = [];
     for (let i=2; i<width/2; i++){
         let isPrime = true;
         for (let j=2; j<i; j++){
             if (i % j == 0){
                 isPrime = false;
                 break;
             }
         }
         if (isPrime){
             primes.push(i);
         }
 
     }
 
     //Plot prime spiral in polar coordinates
     let r = 0;
     let theta = 0;
     let i = 0;
     while (r < width/2){
         let x = Math.floor(r * Math.cos(theta) + width/2);
         let y = Math.floor(r * Math.sin(theta) + height/2);
         output[x][y] = 0;
         r += primes[i];
         theta += primes[i];
         i++;
     }
 
    return output;
}


    


draw();