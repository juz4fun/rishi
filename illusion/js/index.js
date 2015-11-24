 var CELL_SIZE = 50;
 var canvas = document.getElementById('c');
 var r = canvas.getBoundingClientRect();
 var gLetter = 'I';
 canvas.width = r.width;
 canvas.height = r.height;
 var ctx = canvas.getContext('2d');
 var cx = canvas.width / 2;
 var cy = canvas.height / 2;
 var gTime = 0.0;
 var gSat = 0.0;

 function animate() {
     window.requestAnimationFrame(animate);
     ctx.save();
     ctx.translate(cx, cy);
     ctx.rotate(gTime * 0.01);
     ctx.fillStyle = 'hsla(' + Math.random() * 360 + ', ' + gSat + '%, ' + Math.cos(gTime * 0.3) * 100 + '%, 0.3)';
     ctx.font = '72px sans-serif';
     for (var y = -canvas.height; y < canvas.height * 2; y += CELL_SIZE) {
         var even = false;
         for (var x = -canvas.width; x < canvas.width * 2; x += CELL_SIZE) {
             ctx.fillText(gLetter, x + (even ? CELL_SIZE / 2 : 0) - cx, y - cy);
         }
         even = !even;
     }

     //ctx.beginPath();
     //ctx.arc(Math.sin(gTime) * canvas.width / 2.5, 0, Math.abs(Math.cos(gTime * 0.1) * 30), 0, Math.PI * 2);
     //ctx.fill();
     gTime += 0.2;
     gSat = (gSat + 0.2) % 100;
     ctx.restore();
 }

 function onKeyDown(e) {
     gLetter = String.fromCharCode(e.keyCode);
 }

 window.addEventListener('keydown', onKeyDown);

 animate();