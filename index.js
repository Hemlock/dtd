var DTD = (function() {
	function randomChars() {
		var i = Math.floor(Math.random() * 10);
		var chars = [];
		while (i--) {
			chars.push('&#' + (Math.floor(Math.random() * 26) + 97) + ';');
		}
		return chars.join('');
	}
	
	function characterArray(array) {
		var html = [];
		for (var i=0, c; c=array[i]; i++) {
			html.push('<span class="e">&#' + c + ';</span><span class="d">' + randomChars() + '</span>');		
		}
		return html.join('');
	}
	
	return {
		index: 0,
		address: [100, 111, 117, 103, 64, 100, 111, 117, 103, 116, 97, 121, 108, 111, 114, 100, 101, 99, 111, 114, 97, 116, 105, 110, 103, 46, 99, 111, 109],
		phone: [54, 49, 54, 46, 54, 51, 52, 46, 50, 49, 54, 49],
		images: [
            "6827737202_770cb00307_b.jpg",
            "6827748384_e782f1e094_b.jpg",
            "6827749728_28d4e0c9db_b.jpg",
            "6827751832_255db79cbe_b.jpg",
            "6973851597_58b29689df_b.jpg",
            "IMG_0830.JPG",
            "IMG_0831.JPG",
            "IMG_0832.JPG",
            "IMG_0835.JPG",
            "IMG_0836.JPG"
		],
		
		on: function(target, event, handler, scope) {
			var boundHandler = function() {
				handler.apply(scope, arguments);
			};
			
			if (target.addEventListener) {
				target.addEventListener(event, boundHandler, false);
			} else if (target.attachEvent) {
				target.attachEvent('on' + event, boundHandler);
			}
		},
		
		init: function() {
            DTD.shuffle();
			DTD.setupContacts();
			DTD.renderImages();
			DTD.setupAnimations();
		},

        shuffle: function() {
            var images = this.images;
            var i = images.length;
            while ( --i ) {
                var j = Math.floor( Math.random() * ( i + 1 ) );
                var temp = images[i];
                images[i] = images[j];
                images[j] = temp;
            }
        },
		
		setupContacts: function() {
			var container = document.getElementById('contact');
			var email = document.createElement('h2');
			email.innerHTML = 'Email: ' + characterArray(this.address);
			email.className = 'email';
			DTD.on(email, 'click', this.openEmail, this);
			container.appendChild(email);
			
			var phone = document.createElement('h2');
			phone.innerHTML = 'Phone: ' + characterArray(this.phone);
			phone.className = 'phone';
			container.appendChild(phone);
		},
		
		renderImages: function() {
			var container = document.getElementById('background');
			while(container.firstChild) {
				container.removeChild(container.firstChild);
			}
			
			container.appendChild(this.getImage(this.index-1));
			container.appendChild(this.getImage(this.index));
			container.appendChild(this.getImage(this.index+1));

			this.resize();
		},
		
		setupAnimations: function() {
			DTD.on(document.getElementById('left'), 'click', this.animateLeft, this);
			DTD.on(document.getElementById('right'), 'click', this.animateRight, this);
		},
		
		animateLeft: function() {
			this.animate(-1);
		},
		
		animateRight: function() {
			this.animate(1);
		},
		
		animate: function(direction) {
			if (!this.animating) {
				this.animating = true;
				var body = document.body;
				var width = body.offsetWidth;
				var target = -width * direction;
				var background = document.getElementById('background');
                var images = background.getElementsByTagName('img');
				this.tween = new TWEEN.Tween({ left: 0 })
					.to({ left: target }, 300)
					.easing(TWEEN.Easing.Exponential.InOut)
					.onUpdate(function() {
                        for (var i= 0,image; image = images[i]; i++){
                            image.style.left = (this.left + ((i-1) * width)) + 'px';
                        }
					})
					.onComplete(function() {
						DTD.animating = false;
						DTD.index = (DTD.index + direction + DTD.images.length) %DTD.images.length;						
						DTD.renderImages();
					})
					.start();

				this.animateStep();
			}
		},
		
		animateStep: function() {
			if (DTD.animating) {
				TWEEN.update();
				requestAnimationFrame(DTD.animateStep);
			}
		},
		
		getImage: function(index) {
			index = (index + this.images.length) % this.images.length;
			var image = this.images[index];
			if (typeof image == 'string') {
				var src = 'images/' + image;
				image = this.images[index] = new Image();
				image.src = src;
                DTD.on(image, 'load', this.resize, this);
			}
			return image;
		},

		openEmail: function() {
			var str = '';
			for (var i = 0, chr; chr = DTD.address[i]; i++) {
				str += String.fromCharCode(chr);
			}

			location.href = 'mailto: ' + str;
		},
		
		resize: function() {
			var body = document.body;
			var height = body.offsetHeight;
			var width = body.offsetWidth;	
			var background = document.getElementById('background');
			var images = background.childNodes;

			var i = images.length;
			while (i--) {
				var image = images[i];
				var style = image.style;
				style.height = '';
				style.width = '';
				
				if (height/width >= image.offsetHeight/image.offsetWidth) {
					style.height = height + 'px';
				} else {
					style.width = width + 'px';
				}
				
				style.left = ((i-1) * width) + 'px';
			}	
		}
		
	};
})();

DTD.on(window, 'load', DTD.init, DTD);
DTD.on(window, 'resize', DTD.resize, DTD);
