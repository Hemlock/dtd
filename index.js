DTD = {
    focused: null,
    setup: function() {
        DTD.setupLinks();
        DTD.setupPhotos()
    },

    setupLinks: function() {
        var links = document.getElementById('links');
        links.onmouseover = function(event) {
            event = event || window.event;
            var cls = event.target.className;
            switch (cls) {
                case 'first':
                case 'last':
                    break;
                default:
                    document.getElementById('main').className = cls;
            }
        }
    },
    setupPhotos: function() {
        var photos = document.getElementById('photos');
        document.onkeydown = function(event) {
            event = event || window.event;
            if (event.keyCode == 27) {
                DTD.hideLightBox();
            }
        }

        document.getElementById('mask').onclick = DTD.hideLightBox();
        
        photos.onclick = function(event) {
            event = event || window.event;
            var target = event.target;
            if (target.tagName == 'IMG') {
                document.getElementById('mask').className="visible";

                DTD.focused = target.parentNode.cloneNode(true);
                document.body.appendChild(DTD.focused)
                DTD.focused.className = 'focused-photo'
                setTimeout(function() {
                    DTD.focused.className += ' zoom';
                }, 10);
            }
        }
    },

    hideLightBox: function() {
        if (DTD.focused) {
            document.getElementById('mask').className="";
            DTD.focused.className = 'focused-photo'
        }
    }
}


window.onload = DTD.setup
