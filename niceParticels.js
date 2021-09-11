var canvas = document.getElementById("canvas"),
    c = canvas.getContext("2d"),
    i,
    j,
    k,
    colorArray = ["#f52222", "#ff9300", "#ceff00"],
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

var friction = 0.4;

class Particle {
    constructor(x, y, r, v) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = generateRandomColor();
        this.v = v;
        this.alpha = 1
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
    if (this.x + this.r > canvas.width || this.x - this.r < 0) {
            this.v.x = -this.v.x;
        }
        if (this.y + this.r > canvas.height || this.y - this.r < 0) {
            this.v.y = -this.v.y;
        }
        this.x = this.x + (this.v.x) * friction;
        this.y = this.y + (this.v.y) * friction;
        this.alpha -= 0.02;
        this.draw();
    }
}

/* end particle */

/*  end classes */

window.addEventListener("mousemove",function (e) {
    for (i = 0; i < 2; i++) {
    var r = generateRandomRange(3,3),
    v = {
        x : generateRandomRange(10,-5) * 2,
        y : generateRandomRange(10,-5) * 2
    };
    particlesArray.push(new Particle(e.x,e.y,r,v))
    }
				console.log(particlesArray);
});

function animate() {
    // animation loop
    
   	requestAnimationFrame(animate);
    
    // clearing canvas
    
    c.fillStyle = "rgba(34, 34, 34, 0.46)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    for (k = 0; k < particlesArray.length; k++) {
        if (particlesArray[k].alpha <= 0.3) {
					   gsap.to(particlesArray[k], {
							r : 0
						})
					 }
        if (particlesArray[k].alpha <= 0.03) {

            var l = k;
            
            setTimeout(function(){
                
                    particlesArray.splice(l,1);
                    
                }, 0);

        } else {
            
            particlesArray[k].update();
            
        }
    }
}
animate();