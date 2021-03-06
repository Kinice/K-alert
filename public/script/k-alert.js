(function(window, $){

	var HTM = {
        ovl: '<div class="k-alert">'+'<div id="pop-mask"></div>' + '<div id="pop-container">' + '<div class="pop-main"></div>' + '<div class="pop-btn"></div>' + '</div>'+'</div>',
        alert: '<input type="button" class="alertBtn" value="OK">',
        confirm: '<input type="button" class="confirmTrue" value="OK">' + '<input type="button" class="confirmFalse" value="Cancel">'
    }

	function winPop(){
		var config = {};
		this.get = function(n){
			return config[n];
		};
		this.set = function(n, v){
			config[n] = v;
		}
		this.init();
	}

	winPop.prototype = {

		init: function(){
			this.createDom();
			this.bindEvent();
		},

		createDom :function(){
			var $body = $('body'),
				$ovl = $('#pop-container');

			if($ovl.length == 0){
				$body.append(HTM.ovl);
			}

			this.set('ovl', $('#pop-container'));
			this.set('mask', $('#pop-mask'));
		},

		bindEvent: function(){
			var that = this,
				$ovl = this.get('ovl'),
				$mask = this.get('mask');

			$ovl.on('click', '.alertBtn', function(e){
				that.hide();
			});

			$ovl.on('click', '.confirmTrue', function(e){
				var cb = that.get('confirmBack');

				that.hide();

				cb && cb(true);
			});

			$ovl.on('click', '.confirmFalse', function(e){
				var cb = that.get('confirmBack');

				that.hide();

				cb && cb(false);
			});
		},

		kalert: function(str, btnstr){
			var str = typeof str === 'string' ? str : str.toString(),
				$ovl = this.get('ovl');

			this.set('type','alert');

			$ovl.find('.pop-main').html(str);

			if(typeof btnstr == 'undefined'){
				$ovl.find('.pop-btn').html(HTM.alert);
			}else{
				$ovl.find('.pop-btn').html('<input type="button" class="alertBtn" value="'+btnstr+'">');
			}

			this.show();
		},

		kconfirm: function(str, callback){
			var str = typeof str === 'string' ? str : str.toString(),
				$ovl = this.get('ovl');

			this.set('type','confirm');

			$ovl.find('.pop-main').html(str);
			$ovl.find('.pop-btn').html(HTM.confirm);

			console.log(callback)

			this.set('confirmBack', (callback || function(){}));
			this.show();
		},

		show: function(){
			this.get('ovl').fadeIn();
			this.get('mask').fadeIn();
		},

		hide: function(){
			var $ovl = this.get('ovl');
			
			$ovl.fadeOut();
			this.get('mask').fadeOut(function(){
				$ovl.find('.pop-main').html('');
				$ovl.find('.pop-btn').html('');
			});
		},

		destory: function(){
			this.get('ovl').remove();
			this.get('mask').remove();
		}
	};

	var obj = new winPop();

	window.kalert = function(str,btnstr){
		obj.kalert.call(obj, str,btnstr);
	}

	window.kconfirm = function(str,callback){
		console.log(callback);
		obj.kconfirm.call(obj, str, callback);
	}
})(window, $);