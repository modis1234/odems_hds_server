define([
	"jquery",
	"underscore",
	"backbone",
	"text!views/header",
	"text!views/adheader",
	"text!views/popup",
	"text!views/monitor",
	"css!cs/stylesheets/main.css",
	"css!cs/stylesheets/css/layout.css",
	"css!cs/stylesheets/css/common.css",
	"css!cs/stylesheets/css/component.css",
	"css!cs/stylesheets/css/animate.css",
	"css!cs/stylesheets/css/all.css",
	"css!cs/stylesheets/css/interaction.css"
	
], function (
	$,
	_,
	Backbone,
	header,
	adHeader,
	popup,
	monitor
) {
	return Backbone.View.extend({
		el: 'body',
		view: undefined,
		company: undefined,
		companyCombo: undefined,
		site: undefined,
		siteCombo: undefined,
		device: undefined,
		deviceCombo: undefined,
		target: undefined,
		selectNode: undefined,
		fullscreenYN:false,
		initialize: function () {
			this.$el.find("header").html(header);
			this.$el.find(".wrapper").html(monitor);
			this.$el.append(popup);
			this.monitorRender();
			
			var _value = this.$el.find('.headerBtn').attr('value');
			if(_value == 1){
				this.$el.find('.headerBtn').find(".admin-box").css("display", "none");
			}
			
			//this.adminRender();
		},
		events: {
			"click .w2ui-node-sub": "setMain",
			"click #logout-btn": "logout",
			"click #newPassword": "newPassword",
			"click .logo": "menuToggle",
			"click .devcie-toggle-box" : "mapIconToggle",
			"click .upsLocate-toggle-box" : "mapLocateToggle",
			"click #login-btn": "login",
			"click #fs_confirm":"fsEvent",
			"click #fs_cancle":"dsEvent",
			"click .admin-box":"adminRender",
			"click #dashboard-btn": "monitorRender",

		},
		monitorRender: function(){
			var _this = this;
			//_this.fsEvent();
			_this.$el.find('header').removeAttr('id');
			_this.$el.find('.wrapper').removeAttr('id');
			_this.$el.find('.fs_checkPop').css("display","block");
			var view = this.view;
			console.log(".>>>>",this.fullscreenYN)

			if (view) view.destroy();
			var url = 'monitor';
			var _title = $(url).text();
			requirejs([
				'js/' + url
			], function(View){
				//_this.$el.find('.bottom-component').empty();
				var view = new View();
				_this.view = view;


			});
		},
		adminRender: function(evt){
			var _this = this;
			_this.dsEvent();
			console.log(evt);
			_this.$el.find('header').html(adHeader);
			_this.$el.find('header').attr('id','admin-header');
			_this.$el.find('.wrapper').attr('id','admin-wrapper');

			var view = this.view;
			console.log(".>>>>",view)

			if (view) view.destroy();
			var url = 'administrator';
			var _title = $(url).text();
			requirejs([
				'js/' + url
			], function(View){
				//_this.$el.find('.bottom-component').empty();
				var view = new View();
				_this.view = view;
				// _this.$el.find('.wrapper').empty();
				// _this.$el.find('header').empty();
				
			});

		},
		logout: function (evt) {
			var _this = this;
			location.replace('/logout');
		},
		newPassword: function () {
			$(".content-box").remove();
			$('.content-wrapper').load("/admin/newpassword")
			$(".menu-box.active").removeClass("active");
		},
		mapIconToggle: function(evt){
			var hasClz = $('.mapIcon.dnomal').hasClass('devShow');
			if(hasClz){
				$('.mapIcon.dnomal').removeClass('devShow');
				$('.devcie-toggle-box').removeClass('active');
			} else {
				$('.mapIcon.dnomal').addClass('devShow');
				$('.devcie-toggle-box').addClass('active');
			}
		},
		mapLocateToggle: function(evt) {
			var hasClz = $('.pop-nomal').hasClass('show');
			if(hasClz){
				$('.pop-nomal').removeClass('show');
				$('.upsLocate-toggle-box').removeClass('active');

			} else {
				$('.pop-nomal').addClass('show');
				$('.upsLocate-toggle-box').addClass('active');

			} 
		},
		fullscreen: function (elem) {
			if (elem.requestFullscreen) {
				elem.requestFullscreen();
			  } else if (elem.mozRequestFullScreen) { /* Firefox */
				elem.mozRequestFullScreen();
			  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
				elem.webkitRequestFullscreen();
			  } else if (elem.msRequestFullscreen) { /* IE/Edge */
				elem.msRequestFullscreen();
			  }
				
		},
		closeFullscreen: function(){
	    	var elem = document.documentElement;
	    	  if (document.mozCancelFullScreen) {
    		    document.mozCancelFullScreen();
    		  } else if (document.webkitExitFullscreen) {
    		    document.webkitExitFullscreen();
    		  } else if (document.msExitFullscreen) {
    		    window.top.document.msExitFullscreen();
    		  }
       },
	   fsEvent: function(){
		   var _this = this;
		   var _fullscreenYN = _this.fullscreenYN;
		   var element = document.fullscreenElement
		   var elem = document.documentElement;

		   this.fullscreen(elem);
		   this.fullscreenYN = true;
		   _this.$el.find('.fs_checkPop').css("display","none");
	   },
	   dsEvent: function() {
		   	var _this = this;

			this.closeFullscreen();
			this.fullscreenYN = false;
			_this.$el.find('.fs_checkPop').css("display","none");

		},
	});
});