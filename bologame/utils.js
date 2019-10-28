var log = console.log.bind(console)
// var e = sel => document.querySelector(sel)

// 在 textarea 显示 log
// var log = function(s) {
//     document.querySelector('#id-text-log').value += '\n' + s
// }

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var rectIntersects = function(a, b) {
    var o = a
    // 判断球与砖块是否相交
    if (b.y > o.y && b.y < o.y + o.height) {
        if (b.x + b.width > o.x && b.x < o.x + o.width) {
            return true
        }
    } 
    return false  
}