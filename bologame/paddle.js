var Paddle = function(game) {
    var o = game.imageByName('paddle')
    // var o = {
    //     image: image,
    //     x: 150,
    //     y: 285,
    //     speed: 10,
    // }
    o.x = 150
    o.y = 260  
    o.speed = 15
    var paddle = o
    o.move = function(x) {
        if (x < 0) {
            x = 0
        }
        if (o.x > 400 - o.w) {
            x = 400 - o.w
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

    var aInb = function(x, x1, x2) {
        return x >= x1 && x <= x2
    }

    o.collide = function(ball) {
        // if (ball.y + ball.h > o.y && ball.y + ball.h < o.y + o.h) {
        //     if (ball.x + ball.w > o.x && ball.x < o.x + o.w) {
        //         log('相撞')
        //         return true
        //     } 
        // } else {
        //     return false
        // }
        var a = o
        var b = ball
        if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }

    return o
}