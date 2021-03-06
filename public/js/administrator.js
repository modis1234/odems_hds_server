define([
	"jquery",
	"underscore",
	"backbone",
	"w2ui",
	"text!views/admin",
	"text!views/monitor",
	"css!cs/stylesheets/administrator.css"
], function (
	$,
	_,
	Backbone,
	w2ui,
	admin,
	monitor
) {
	
	var DeviceModel = Backbone.Model.extend({
        url: '/device/devices',
        parse: function(result){
            return result;
        }
	});

	var UpsModel = Backbone.Model.extend({
        url: '/ups/list',
        parse: function(result){
            return result;
        }
	});

	return Backbone.View.extend({
		el: '.wrapper',
		adminView: undefined,
		adminTarget: undefined,
		w2uiConfig: {
			sidebar: {
				name: 'menu',
				img:null,
				nodes: [
					{ id: 'setting', text: '관리자 설정', img: 'icon-folder', expanded: true, group: true, groupShowHide: false, collapsible:false,
							nodes: [ { id: 'manager', text: '담당자 등록', icon: 'fas fa-desktop' },
									 { id: 'receiver', text: '알림 수신자 등록', icon: 'fas fa-bell' },
								   ]
					},
					{ id: 'lookUp', text: '검색 | 통계', img: 'icon-folder', expanded: true, group: true, groupShowHide: false, collapsible:false,
							nodes: [ 
								{ id: 'upsError', text: 'UPS이력 검색', icon: 'fas fa-plug' }
								// { id: 'netError', text: '장애이력 검색', icon: 'fas fa-file-alt' },
								   ]
					},
				],
				onClick: function(event) {
					window.main.view.pageRoad(event.target);
				}
			}, // end sidebar
		},
		initialize: function () {
			console.log('admin.js');
			this.$el.html(admin);
			this.render();			

			this.deviceModel = new DeviceModel();
			this.listenTo(this.deviceModel, "sync", this.getDeviceModel);
			this.deviceModel.fetch();
			
			this.upsModel = new UpsModel();
			this.listenTo(this.upsModel, "sync", this.getUpsModel);
            this.upsModel.fetch();
		},
		getDeviceModel: function(model){
			var data = model.toJSON();

			var _deviceList = Object.keys(data).map(function(i) {
					var _id = data[i].device_id;
					var _text = data[i].device_name;
					var _value = data[i].device_id;
					var obj = {};
					obj.id =_id;
					obj.text = _text;
					obj.value = _value;

					return obj;
			});

			var allObj = { text: '전체', id: 0};
			_deviceList.unshift(allObj);
			this.deviceList = _deviceList;
			
		},
		getUpsModel: function(model, response){
			var date = model.toJSON();
			//console.log(response);

			var upsList =[];
			var allObj = { text: '전체', id: 0};

			upsList.push(allObj);
			var result = response;
			for( i in result){
				var _id = result[i]['id'];
				var _text = result[i]['location'];
				var _value = result[i]['device_idx'];
				var obj ={};
				obj.id = _id;
				obj.text = _text;
				obj.value = _value;			
				upsList.push(obj);
			}
			this.upsList = upsList;
			this.upsData = response;
			console.log(this.upsList);
		},
		events: {
			"click .fa-times": "closePopup"
		},
		render: function () {
			var _this = this;
			$('#munu-bottom').w2sidebar(_this.w2uiConfig['sidebar']);
		
			$( window ).resize( function() {
				var winHeight = window.innerHeight;
				var winWidth = window.innerWidth;
				if( winHeight < 969 ){
					$('body').css('overflow','auto');
				} else {
					$('body').css('overflow','hidden');
				}
			});

			_this.utilsCustom();
		},
		pageRoad: function(target) {
			var _this = this;
			var _target = target;
			if( _this.adminTarget == _target ){
				return false;
			} else {
				_this.adminTarget = _target;
				var adminView = this.adminView;
				if (adminView) adminView.destroy();
				var url = _target;
				requirejs([
					'js/admin/' + url
				], function(Admin){
					var adminView = new Admin();
					_this.adminView = adminView;
					
				});
			}
		},
		utilsCustom: function() {
			var _shortMonths = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
			var _fullmonths = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
			var _shortDays = ['월', '화', '수', '목', '금', '토', '일'];
			var _fulldays = ['월', '화', '수', '목', '금', '토', '일'];

			window.w2utils.settings.shortmonths = _shortMonths;
			window.w2utils.settings.fullmonths = _fullmonths;
			window.w2utils.settings.shortdays = _shortDays;
			window.w2utils.settings.fulldays = _fulldays;

		},
		destroy: function () {
			var _this = this;
			var sidebarName = _this.w2uiConfig.sidebar['name'];
			if (window.w2ui.hasOwnProperty('menu')) {
				window.w2ui['menu'].destroy()
			}
			this.undelegateEvents();
		},
	});
});