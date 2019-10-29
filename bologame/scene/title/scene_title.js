class SceneTitle extends BoloScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function(){
            var s = Scene(game)
            game.replaceScene(s)
        })
    }

    draw() {
        this.game.context.fillText('按 K 开始游戏', 100, 290)
    }
}