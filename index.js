DTD = {
    address: [100, 111, 117, 103, 64, 100, 111, 117, 103, 116, 97, 121, 108, 111, 114, 100, 101, 99, 111, 114, 97, 116, 105, 110, 103, 46, 99, 111, 109],
    setup: function() {
        this.setupLinks();
        this.setupContacts();
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

    setupContacts: function() {
        var html = '<h4>Contact</h4>' + 
								'Phone: 616.634.2161' +
								'<div class="email" onclick="DTD.openEmail();">Email: ';
								
        for (var i=0, c; c = this.address[i]; i++) {
            html += '<span class="e">&#' + c + ';</span><span class="d">' + randomChars() + '</span>';
        }
        
        html += '</div>';
				var sections = this.getSections();
				for (var i=0, section; section = sections[i]; i++) {
					section.innerHTML += html;
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

    simpleSelect: function(selector, parent) {
        parent = parent || document;
        if (parent.querySelectorAll) {
            return this.toArray(parent.querySelectorAll(selector));

        } else {
            selector = selector.split('.');
            var elements = parent.getElemenstByTagName(selector[0] || '*');
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

    getSections: function() {
        return this.simpleSelect('.section');
    },
		
    getEmailNodes: function() {
        return this.simpleSelect('.email');
    }
};


window.onload = function() {
    DTD.Photos.setup();
    DTD.setup();
}
