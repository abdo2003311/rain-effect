var canvas = document.getElementById("canvas"),
    c = canvas.getContext("2d"),
    i,
    j,
    k,
    colorArray = ["#4d60ea", "#e38686", "#5daf9f", "#b9c940", "#dd5252", "#59d38c", "#cf42d4"],
    mouse = {
        x: undefined,
        y: undefined
    };
var particlesArray = [];

function generateRandomRange(firstNum, lastNum) {
    return (Math.random() * firstNum) + lastNum;
}

function generateRandomColor() {
    return colorArray[Math.floor(Math.random() * colorArray.length)];
}

/* resize */

canvas.width = innerWidth;
canvas.height = innerHeight;
function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
window.onresize = function () {
    resize();
};
/* end resize */

/* classes */

/* particle */

var friction = 0.7;

class Particle {
    constructor(x, y, r, v) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = "white";
        this.v = v;
        this.alpha = 0.02
    }
    draw() {
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.r, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke()
        c.closePath();
        c.restore();
    }
    update() {
        this.x = this.x + (this.v.x) * friction;
        this.y = this.y + (this.v.y) * friction;
        if (this.alpha >= 1){
            gsap.to(this, {
                alpha : this.alpha - .5
            })
        } else {
            this.alpha += 0.01;
        }
        if (
            Math.abs(this.x - mouse.x) < 50 &&
            Math.abs(this.y - mouse.y) < 50 &&
            this.r < 30
        ) {
            this.r += 5;
        }
        this.draw();
    }
}

setInterval(function(){
     var x = generateRandomRange(canvas.width,0),
        y = generateRandomRange(canvas.height,0),
        r = generateRandomRange(3,1),
    v = {
        x : -1,
        y : 1
    };
    particlesArray.push(new Particle(x,y,r,v))
},100)
/* end particle */

/*  end classes */

var animationId;

function animate1() {
    // animation loop
    
    animationId  = requestAnimationFrame(animate1);
    // clearing canvas 
    c.fillStyle = "rgba(0, 2, 29, 0.2)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    for (k = 0; k < particlesArray.length; k++) {
        
        if (particlesArray[k].alpha <= 0.01) {
            
            var l = k;
            
            setTimeout(function(){
                
                    particlesArray.splice(l,1);
                    
                }, 0);

        } else {
            
            particlesArray[k].update();
            
        }
    }
}
animate1();