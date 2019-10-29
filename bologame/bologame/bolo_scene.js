// 旧版语法
// var BoloScene = function() {
//     this.a = 1
// }

// BoloScene.prototype.draw = function() {

// }

class BoloScene {
    constructor(game) {
        this.game = game
    }

    // 将 new ClassName() 的方式改为 ClassName.new()
    static new(game) {
        var i = new this(game)
        return i 
    }

    draw() {
    }

    update() {
        
    }
}

