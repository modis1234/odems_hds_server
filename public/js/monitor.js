define([
	"jquery",
	"underscore",
	"backbone",
	"circleprogress",
	"text!views/monitor",
	"text!views/header",
	// "css!cs/stylesheets/css/layout.css",
	// "css!cs/stylesheets/css/common.css",
	// "css!cs/stylesheets/main.css",
	// "css!cs/stylesheets/css/animate.css",
	// "css!cs/stylesheets/css/all.css",
	// "css!cs/stylesheets/css/component.css",
	// "css!cs/stylesheets/css/interaction.css"
], function (
	$,
	_,
	Backbone,
	circleprogress,
	monitor,
	header
) {
	var NetworkModel = Backbone.Model.extend({
		url: '/network/networks',
		parse: function (result) {
			return result;
		}
	});

	var UpsModel = Backbone.Model.extend({
		url: '/ups/list',
		parse: function (result) {
			return result;
		}
	});


	var UpsDeviceModel = Backbone.Model.extend({
		url: '/ups/device',
		parse: function (result) {
			return result;
		}
	});

	var ManagerModel = Backbone.Model.extend({
		url: '/manager/managers',
		parse: function (result) {
			return result;
		}
	});

	return Backbone.View.extend({
		el: '.wrapper',
		selectedRow: undefined,
		upsList: undefined,
		initialize: function () {
			this.$el.html(monitor);
			this.$el.closest('body').find('header').html(header);

			this.upsModel = new UpsModel();
			this.listenTo(this.upsModel, "sync", this.getUpsList);
			this.upsModel.fetch();


		},
		events: {
			"click #btn": "imgTest",
			"click .fa-search": "imageShow",
			"click .fa-times": "closePopup"
		},
		imageShow: function (event) {
			var target = event.currentTarget;
			var targetPopup =  $(target).closest('.popBox');
			var imgPopTitle = targetPopup.find('.popTit').find('.popText').text();
			var imageFile = $(target).attr('value');
			var imagePath = 'http://119.207.78.144:9091/upload/read/'+imageFile; 
			//var imagePath = 'http://127.0.0.1:9091/upload/read/'+imageFile; 

			this.$el.find(".photoPOP").css('display','block');
			this.$el.find(".photoPOP").find('.tit').find('span').text(imgPopTitle);
			this.$el.find(".photoPOP").find('.imgBox').find("img").attr('src',imagePath);

		},
		closePopup: function(){
			this.$el.find(".photoPOP").css('display','none');
		},
		getNetworkList: function (model) {
			var _this = this;
			var data = model.toJSON();
			var _networkList = Object.keys(data).map(function (i) {
				var _upsId = data[i]["ups_id"] || null;

				if (_upsId) {
					var _networkId = data[i]["id"];
					var _deviceId = data[i]["device_id"];
					var $target = $("#ups-panel-" + _upsId).find(".devList");
					var $mapTarget = $('.upsArea-' + _upsId);
					if (_deviceId === 1) {
						// ups 영역
						var leng = $target.find('.cctv-state').length;
						if (leng === 1) {
							$target.find('.cctv-state').attr("id", "cctv-" + _networkId);
							$target.find('.cctv-state').attr("device-type", _deviceId);
						} else {
							var hasId = $($target.find('.cctv-state')[0]).attr("id");
							$($target.find('.cctv-state')[0]).attr("id", "cctv-" + _networkId);
							$($target.find('.cctv-state')[0]).attr("device-type", _deviceId);
							if (!hasId) {
								$($target.find('.cctv-state')[1]).attr("id", "cctv-" + _networkId);
								$($target.find('.cctv-state')[1]).attr("device-type", _deviceId);
							}
						}
					}
					else if (_deviceId === 2) {
						var leng = $target.find('.scanner-state').length;
						if (leng === 1) {
							$target.find('.scanner-state').attr("id", "scanner-" + _networkId);
						} else {
							var hasId = $($target.find('.scanner-state')[0]).attr("id");
							$($target.find('.scanner-state')[0]).attr("id", "scanner-" + _networkId);
							if (!hasId) {
								$($target.find('.scanner-state')[1]).attr("id", "scanner-" + _networkId);
							}
						}
					}
					else if (_deviceId === 3) {
						var leng = $target.find('.ups-state').length;
						if (leng === 1) {
							$target.find('.ups-state').attr("id", "ups-" + _networkId);
						} else {
							var hasId = $($target.find('.ups-state')[0]).attr("id");
							$($target.find('.ups-state')[0]).attr("id", "ups-" + _networkId);
							if (!hasId) {
								$($target.find('.ups-state')[1]).attr("id", "ups-" + _networkId);
							}
						}
					}
					else if (_deviceId === 4) {
						var leng = $target.find('.server-state').length;
						if (leng === 1) {
							$target.find('.server-state').attr("id", "server-" + _networkId);
						} else {
							var hasId = $($target.find('.server-state')[0]).attr("id");
							$($target.find('.server-state')[0]).attr("id", "server-" + _networkId);
							if (!hasId) {
								$($target.find('.server-state')[1]).attr("id", "server-" + _networkId);
							}
						}

					}
					else if (_deviceId === 5) {
						var leng = $target.find('.wifi-state').length;
						if (leng === 1) {
							$target.find('.wifi-state').attr("id", "wifi-" + _networkId);
						} else {
							var hasId = $($target.find('.wifi-state')[0]).attr("id");
							$($target.find('.wifi-state')[0]).attr("id", "wifi-" + _networkId);
							if (!hasId) {
								$($target.find('.wifi-state')[1]).attr("id", "wifi-" + _networkId);
							}
						}
					}
					else if (_deviceId === 6) {
						var leng = $target.find('.repeater-state').length;
						if (leng === 1) {
							$target.find('.repeater-state').attr("id", "repeater-" + _networkId);
						} else {
							var hasId = $($target.find('.repeater-state')[0]).attr("id");
							$($target.find('.repeater-state')[0]).attr("id", "repeater-" + _networkId);
							if (!hasId) {
								$($target.find('.repeater-state')[1]).attr("id", "repeater-" + _networkId);
							}
						}
					}
					else if (_deviceId === 7) {
						$target.find('.gas-state').attr("id", "gas-status");
					}
					else if (_deviceId === 8) {
						$target.find('.phpoc-state').attr("id", "phpoc-" + _networkId);
						var leng = $target.find('.phpoc-state').length;
						if (leng === 1) {
							$target.find('.phpoc-state').attr("id", "phpoc-" + _networkId);
						} else {
							var hasId = $($target.find('.phpoc-state')[0]).attr("id");
							$($target.find('.phpoc-state')[0]).attr("id", "phpoc-" + _networkId);
							if (!hasId) {
								$($target.find('.phpoc-state')[1]).attr("id", "phpoc-" + _networkId);
							}
						}
					}

				}

				return data[i];
			});
			_this.upsDeviceRead(); // 여기서 setInterval
			this.interval = setInterval(_this.upsDeviceRead, 5000);
			window.logData = _this.logData;
			this.timeout = setTimeout(_this.logData, 6000);
			console.log(this);
			//setTimeout(_this.setLogData, 6000);

		},
		getUpsList: function (model) {
			var _this = this;
			var data = model.toJSON();
			_this.render(data);
			this.networkModel = new NetworkModel();
			this.listenTo(this.networkModel, "sync", this.getNetworkList);
			this.networkModel.fetch();
		},
		render: function (data) {
			var _this = this;

			_this.upsList = {};
			var _upsList = Object.keys(data).map(function (i) {
				// ups 영역 렌더링
				_this.$el.find(".panel-list-" + i).attr("id", "ups-panel-" + data[i].id);
				_this.$el.find(".panel-list-" + i).find(".Plocation-name").text(data[i].location);

				// map 영역 렌더링
				var j = parseInt(i) + 1;
				// upspoint id 할당
				_this.$el.find('.mapArea').find(".ups_" + j).attr("id", "upsPoint-" + data[i].id);
				// popup id 할당
				_this.$el.find('.mapArea').find('.pop_' + j).attr('id', 'popup-panel-' + data[i].id);
				_this.$el.find('.mapArea').find('.pop_' + j).find('.popTit').find('.popText').text(j+". "+data[i].location);
				_this.$el.find('.mapArea').find('.pop_' + j).find('.fa-search').attr('value', data[i].image_path);
				//network upsPoint id 할당
				_this.$el.find('#netBox').find('.ups_' + j).attr('id', 'upsPosition-' + data[i].id);;


				var _devArea = _this.$el.find('.devArea-' + j);
				for (let index = 0; index < _devArea.length; index++) {
					_this.$el.find('.devArea-' + j).addClass("upsArea-" + data[i].id);
				}
				data[i].deviceList = [];
				_this.upsList[data[i].id] = data[i];

				return data[i];
			});
			window.upsList = _this.upsList;

			this.managerModel = new ManagerModel();
			this.listenTo(this.managerModel, "sync", this.getManagerList);
			this.managerModel.fetch();

		},
		getManagerList: function (model) {
			var _this = this;
			var data = model.toJSON();
			var _managerList = Object.keys(data).map(function (i) {
				var _upsId = data[i]['ups_id'];

				var _level = data[i]['level'];
				var _name = data[i]['name'];
				var _tel = data[i]['tel'];

				//$target.append(data[i]);
				var $target = $('#popup-panel-' + _upsId);
				var _text = '';
				if (_level === 0) {
					_text = '담당자(정) : ' + _name + ' ' + _tel;
					$target.find('.main').text(_text);
				}
				else if (_level === 1) {
					_text = '담당자(부) : ' + _name + ' ' + _tel;
					$target.find('.sub').text(_text);
				}

				return data[i];
			});

		},
		upsDeviceRead: function () {
			var _this = this;
			var model = new UpsDeviceModel();
			model.fetch({
				success: function (model, response) {
					var data = model.toJSON()
					var gasList = {};
					var upsDeviceList = Object.keys(data).map(function (i) {
						var _id = data[i]['id'];
						var hasProp = window.upsList.hasOwnProperty(_id);
						if (hasProp) {
							window.upsList[_id]["error_type"] = data[i]['error_type'];
							window.upsList[_id]["use_time"] = data[i]["use_time"];
							window.upsList[_id]["battery_remain"] = data[i]["battery_remain"];
							//window.upsList[_id]["deviceList"].push(data[i]);
							var upsId = data[i]['ups_id'];
							var deviceId = data[i]['device_id'];
							var networkId = data[i]['network_id'];
							var result = data[i]['result'];
							var $target = $('#ups-panel-' + upsId).find('.devList');


							if (deviceId === 1) {
								if (result === 'open') {
									$target.find('#cctv-' + networkId).removeClass('demer');
									$target.find('#cctv-' + networkId).addClass('dnomal');

									$(".mapArea").find('#cctv_icon-' + networkId).removeClass('demer');
									$(".mapArea").find('#cctv_icon-' + networkId).addClass('dnomal');
									
									$(".mapArea").find('#cctv_icon-' + networkId).removeClass('iconVisible');
																		
									$("#netBox").find('#cctv_net-' + networkId).removeClass('demer');
									$("#netBox").find('#cctv_net-' + networkId).addClass('dnomal');
									
								}
								else if (result === 'closed') {
									$target.find('#cctv-' + networkId).removeClass('dnomal');
									$target.find('#cctv-' + networkId).addClass('demer');
									
									
									$(".mapArea").find('#cctv_icon-' + networkId).removeClass('dnomal');
									$(".mapArea").find('#cctv_icon-' + networkId).addClass('demer');
									
									var devShowClz = $(".mapArea").find('#cctv_icon-' + networkId).hasClass('devShow');
									if(devShowClz){
										$(".mapArea").find('#cctv_icon-' + networkId).removeClass('devShow');
									}

									$("#netBox").find('#cctv_net-' + networkId).removeClass('dnomal');
									$("#netBox").find('#cctv_net-' + networkId).addClass('demer');


								}
							}
							else if (deviceId === 2) {
								if (result === 'open') {
									$target.find('#scanner-' + networkId).removeClass('demer');
									$target.find('#scanner-' + networkId).addClass('dnomal');
									$target.find('#scanner-' + networkId).html('<img src="./images/scanner_nomal.png">스캐너');

									$(".mapArea").find('#scanner_icon-' + networkId).removeClass('demer');
									$(".mapArea").find('#scanner_icon-' + networkId).addClass('dnomal');
									$(".mapArea").find('#scanner_icon-' + networkId).html('<img src="./images/scanner_nomal.png">');

									
									$("#netBox").find('#scanner_net-' + networkId).removeClass('demer');
									$("#netBox").find('#scanner_net-' + networkId).addClass('dnomal');
									$("#netBox").find('#scanner_net-' + networkId).html('<img src="./images/scanner_nomal.png">');
									
									
									
								}
								else if (result === 'closed') {
									$target.find('#scanner-' + networkId).removeClass('dnomal');
									$target.find('#scanner-' + networkId).addClass('demer');
									$target.find('#scanner-' + networkId).html('<img src="./images/scanner_emer.png">스캐너');
									
									$(".mapArea").find('#scanner_icon-' + networkId).removeClass('dnomal');
									$(".mapArea").find('#scanner_icon-' + networkId).addClass('demer');
									$(".mapArea").find('#scanner_icon-' + networkId).html('<img src="./images/scanner_emer.png">');
									
									var devShowClz = $(".mapArea").find('#scanner_net-' + networkId).hasClass('devShow');
									if(devShowClz){
										$(".mapArea").find('#scanner_net-' + networkId).removeClass('devShow');

									}

									$("#netBox").find('#scanner_net-' + networkId).removeClass('dnomal');
									$("#netBox").find('#scanner_net-' + networkId).addClass('demer');
									$("#netBox").find('#scanner_net-' + networkId).html('<img src="./images/scanner_emer.png">');


								}
							}
							else if (deviceId === 3) {
								if (result === 'open') {
									$target.find('#ups-' + networkId).removeClass('demer');
									$target.find('#ups-' + networkId).addClass('dnomal');

									$(".mapArea").find('#ups_icon-' + networkId).removeClass('demer');
									$(".mapArea").find('#ups_icon-' + networkId).addClass('dnomal');

									$("#netBox").find('#ups_net-' + networkId).removeClass('demer');
									$("#netBox").find('#ups_net-' + networkId).addClass('dnomal');



								}
								else if (result === 'closed') {
									$target.find('#ups-' + networkId).removeClass('dnomal');
									$target.find('#ups-' + networkId).addClass('demer');

									$(".mapArea").find('#ups_icon-' + networkId).removeClass('dnomal');
									$(".mapArea").find('#ups_icon-' + networkId).addClass('demer');
									
									var devShowClz = $(".mapArea").find('#ups_icon-' + networkId).hasClass('devShow');
									if(devShowClz){
										$(".mapArea").find('#ups_icon-' + networkId).removeClass('devShow');
									}

									$("#netBox").find('#ups_net-' + networkId).removeClass('dnomal');
									$("#netBox").find('#ups_net-' + networkId).addClass('demer');


									



								}
							}
							else if (deviceId === 4) {
								if (result === 'open') {
									$target.find('#server-' + networkId).removeClass('demer');
									$target.find('#server-' + networkId).addClass('dnomal');

									$(".mapArea").find('#server_icon-' + networkId).removeClass('demer');
									$(".mapArea").find('#server_icon-' + networkId).addClass('dnomal');

									$("#netBox").find('#server_net-' + networkId).removeClass('demer');
									$("#netBox").find('#server_net-' + networkId).addClass('dnomal');
								}
								else if (result === 'closed') {
									$target.find('#server-' + networkId).removeClass('dnomal');
									$target.find('#server-' + networkId).addClass('demer');

									$(".mapArea").find('#server_icon-' + networkId).removeClass('dnomal');
									$(".mapArea").find('#server_icon-' + networkId).addClass('demer');

									var devShowClz = $(".mapArea").find('#server_icon-' + networkId).hasClass('devShow');
									if(devShowClz){
										$(".mapArea").find('#server_icon-' + networkId).removeClass('devShow');
									}

									$("#netBox").find('#server_net-' + networkId).removeClass('dnomal');
									$("#netBox").find('#server_net-' + networkId).addClass('demer');
								}
							}
							else if (deviceId === 5) {
								if (result === 'open') {
									$target.find('#wifi-' + networkId).removeClass('demer');
									$target.find('#wifi-' + networkId).addClass('dnomal');

									$(".mapArea").find('#wifi_icon-' + networkId).removeClass('demer');
									$(".mapArea").find('#wifi_icon-' + networkId).addClass('dnomal');

									$("#netBox").find('#wifi_net-' + networkId).removeClass('demer');
									$("#netBox").find('#wifi_net-' + networkId).addClass('dnomal');

								}
								else if (result === 'closed') {
									$target.find('#wifi-' + networkId).removeClass('dnomal');
									$target.find('#wifi-' + networkId).addClass('demer');

									$(".mapArea").find('#wifi_icon-' + networkId).removeClass('dnomal');
									$(".mapArea").find('#wifi_icon-' + networkId).addClass('demer');

									var devShowClz = $(".mapArea").find('#wifi_icon-' + networkId).hasClass('devShow');
									if(devShowClz){
										$(".mapArea").find('#wifi_icon-' + networkId).removeClass('devShow');
									}

									$("#netBox").find('#wifi_net-' + networkId).removeClass('dnomal');
									$("#netBox").find('#wifi_net-' + networkId).addClass('demer');

								}
							}
							else if (deviceId === 6) {
								if (result === 'open') {
									$target.find('#repeater-' + networkId).removeClass('demer');
									$target.find('#repeater-' + networkId).addClass('dnomal');

									$(".mapArea").find('#repeater_icon-' + networkId).removeClass('demer');
									$(".mapArea").find('#repeater_icon-' + networkId).addClass('dnomal');

									$("#netBox").find('#repeater_net-' + networkId).removeClass('demer');
									$("#netBox").find('#repeater_net-' + networkId).addClass('dnomal');
								}
								else if (result === 'closed') {
									$target.find('#repeater-' + networkId).removeClass('dnomal');
									$target.find('#repeater-' + networkId).addClass('demer');

									$(".mapArea").find('#repeater_icon-' + networkId).removeClass('dnomal');
									$(".mapArea").find('#repeater_icon-' + networkId).addClass('demer');

									var devShowClz = $(".mapArea").find('#repeater_icon-' + networkId).hasClass('devShow');
									if(devShowClz){
										$(".mapArea").find('#repeater_icon-' + networkId).removeClass('devShow');
									}

									$("#netBox").find('#repeater_net-' + networkId).removeClass('dnomal');
									$("#netBox").find('#repeater_net-' + networkId).addClass('demer');

								}
							}
							else if (deviceId === 7) {
								var hasProp = gasList.hasOwnProperty(upsId);
								if (!hasProp) {
									gasList[upsId] = [];
								}
								gasList[upsId].push(result);

								var gasLeng = gasList[upsId].length;
								if (gasLeng === 4) {
									var _index = gasList[upsId].indexOf('closed');
									if (_index === -1) {
										$target.find('#gas-status').removeClass('demer');
										$target.find('#gas-status').addClass('dnomal');

										$(".mapArea").find('.upsArea-' + upsId + '#gas-status').removeClass('demer');
										$(".mapArea").find('.upsArea-' + upsId + '#gas-status').addClass('dnomal');


									} else {
										$target.find('#gas-status').removeClass('dnomal');
										$target.find('#gas-status').addClass('demer');

										var devShowClz = $(".mapArea").find('.upsArea-' + upsId + '#gas-status').hasClass('devShow');
										if(devShowClz){
											$(".mapArea").find('.upsArea-' + upsId + '#gas-status').removeClass('devShow');
										}

										$(".mapArea").find('.upsArea-' + upsId + '#gas-status').removeClass('dnomal');
										$(".mapArea").find('.upsArea-' + upsId + '#gas-status').addClass('demer');

									}

								}
							}
							else if (deviceId === 8) {
								if (result === 'open') {
									$target.find('#phpoc-' + networkId).removeClass('demer');
									$target.find('#phpoc-' + networkId).addClass('dnomal');

									$("#netBox").find('#phpoc_net-' + networkId).removeClass('demer');
									$("#netBox").find('#phpoc_net-' + networkId).addClass('dnomal');
									
								}
								else if (result === 'closed') {
									$target.find('#phpoc-' + networkId).removeClass('dnomal');
									$target.find('#phpoc-' + networkId).addClass('demer');


									$("#netBox").find('#phpoc_net-' + networkId).removeClass('dnomal');
									$("#netBox").find('#phpoc_net-' + networkId).addClass('demer');
								}
							}
						} // end hasProp 유무
						return data[i];
					});
					window.main.view.upsBinding();

					window.upsDeviceList = [];
					window.upsDeviceList = upsDeviceList;
				},
				error: function (model, response) {

				},
			});
		},
		upsBinding: function () {
			var _this = this;
			var upsList = window.upsList;
			for (var key in upsList) {
				if (upsList.hasOwnProperty(key)) {
					var _id = upsList[key]["id"];
					var $upsTarget = $('#ups-panel-' + _id);
					var $popTarget = $('#popup-panel-' + _id);

					var errorType = upsList[key]["error_type"]; // 0:정상, 1: 정전, 2: 방전, 3:네트웍크 장애
					var upsHasNormalClz = $upsTarget.find(".line-condition").hasClass("nomal");
					var upsHasEmerClz = $upsTarget.find(".line-condition").hasClass("emer");

					var networkHasNormalClz = $upsTarget.find(".network-condition").hasClass("nomal");
					var networkHasEmerClz = $upsTarget.find(".network-condition").hasClass("emer");

					var _bottomNomalHTHML = '<img src="./images/1st.png"><img src="./images/1st.png"><img src="./images/1st.png">';
					var _bottomErrorHTHML = '<img src="./images/2nd.png"><img src="./images/2nd.png"><img src="./images/2nd.png">';

					var upsCanvasLeng = $upsTarget.find('.circle').find('canvas').length;
					var popCanvasLeng = $popTarget.find('.circle').find('canvas').length;

					var upsSpanLeng = $upsTarget.find(".line-condition").find('span').length;


					if (errorType !== 1) {
						// ups 영역
						if (upsCanvasLeng === 1) {
							$upsTarget.find('.circle').children().css('display', 'none');
							$upsTarget.find(".line-condition").removeClass("circle");
						}

						// 팝업 영역
						if (popCanvasLeng === 1) {
							$popTarget.find('.circle').children().css('display', 'none');
							$popTarget.find(".line-condition").removeClass("circle");
						}
						// // $upsTarget.find(".circle").empty();
					}
					else if (errorType === 1) {
						//ups 영역
						$upsTarget.find(".line-condition").removeClass("nomal");
						$upsTarget.find(".line-condition").removeClass("emer");
						$upsTarget.find(".line-condition").addClass("circle");
						// if(upsSpanLeng === 0){
						// 	$upsTarget.find(".line-condition").html("<span></span>");
						// }
						$upsTarget.find(".ac").empty();
						$upsTarget.find('.ups-state').find('.bottom').empty();

						// 팝업 영역
						$popTarget.find(".line-condition").removeClass("nomal");
						$popTarget.find(".line-condition").removeClass("emer");
						$popTarget.find(".line-condition").addClass("circle");
						// if(popCanvasLeng === 0){
						// 	$popTarget.find(".line-condition").html("<span></span>");
						// }
						$popTarget.find(".ac").empty();
						$popTarget.find('.ups-state').find('.bottom').empty();
					}

					/** upsPoint 상태표시 - errorType=0 이외의 값에는 class=Pemer 추가 **/
					if (errorType === 0) {
						$('#upsPoint-' + _id).removeClass('Pemer');
						$('#upsPosition-' + _id).removeClass('Pemer');


						$('#popup-panel-' + _id).removeClass('pop-emer');
						$('#popup-panel-' + _id).addClass('pop-nomal');


					} else {
						$('#upsPoint-' + _id).addClass('Pemer');
						$('#upsPosition-' + _id).addClass('Pemer');


						$('#popup-panel-' + _id).removeClass('pop-nomal');
						$('#popup-panel-' + _id).addClass('pop-emer');

						$('#popup-panel-' + _id + '.pop-emer').css('display', 'block');

						var hasShow = $('#popup-panel-' + _id).hasClass('show');
						if (hasShow) {
							$('#popup-panel-' + _id).removeClass('show');
						}
					}


					/** ups 상태 표시 **/
					// 전원 공급 정상
					if (errorType === 0) {

						// ups 영역
						// ups-state 영역 인터렉션
						if (!upsHasNormalClz && upsHasEmerClz) {
							$upsTarget.find(".line-condition").removeClass("emer");
							$upsTarget.find(".line-condition").addClass("nomal");
							$upsTarget.find('.ups-state').find('.bottom').html(_bottomNomalHTHML);

							$popTarget.find(".line-condition").removeClass("emer");
							$popTarget.find(".line-condition").addClass("nomal");
							$popTarget.find('.ups-state').find('.bottom').html(_bottomNomalHTHML);
						}
						else if (!upsHasNormalClz && !upsHasEmerClz) {
							$upsTarget.find(".line-condition").addClass("nomal");
							$upsTarget.find('.ups-state').find('.bottom').html(_bottomNomalHTHML);

							$popTarget.find(".line-condition").addClass("nomal");
							$popTarget.find('.ups-state').find('.bottom').html(_bottomNomalHTHML);
						}

						// network-state 영역 인터렉션
						if (!networkHasNormalClz && networkHasEmerClz) {
							// ups-state
							$upsTarget.find(".network-condition").removeClass("emer");
							$upsTarget.find(".network-condition").addClass("nomal");
							$upsTarget.find('.network-state').find('.bottom').html(_bottomNomalHTHML);

							$popTarget.find(".network-condition").removeClass("emer");
							$popTarget.find(".network-condition").addClass("nomal");
							$popTarget.find('.network-state').find('.bottom').html(_bottomNomalHTHML);


						}
						else if (!networkHasNormalClz && !networkHasEmerClz) {
							$upsTarget.find(".network-condition").addClass("nomal");
							$upsTarget.find('.network-state').find('.bottom').html(_bottomNomalHTHML);

							$popTarget.find(".network-condition").addClass("nomal");
							$popTarget.find('.network-state').find('.bottom').html(_bottomNomalHTHML);
						}
						var _html = '<i class="fas fa-plug"></i><br>'
							+ '<span>220 V</span>';

						$upsTarget.find(".ac").html(_html);
						$popTarget.find(".ac").html(_html);

						$('#popup-panel-' + _id + '.pop-nomal').css('display', 'none');
						var hasShow = $(".popBox").siblings().hasClass('show');
						if (hasShow) {
							$('#popup-panel-' + _id + '.pop-nomal').addClass('show');
						}


					}
					// 정전-전원 공급 장애(배터리 사용)
					else if (errorType === 1) {
						console.log('errorType-->',upsList[key]);
						// ups 영역 차트
						$upsTarget.find('.circle').children().css('display', 'block');
						var _batteryRemain = upsList[key]["battery_remain"];
						
						var $upsCircle = $upsTarget.find('.circle');
						var upsHasCanvas = $upsCircle.find('canvas').length;
						var _percentVal = _batteryRemain / 100;
						if (upsHasCanvas === 0) {
							//_this.chartFnc(_batteryRemain);
							$upsTarget.find(".circle").html("<span class='bettery-per'></span>");
							$upsTarget.find('.circle').children().css('display', 'block');
							$upsCircle.find('span').html('<i class="fas fa-car-battery"></i><br>' + _batteryRemain + '<i>%</i>');
							
							$upsCircle.circleProgress({
								value: _percentVal,
								startAngle: -Math.PI / 6 * 3,
								lineCap: 'round',
								fill: { color: '#22BD09' }
							}).on('circle-animation-progress', function (event, progress) {
								
							});
						}
						else if (upsHasCanvas >= 1) {
							$upsCircle.circleProgress('value', _percentVal);
							$upsCircle.find('span').html('<i class="fas fa-car-battery"></i><br>' + _batteryRemain + '<i>%</i>');

						}

						//popup 영역 차트
						$popTarget.find('.circle').children().css('display', 'block');
						var _batteryRemain = upsList[key]["battery_remain"];

						var $popCircle = $popTarget.find('.circle');
						var popHasCanvas = $popCircle.find('canvas').length;
						var _percentVal = _batteryRemain / 100;
						if (popHasCanvas === 0) {
							//_this.chartFnc(_batteryRemain);
							$popTarget.find(".line-condition").html("<span class='bettery-per'></span>");
							$popTarget.find('.circle').children().css('display', 'block');
							$popCircle.find('span').html('<i class="fas fa-car-battery"></i><br>' + _batteryRemain + '<i>%</i>');

							$popCircle.circleProgress({
								value: _percentVal,
								startAngle: -Math.PI / 6 * 3,
								lineCap: 'round',
								fill: { color: '#22BD09' }
							}).on('circle-animation-progress', function (event, progress) {

							});
						}
						else if (popHasCanvas >= 1) {
							$popCircle.circleProgress('value', _percentVal);
							$popCircle.find('span').html('<i class="fas fa-car-battery"></i><br>' + _batteryRemain + '<i>%</i>');

						}


						// 배터리 사용시간 적용
						/* sample */ 
						// var _useTime = String(1.26);
						var usedTime = upsList[key]["use_time"];
						if(usedTime){
							var _useTime = String(upsList[key]["use_time"]);
							var subTime = _useTime.split('.');
							var usedHour = subTime[0] * 60;
							var subMin = (subTime[1].length !== 1) ? subTime[1] : subTime[1] + "0";
							var usedMinute = Math.round(60 * (subMin / 100));
							var _time = usedHour + usedMinute;
							//$upsTarget.find('.bottom').text('29min');
							$upsTarget.find('.ups-state').find('.bottom').text(_time + 'min');
							$popTarget.find('.ups-state').find('.bottom').text(_time + 'min');
						} else {
							$upsTarget.find('.ups-state').find('.bottom').text('--min');
							$popTarget.find('.ups-state').find('.bottom').text('--min');
						}


						// network-state 영역 인터렉션
						if (!networkHasNormalClz && networkHasEmerClz) {
							$upsTarget.find(".network-condition").removeClass("emer");
							$upsTarget.find(".network-condition").addClass("nomal");
							$upsTarget.find('.network-state').find('.bottom').html(_bottomNomalHTHML);

							$popTarget.find(".network-condition").removeClass("emer");
							$popTarget.find(".network-condition").addClass("nomal");
							$popTarget.find('.network-state').find('.bottom').html(_bottomNomalHTHML);
						}
						else if (!networkHasNormalClz && !networkHasEmerClz) {
							$upsTarget.find(".network-condition").addClass("nomal");
							$upsTarget.find('.network-state').find('.bottom').html(_bottomNomalHTHML);

							$popTarget.find(".network-condition").addClass("nomal");
							$popTarget.find('.network-state').find('.bottom').html(_bottomNomalHTHML);
						}

					}
					// 방전, 네트워크 장애
					else if (errorType === 2) {
						// ups-state 영역								
						if (upsHasNormalClz && !upsHasEmerClz) {
							// ups 영역
							$upsTarget.find(".line-condition").removeClass("nomal");
							$upsTarget.find(".line-condition").addClass("emer");
							$upsTarget.find('.bottom').html(_bottomErrorHTHML);

							// pop 영역
							$popTarget.find(".line-condition").removeClass("nomal");
							$popTarget.find(".line-condition").addClass("emer");
							$popTarget.find('.bottom').html(_bottomErrorHTHML);

						}
						else if (!upsHasNormalClz && !upsHasEmerClz) {
							$upsTarget.find(".line-condition").addClass("emer");
							$upsTarget.find('.bottom').html(_bottomErrorHTHML);

							$popTarget.find(".line-condition").addClass("emer");
							$popTarget.find('.bottom').html(_bottomErrorHTHML);
						}

						// network-state 영역
						if (networkHasNormalClz && !networkHasEmerClz) {
							$upsTarget.find(".network-condition").removeClass("nomal");
							$upsTarget.find(".network-condition").addClass("emer");
							$upsTarget.find('.network-state').find('.bottom').html(_bottomErrorHTHML);

							$popTarget.find(".network-condition").removeClass("nomal");
							$popTarget.find(".network-condition").addClass("emer");
							$popTarget.find('.network-state').find('.bottom').html(_bottomErrorHTHML);
						}
						else if (!networkHasNormalClz && !networkHasEmerClz) {
							$upsTarget.find(".network-condition").addClass("emer");
							$upsTarget.find('.network-state').find('.bottom').html(_bottomErrorHTHML);

							$popTarget.find(".network-condition").addClass("emer");
							$popTarget.find('.network-state').find('.bottom').html(_bottomErrorHTHML);

						}

						var _html = '<i class="fas fa-car-battery"></i><br>'
							+ '<span>00 %</span>';

						$upsTarget.find(".ac").html(_html);
						$popTarget.find(".ac").html(_html);
					}
					// 네트워크 장애
					else if (errorType === 3) {
						// ups-state 영역																
						if (!upsHasNormalClz && upsHasEmerClz) {
							$upsTarget.find(".line-condition").removeClass("emer");
							$upsTarget.find(".line-condition").addClass("nomal");
							$upsTarget.find('.ups-state').find('.bottom').html(_bottomNomalHTHML);

							$popTarget.find(".line-condition").removeClass("emer");
							$popTarget.find(".line-condition").addClass("nomal");
							$popTarget.find('.ups-state').find('.bottom').html(_bottomNomalHTHML);
						}
						else if (!upsHasNormalClz && !upsHasEmerClz) {
							$upsTarget.find(".line-condition").addClass("nomal");
							$upsTarget.find('.ups-state').find('.bottom').html(_bottomNomalHTHML);

							$popTarget.find(".line-condition").addClass("nomal");
							$popTarget.find('.ups-state').find('.bottom').html(_bottomNomalHTHML);
						}

						// network-state 영역																
						if (networkHasNormalClz && !networkHasEmerClz) {
							$upsTarget.find(".network-condition").removeClass("nomal");
							$upsTarget.find(".network-condition").addClass("emer");
							$upsTarget.find('.network-state').find('.bottom').html(_bottomErrorHTHML);

							$popTarget.find(".network-condition").removeClass("nomal");
							$popTarget.find(".network-condition").addClass("emer");
							$popTarget.find('.network-state').find('.bottom').html(_bottomErrorHTHML);
						}
						else if (!networkHasNormalClz && !networkHasEmerClz) {
							$upsTarget.find(".network-condition").addClass("emer");
							$upsTarget.find('.network-state').find('.bottom').html(_bottomErrorHTHML);

							$popTarget.find(".network-condition").addClass("emer");
							$popTarget.find('.network-state').find('.bottom').html(_bottomErrorHTHML);

						}

						var _html = '<i class="fas fa-plug"></i><br>'
							+ '<span>220 V</span>';

						$upsTarget.find(".ac").html(_html);
						$popTarget.find(".ac").html(_html);
					}
				}
			}

		},
		logData: function () {
			var _this = this;
			var upsDeviceList = window.upsDeviceList;
			if (upsDeviceList) {
				var delaySec = 200;
				for (i in upsDeviceList) {
					(function (ii) {
						setTimeout(function () {
							var deviceId = upsDeviceList[ii].device_id;
							var _logListLeng = $('.logList').find('li').length;
							if (_logListLeng >= 50) {
								$('.logList').find('li:last').remove();
							}
							if (upsDeviceList[ii].result === 'open') {
								//$('.logList').prepend('<li>' + upsDeviceList[ii].device_name + '&nbsp;&nbsp;&nbsp;' + upsDeviceList[ii].ups_location + '&nbsp;&nbsp;&nbsp; -->&nbsp;&nbsp;&nbsp; 정상</li>');
								$('.logList').prepend('<li>NMS' + upsDeviceList[ii].device_idx + 'A' + upsDeviceList[ii].device_index + '&nbsp;&nbsp;&nbsp;'+upsDeviceList[ii].port+'</li>');

							}
							else if (upsDeviceList[ii].result === 'closed') {
								//$('.logList').prepend('<li style="color:#ff0000;">' + upsDeviceList[ii].device_name + '&nbsp;&nbsp;&nbsp;' + upsDeviceList[ii].ups_location + '&nbsp;&nbsp;&nbsp; -->&nbsp;&nbsp;&nbsp; 장애</li>');
								$('.logList').prepend('<li style="color:#ff0000;">NMS' + upsDeviceList[ii].device_idx + 'A' + upsDeviceList[ii].device_index + '&nbsp;&nbsp;&nbsp;'+upsDeviceList[ii].port+'</li>');

							}

							if (ii == (upsDeviceList.length - 1)) {
								this.logData();
							}
						}, ii * delaySec)
					})(i);
				}
			}
		},
		destroy: function () {

			clearInterval(this.interval);
			clearTimeout(this.timeout);
			this.undelegateEvents();
		},
	});
});