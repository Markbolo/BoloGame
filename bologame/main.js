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

var blocks = []
var __main = function() {
    var images = {
        ball: 'img/ball.png',
        block: 'img/block.png',
        paddle: 'img/board.png',
    }

    var game = BoloGame(30, images, function(g){
        var score = 0

        var paddle = Paddle(game)
    
        var ball = Ball(game) 
    
        blocks = loadLevel(game, 1)
        
        game.registerAction('a', function(){
            paddle.moveLeft()
        })
      
        game.registerAction('d', function(){
            paddle.moveRight()
        })
    
        game.registerAction('f', function(){
            // 发射球
            ball.fire()
        })
     
        game.update = function() {
            // log('paused:', paused)
            if (window.paused) {
                return
            }
    
            ball.move()
            // 判断球与挡板相撞
            if (paddle.collide(ball)) {
                // 这里应该调用一个 ball.reverse() 来实现
                ball.speedY *= -1
            }
            // 判断球和砖块相撞
            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i]
                if (block.collide(ball)) {
                    log('block bll 相撞, block lifes:', block.lifes)
                    block.kill()
                    // 这里应该调用一个 ball.reverse() 来实现
                    ball.reverse()
                    // 更新分数
                    if (block.alive == false) {
                        score += 10
                    }
                }
            }
        }
    
        // mouse event
        var enableDrag = false
        game.canvas.addEventListener('mousedown', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            log('mousedown x y', x, y)
            // 检查是否点中了 ball
            if (ball.hasPoint(x, y)) {
                // 设置拖拽状态
                enableDrag = true
            }
        })

        game.canvas.addEventListener('mousemove', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            if (enableDrag) {
                log('mousemove x y', x, y)
                ball.x = x
                ball.y = y
            }
        })

        game.canvas.addEventListener('mouseup', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            log('mouseup x y', x, y)
            enableDrag = false
        })

        game.draw = function() {
            // draw 背景
            game.context.fillStyle = '#554'
            game.context.fillRect(0, 0, 400, 300)
            // draw
            game.drawImage(paddle)
            game.drawImage(ball)
            // draw block
            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i]
                if (block.alive) {
                    game.drawImage(block)
                }
            }
            // draw labels in canvas
            game.context.fillText('score: ' + score, 10, 290)
        }
    
    })

    // 调试模式
    enableDebugMode(game, true)

   
}

__main()