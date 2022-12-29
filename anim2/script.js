var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var cw = canvas.width = window.innerWidth;
var ch = canvas.height = window.innerHeight;


function draw() {
    ctx.clearRect(0, 0, cw, ch);
    
    for (var i = 0; i < 100000; ++i) {
        var x = Math.floor(Math.random() * cw);
        var y = Math.floor(Math.random() * ch);
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
 
        ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
        ctx.fillRect(x, y, 1, 1);
    }
    requestAnimationFrame(draw);
}


draw();