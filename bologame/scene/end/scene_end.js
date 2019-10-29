class SceneEnd extends BoloScene {
    constructor(game) {
        super(game)
        game.registerAction('r', function(){
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }

    draw() {
        this.game.context.fillText('按 r 返回标题', 100, 290)
    }
}