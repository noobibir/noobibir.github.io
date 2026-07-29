const canvas = document.getElementById("screen");
canvas.style.width ='100%';
canvas.style.height='100%';
canvas.width  = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

var ctx = canvas.getContext("2d");
var img = document.getElementById("juk");
var jukSpeedX = 5;
var jukSpeedY = 5;

var juki = [];
for (var i = 0; i < 300; i++) {
    juki.push({
        x: 0,
        y: 0,
        angle: 0,
        targetX: Math.random() * canvas.width,
        targetY: Math.random() * canvas.height
    })
}
setInterval(() => {
    ctx.fillStyle = "#1B1B1B";
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();

    for (var juk of juki ) {
        ctx.save();
        ctx.translate(juk.x + 32, juk.y + 32);
        ctx.rotate(juk.angle);
        ctx.translate(-juk.x - 32, -juk.y - 32);
        ctx.drawImage(img, juk.x, juk.y, 64, 64);
        ctx.restore();
        juk.angle += 0.1;

        if (juk.x < juk.targetX) {
            if (juk.targetX - juk.x > jukSpeedX) {
                juk.x += jukSpeedX;
            } else {
                juk.x = juk.targetX;
            }
        }
        if (juk.x > juk.targetX) {
            if (juk.x - juk.targetX > jukSpeedX) {
                juk.x -= jukSpeedX;
            } else {
                juk.x = juk.targetX;
            }
        }
        if (juk.y < juk.targetY) {
            if (juk.targetY - juk.y > jukSpeedY) {
                juk.y += jukSpeedY;
            } else {
                juk.y = juk.targetY;
            }
        }
        if (juk.y > juk.targetY) {
            if (juk.y - juk.targetY > jukSpeedY) {
                juk.y -= jukSpeedY;
            } else {
                juk.y = juk.targetY;
            }
        }
        if (juk.x == juk.targetX && juk.y == juk.targetY) {
            juk.targetX = Math.random() * canvas.width;
            juk.targetY = Math.random() * canvas.height;
        }
    }
}, 16)