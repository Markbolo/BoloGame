class BoloGame {
    constructor(fps, images, runCallback) {
        // 全局 fps
        window.fps = fps
        this.images = images
        this.runCallback = runCallback
        //
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')

        // events
        var self = this
        // 箭头函数可以用 this
        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = true
        })
    
        window.addEventListener('keyup', function(event){
            // log('event.key:', event.key)
            self.keydowns[event.key] = false
        })
        this.init()
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    drawImage(img) {
        this.context.drawImage(img.image, img.x, img.y)
    }

    // update
    update() {
        // log('g.scene:', g.scene)
        this.scene.update()
    }

    // draw
    draw() {
        this.scene.draw()
    }

    registerAction(key, callback) {
        this.actions[key] = callback
    }

    runloop() {
        // log('g.actions:', g.actions)
        var g = this
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                // 如果按键被按下，调用注册的 action
                g.actions[key]()
            }
        }

        // update
        // 如果存在 g.update 则调用
        // g.update && g.update()
        g.update()

        // clear
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)

        // draw
        g.draw()

        setTimeout(function(){
            g.runloop()
        }, 1000/window.fps)
    }

    imageByName(name) {
        var g = this
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }

    runWithScene(scene) {
        var g = this
        g.scene = scene
        // 开始运行程序
        setTimeout(function(){
            g.runloop()
        }, 1000/fps)
    }

    replaceScene(scene) {
        this.scene = scene
    }

    __start(scene) {
        this.runCallback(this)
    }

    init() {
        var g = this
        var loads = []
        // 预先载入所有图片
        var names = Object.keys(g.images)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = g.images[name]
            let img = new Image()
            img.src = path
            img.onload = function() {
                // 存入 g.images 中
                g.images[name] = img
                // 所有图片都成功载入之后，调用 run
                loads.push(1)
                if (loads.length == names.length) {
                    g.__start()
                }
            }
        }
    }
}
