const ferrari = new Image();

function init() {
    ferrari.src = './images/ferrari.png';
    
    window.requestAnimationFrame(render_frame);
}

function render_frame() {
    const ctx = document.getElementById('canvas').getContext('2d');
    const height = ctx.canvas.height = window.innerHeight;
    const width = ctx.canvas.width = window.innerWidth;
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, width, height); 

    // Ferrari
    const time = new Date();
    ctx.translate(width/2, height/2);
    ctx.rotate((Math.PI/60) * time.getSeconds() + (Math.PI/60000) * time.getMilliseconds());
    
    ctx.drawImage(ferrari, -ferrari.width/2, -ferrari.height/2);

    

    window.requestAnimationFrame(render_frame);

} 

init();