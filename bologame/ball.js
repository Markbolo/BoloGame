var Ball = function(game) {
    var o = game.imageByName('ball')
    // var o = {
    //     image: image,
    //     x: 180,
    //     y: 254,
    //     width: 31,
    //     height: 31,
    //     speedX: 10,
    //     speedY: 10,
    //     fired: false,
    // }

    o.x = 180
    o.y = 229
    o.width = 31
    o.height = 31
    o.speedX = 10
    o.speedY = 10
    o.fire = false

    o.fire = function() {
        o.fired = true
    }

    o.move = function() {
        if (o.fired) {
            // log('ball move')
            if (o.x < 0 || (o.x + o.width) > 400) {
                o.speedX = -o.speedX
            }
            if (o.y < 0 || (o.y + o.height) > 300) {
                o.speedY = -o.speedY
            }
            // move
            o.x += o.speedX
            o.y += o.speedY
        }
    }

    o.reverse = function() {
        // X 轴的反弹暂时还不生效
        o.speedY *= -1
    }

    o.hasPoint = function(x, y) {
        var xIn = x >= o.x && x <= o.x + o.w
        var yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }
    return o
}