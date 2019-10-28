var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        // 设置 block 坐标
        // b.x = p[0]
        // b.y = p[1]
        blocks.push(b)
    }
    return blocks
}


var enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }
    
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停
            window.paused = !window.paused
        } else if('1234567'.includes(k)) {
            blocks = loadLevel(game, Number(k))
        } 
    })

    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event){
        var input = event.target
        // log(event)
        window.fps = Number(input.value)
        var fpsValue = document.querySelector('#id-span-fps')
        fpsValue.innerHTML = input.value
        // log('fps:', window.fps)
    })
}


var __main = function() {
    var images = {
        ball: 'img/ball.png',
        block: 'img/block.png',
        paddle: 'img/board.png',
    }

    var game = BoloGame(30, images, function(g){
        var s = Scene(g)
        g.runWithScene(s)
    }) 

    // 调试模式
    enableDebugMode(game, true)
}

__main()