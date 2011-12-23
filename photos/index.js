DTD.Photos = {
    setup: function() {
        var html = [];
        for (var i=0, file; file = this.files[i]; i++) {
            html.push('<div class="photo">',
                '<img src="photos/', file.name, '-thumb.jpg" />',
                '<div class="caption">', file.caption, '</div>',
            '</div>');
        }

        DTD.getPhotos().innerHTML += html.join('');

        document.onkeydown = function(event) {
            event = event || window.event;
            if (event.keyCode == 27) {
                DTD.Photos.hideLightBox();
            }
        };

        var mask = this.getMask();
        var focused = this.getFocusedPhoto();
        mask.onclick = focused.onclick = function() {
            DTD.Photos.hideLightBox();
        };

        DTD.getPhotos().onclick = function(event) {
            event = event || window.event;
            var target = event.target || event.srcElement;

            if (target.tagName == 'IMG') {
                while (focused.firstChild) {
                    focused.removeChild(focused.firstChild);
                }

                var photo = target.parentNode.cloneNode(true);
                var img = DTD.simpleSelect('img', photo)[0];
                img.src = img.src.replace(/-thumb/, '');

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

    getMask: function() {
        return document.getElementById('mask');
    },

    getFocusedPhoto: function() {
        return document.getElementById('focused-photo');
    },

    files: [{
        name: 'stairs',
        caption: 'A touch of black.'
    }, {
        name: 'mantel',
        caption: 'Keep warm by the fire.'
    }, {
        name: 'shelve',
        caption: 'A nice place for decorations.'
    }, {
        name: 'dining',
        caption: 'Eat and be merry.'
    }]
};