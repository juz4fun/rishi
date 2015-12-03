console.clear();

var img = document.getElementById('input');

var c = document.getElementById('output'),
    ctx = c.getContext('2d');

c.width = img.width;
c.height = img.height;

var tic, sine, sineNormalized,
    start = Date.now();

// controllers
var params = {
    AMP: 20,
    FREQ: 0.03,
    SPEED: 4
};

function update() {
    tic = (Date.now() - start) * 0.001;
}

function render() {
    ctx.clearRect(0, 0, c.width, c.height);
    for (var i = 0; i < img.height; i++) {
        var ofs = params.AMP * Math.sin(tic * params.SPEED + (i * params.FREQ));
        ctx.drawImage(img,
            0, i, img.width, 1,
            0 + ofs, i, img.width, 1);
    }
}

function loop() {
    requestAnimationFrame(loop);
    update();
    render();
}

$('nav input').on('input change', function() {
    var t = $(this).attr('data-param');
    params[t] = $(this).val();
});

loop();
