import './mithril.min.js'

var root = document.getElementById('app')

m.mount(root, {
    view: function () {
        return m("h1", "Try me out")
    }
})