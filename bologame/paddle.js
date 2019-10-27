var Paddle = function(game) {
    var o = game.imageByName('paddle')
    // var o = {
    //     image: image,
    //     x: 150,
    //     y: 285,
    //     speed: 10,
    // }
    o.x = 150
    o.y = 285
    o.speed = 15
    var paddle = o
    o.move = function(x) {
        if (x < 0) {
            x = 0
        }
        if (o.x > 400 - o.image.width) {
            x = 400 - o.image.width
        }
        o.x = x
    }

    o.moveLeft = function() {
        o.move(o.x - o.speed)
        // o.x -= o.speed
        // if (o.x < 0) {
        //     o.x = 0
        // }
    }

    o.moveRight = function() {
        o.move(o.x + o.speed)
        // o.x += o.speed
        // if (o.x > 400 - o.image.width) {
        //     o.x = 400 - o.image.width
        // }
    }

    o.collide = function(ball) {
        if (ball.y + ball.height > o.y && ball.y + ball.height < o.y + o.image.height) {
            if (ball.x + ball.width > o.x && ball.x < o.x + o.image.width) {
                log('相撞')
                return true
            } 
        } else {
            return false
        }
    }

    return o
}