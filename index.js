window.onload = function() {
    var as = document.getElementsByTagName('a');
    for (var a, i=0; a = as[i]; i++) {
        addListener(a, 'mouseover', setState);
    }
}

function addListener(target, event, handler) {
    target['on' + event] = function() {
        handler.call(target);
    }
}

function setState() {
    console.log(this);
}