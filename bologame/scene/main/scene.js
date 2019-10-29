var Scene = function(game) {
    var s = {
        game: game,
    }
    // 初始化
    var paddle = Paddle(game)
    var ball = Ball(game)

    var score = 0
    var blocks = loadLevel(game, 1)

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
    


    s.draw = function() {
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
    
    s.update = function() {
        // log('paused:', paused)
        if (window.paused) {
            return
        }

        ball.move()

        // 判断游戏结束
        if (ball.y > paddle.y) {
            // console.log('结束游戏...')
            // 跳转到游戏结束的场景
            var end = SceneEnd.new(game)
            game.replaceScene(end)
        }   

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
                score += 10
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

    return s
}