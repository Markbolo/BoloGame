var SceneEnd = function(game) {
    var s = {
        game: game,
    }
    
    s.draw = function() {
        // draw labels in canvas
        game.context.fillText('game over', 100, 290)
    }
    
    s.update = function() {
        
    }
    
    return s
}