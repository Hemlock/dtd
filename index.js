DTD = {
    address: [100, 111, 117, 103, 64, 100, 111, 117, 103, 116, 97, 121, 108, 111, 114, 100, 101, 99, 111, 114, 97, 116, 105, 110, 103, 46, 99, 111, 109],
    setup: function() {
        this.setupLinks();
        this.setupPhotos();
        this.setupEmail();
        this.getMain().className = 'about';
    },

    setupLinks: function() {
        var main = this.getMain();
        var links = this.getLinks()
        links.onclick = links.onmouseover = function(event) {
            event = event || window.event;
            var cls = (event.target || event.srcElement).parentNode.className;
            switch (cls) {
                case 'about':
                case 'services':
                case 'photos':
                    main.className = cls;
                    break;
                default:
                    break;

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
                photo.style.left = ((focused.offsetWidth >> 1) - (photo.offsetWidth >> 1)) + 'px';
                photo.style.top = ((focused.offsetHeight >> 1) - (photo.offsetHeight >> 1)) + 'px';
                mask.className = 'visible';
                focused.className = 'focused-photo visible';

            }
        };
    },

    hideLightBox: function() {
        this.getMask().className = 'hidden';
        this.getFocusedPhoto().className = 'hidden'
    },

    setupEmail: function() {
        var html = '';
        for (var i=0, c; c = this.address[i]; i++) {
            html += '&#' + c + ';<span>' + randomChars() + '</span>';
        }

        var emails = this.getEmailNodes();
        for (var i = 0, email; email = emails[i]; i++) {
            email.innerHTML = html;
            email.onclick = function() {
                DTD.openEmail();
            }
        }

        function randomChars() {
            var i = Math.floor(Math.random() * 10);
            var chars = []
            while (i--) {
                chars.push('&#' + (Math.floor(Math.random() * 26) + 97) + ';');
            }
            return chars.join('');
        }
    },

    openEmail: function() {
        var str = '';
        for (var i = 0, chr; chr = this.address[i]; i++) {
            str += String.fromCharCode(chr);
        }

        location.href = 'mailto: ' + str;
    },

    simpleSelect: function(selector) {
        if (document.querySelectorAll) {
            return this.toArray(document.querySelectorAll(selector));

        } else {
            selector = selector.split('.');
            var elements = document.getElemenstByTagName(selector[0] || '*');
            if (!selector[1]) {
                return this.toArray(elements);
            }

            var matches = [];
            var re = new RegExp('\\b' + selector[1] + '\\b', 'i');
            for (var i = 0, item; item = elements[i]; i++) {
                if (re.test(item.className)) {
                    matches.push(item);
                }
            }
            return matches;
        }
    },

    toArray: function(list, start) {
        start = start || 0;
        try {
            return Array.prototype.slice.call(list, start);
        } catch (e) {
            var array = [];
            var length = list.length;
            for (var i = start; i < length; i++) {
                array.push(list[i]);
            }
            return array;
        }
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
    },

    getEmailNodes: function() {
        return this.simpleSelect('.email');
    }
};


window.onload = function() {
    DTD.setup();
}
