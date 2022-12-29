
// Initializing canvas






function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const R1 = 1;
const R2 = 2;
const K2 = 5;

const K1 = width * K2 * 3 / (8 * (R1 + R2));

function render_frame(A, B) {


    const canvas = document.querySelector(".myCanvas")
    const ctx = canvas.getContext("2d");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.translate(width/2, height/2);
    ctx.save();

        //Defining canvas constants
    const width = 1024;
    const height = 1024;

    //Definig render constants

    const theta_spacing = 0.07;
    const phi_spacing = 0.02;


    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var cosA = Math.cos(A);
    var cosB = Math.cos(B);
    var sinA = Math.sin(A);
    var sinB = Math.sin(B);

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

    for(let theta=0; theta < 2 * Math.PI; theta+= theta_spacing){
        var cosTheta = Math.cos(theta);
        var sinTheta = Math.sin(theta);

        for(let phi=0; phi < 2 * Math.PI; phi+= phi_spacing){
            var cosPhi = Math.cos(phi);
            var sinPhi = Math.sin(phi);

            var circlex = R2 + R1 * cosTheta;
            var circley = R1 * sinTheta;

            var x = circlex * (cosB * cosPhi + sinA * sinB * sinPhi) - circley * cosA * sinB;
            var y = circlex * (sinB * cosPhi - sinA * cosB * sinPhi) + circley * cosA * cosB;
            var z = K2 + cosA * circlex * sinPhi + circley * sinA;

            var ooz = 1 / z;

            var xp = Math.floor(width / 2 + K1 * ooz * x);
            var yp = Math.floor(height / 2 - K1 * ooz * y);

            var L = cosPhi * cosTheta * sinB - cosA * cosTheta * sinPhi - sinA * sinTheta + cosB * (cosA * sinTheta - cosTheta * sinA * sinPhi);
            
            

            if(L > 0){
                var id = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
                var pixels = id.data;
                var luminance_index = Math.floor((L * 8)/11);
                if(ooz > zbuffer[xp][yp]){
                    
                    zbuffer[xp][yp] = ooz;
                    output[xp][yp] = luminance_index* 255;
                    var off = (y * id.width + x) * 4;
                    pixels[off] = output[xp][yp];
                    pixels[off + 1] = output[xp][yp];
                    pixels[off + 2] = output[xp][yp];
                    pixels[off + 3] = 255;
                    // ctx.fillStyle = "rgb(" + output[xp][yp] + "," + output[xp][yp] + "," + output[xp][yp] + ")";
                    // ctx.fillRect(xp, yp, 1, 1);
                    
                    
                    
                }
            }
        }
        
        
    }
        ctx.putImageData(id, 0, 0);
        
        // window.requestAnimationFrame(render_frame(A+0.01, B+0.01));

}

window.onload(render_frame(0, 0));


