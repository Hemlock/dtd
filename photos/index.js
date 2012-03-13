DTD.Photos = {
    setup: function() {
        var html = ['<div class="scroller-top-fade"></div><div class="scroller">'];
        for (var i=0, file; file = this.files[i]; i++) {
            html.push('<div class="photo ',
                    file.landscape === false ? '' : 'landscape',  '">',
                '<img src="photos/', file.name, '-thumb.jpg" />',
                '<div class="caption">', file.caption, '</div>',
            '</div>');
        }
        html.push('</div><div class="scroller-bottom-fade"></div>');

        DTD.getPhotos().innerHTML += html.join('');

        document.onkeydown = function(event) {
            event = event || window.event;
            if (event.keyCode == 27) {
                DTD.Photos.hideLightBox();
            }
        };

        var mask = this.getMask();
        var focused = this.getFocusedPhoto();
        var close = this.getCloseButton();
        close.onclick = function() {
            DTD.Photos.hideLightBox();
        };

        DTD.getPhotos().onclick = function(event) {
            event = event || window.event;
            var target = event.target || event.srcElement;

            if (target.tagName == 'IMG') {
                var photo = DTD.simpleSelect('.photo', focused)[0];
                if (photo) {
                    focused.removeChild(photo);
                }

                photo = target.parentNode.cloneNode(true);
                var img = DTD.simpleSelect('img', photo)[0];
                img.src = img.src.replace(/-thumb/, '');

                focused.appendChild(photo);
                photo.style.left = ((focused.offsetWidth >> 1) - (photo.offsetWidth >> 1)) + 'px';
                photo.style.top = ((focused.offsetHeight >> 1) - (photo.offsetHeight >> 1)) + 'px';
                mask.className = 'visible';
                focused.className = 'focused-photo visible';


                close.style.top = photo.style.top;
                close.style.left = (parseInt(photo.style.left ,10) + photo.offsetWidth) + 'px';


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

    getCloseButton: function() {
        return document.getElementById('close-button');
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
    }, {
        name: 'draft-beams',
        caption: 'Details, details, details.'
    }, {
        name: 'draft-door',
        caption: 'Elegant door',
        landscape: false
    }, {
        name: 'draft-steps',
        caption: 'Grand stair case.',
        landscape: false
    }]
};