$(() => {

    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    const uwCanvas = document.createElement('canvas');
    const uwCtx = uwCanvas.getContext('2d');

    const img = document.querySelector('img');

    const size = document.querySelector('.js-size');
    const flow = document.querySelector('.js-flow');
    const clear = document.querySelector('.js-clear');

    clear.addEventListener('click', function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    function initUwCanvas() {
        uwCanvas.width = img.width / 2;
        uwCanvas.height = img.height / 2;
    }

    if (img.complete) {
        initUwCanvas();
    } else {
        img.addEventListener('load', initUwCanvas);
    }

    const STATE = {
        FRAME: 0,
        W: window.innerWidth,
        H: window.innerHeight,
        X: window.innerWidth / 2,
        Y: window.innerHeight / 2,
        P_DOWN: false,
        COLOR: '#000000',
        CAP_SIZE: size.value / 100,
        FLOW: flow.value / 100
    };


    var isPointerDown = false;
    var circleSize = 10;
    const MAX_SIZE = 50;

    function drawCircle({
        x,
        y
    }) {
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        uwCtx.globalAlpha = STATE.FLOW;
        ctx.beginPath();
        ctx.drawImage(
            uwCanvas,
            0, 0, uwCanvas.width, uwCanvas.height,
            x - uwCanvas.width * STATE.CAP_SIZE / 2, y - uwCanvas.height * STATE.CAP_SIZE / 2,
            uwCanvas.width * STATE.CAP_SIZE, uwCanvas.height * STATE.CAP_SIZE);

        ctx.fill();
    }

    function update(t) {
        if (STATE.P_DOWN && circleSize < MAX_SIZE) {
            ++circleSize;
        } else if (!STATE.P_DOWN && isPointerDown) {
            circleSize = 10;
        }

        isPointerDown = STATE.P_DOWN;
    }


    function drawMask() {
        uwCtx.globalCompositeOperation = 'source-over';
        uwCtx.clearRect(0, 0, uwCanvas.width, uwCanvas.height);
        rotation += 0.01 * Math.PI / 180;
        uwCtx.save();
        uwCtx.translate(uwCanvas.width / 2, uwCanvas.height / 2);
        uwCtx.rotate(rotation);
        uwCtx.translate(-uwCanvas.width / 2, -uwCanvas.height / 2);
        uwCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, uwCanvas.width, uwCanvas.height);
        uwCtx.restore();
        uwCtx.globalCompositeOperation = 'source-in';
        uwCtx.fillStyle = STATE.COLOR;
        uwCtx.fillRect(0, 0, uwCanvas.width, uwCanvas.height);
    }

    function lerp(v0, v1, t) {
        return v0 * (1 - t) + v1 * t;
    }


    var rotation = 0;
    var position;

    function draw() {
        drawMask();
        let pos = {
            x: STATE.X,
            y: STATE.Y
        };
        if (position) {
            pos.x = lerp(position.x, pos.x, 0.7);
            pos.y = lerp(position.y, pos.y, 0.7);
        }

        position = pos;


        if (isPointerDown) {
            drawCircle(pos);

            // 		if (shouldDrip(pos) {
            // 			drip(pos)
            // 		}
        }
    }

    var times = 0;
    var lastPosition = {
        x: null,
        y: null
    };
    const MAX_TIMES = 80;

    // function shouldDrip({x, y}) {
    // 	if (Math.abs(lastPosition.x - x) < 20)
    // 		if (Math.abs(lastPosition.y - y) < 20)
    // 			++times

    // 	if (times > MAX_TIMES) {
    // 		times = MAX_TIMES / 2
    // 		return true
    // 	}
    // }


    size.addEventListener('change', onSizeChange);

    function onSizeChange() {
        STATE.CAP_SIZE = size.value / 100;
    }

    flow.addEventListener('change', onFlowChange);

    function onFlowChange() {
        STATE.FLOW = flow.value / 100;
    }

    $('.js-palette').hover(function () {
        [].slice.call(document.querySelectorAll('.Palette_colors button.Palette_color')).
        forEach(COLOR => COLOR.addEventListener('click', function () {
            STATE.COLOR = COLOR.dataset.color;
            console.log(STATE.COLOR);
        }))
    });

    // [].slice.call(document.querySelectorAll('.Palette_colors button.Palette_color')).
    // forEach(COLOR => COLOR.addEventListener('click', function () {
    //     STATE.COLOR = COLOR.dataset.color;
    //     console.log(STATE.COLOR);
    // }));


    // [].slice.call(document.querySelectorAll('button.Palette_color')).
    // forEach(color => color.addEventListener('click', function () {
    //     STATE.COLOR = color.dataset.color;
    //     console.log(STATE.COLOR);
    // }));

    window.addEventListener('resize', onResize);

    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);
    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('touchstart', onPointerDown);
    window.addEventListener('mousemove', ({
        clientX,
        clientY
    }) => onPointerMove(clientX, clientY));
    window.addEventListener('touchmove', ({
        touches: [{
            pageX,
            pageY
        }]
    }) => onPointerMove(pageX, pageY));


    function start() {
        onResize();
        loop();
    }

    function loop(t) {
        update(t);
        draw();
        ++STATE.FRAME;
        requestAnimationFrame(loop);
    }

    function onResize() {
        canvas.width = STATE.W = window.innerWidth;
        canvas.height = STATE.H = window.innerHeight;
        STATE.MIN = Math.max(STATE.W, STATE.H);
    }

    function onPointerMove(x, y) {
        STATE.X = x;
        STATE.Y = y;
    }

    function onPointerDown(e) {
        if (e.target.tagName !== 'CANVAS') return;
        STATE.P_DOWN = true;
    }

    function onPointerUp(e) {
        if (e.target.tagName !== 'CANVAS') return;
        STATE.P_DOWN = false;
    }



    ///
    start();
})