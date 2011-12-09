DTD = {
    focused: null,
    setup: function() {
        this.setupLinks();
        this.setupPhotos();
        this.getMain().className = 'about';
    },

    setupLinks: function() {
        var main = this.getMain();
        var links = this.getLinks()
        links.onclick = links.onmouseover = function(event) {
            event = event || window.event;
            var cls = (event.target || event.srcElement).className;
            switch (cls) {
                case 'first':
                case 'last':
                    break;
                default:
                    main.className = cls;
            }
        }
    },

    setupPhotos: function() {
        document.onkeydown = function(event) {
            event = event || window.event;
            if (event.keyCode == 27) {
                DTD.hideLightBox();
            }
        };

        var mask = this.getMask();
        var focused = this.getFocusedPhoto();
        mask.onclick = focused.onclick = function() {
            DTD.hideLightBox();
        };
        this.getPhotos().onclick = function(event) {
            event = event || window.event;
            var target = event.target || event.srcElement;

            if (target.tagName == 'IMG') {
                while (focused.firstChild) {
                    focused.removeChild(focused.firstChild);
                }

                var photo = target.parentNode.cloneNode(true);
                focused.appendChild(photo);
                photo.style.left = ((focused.offsetWidth>>1) - (photo.offsetWidth>>1)) + 'px';
                photo.style.top = ((focused.offsetHeight>>1) - (photo.offsetHeight>>1)) + 'px';
                mask.className = 'visible';
                focused.className = 'focused-photo visible';

            }
        };
    },

    hideLightBox: function() {
        this.getMask().className = 'hidden';
        this.getFocusedPhoto().className = 'hidden'
    },

    getMain: function() {
        return document.getElementById('main');
    },

    getLinks: function() {
        return document.getElementById('links');
    },

    getPhotos: function() {
        return document.getElementById('photos');
    },

    getMask: function() {
        return document.getElementById('mask');
    },

    getFocusedPhoto: function() {
        return document.getElementById('focused-photo');
    }
};


window.onload = function() {
    DTD.setup();
}
