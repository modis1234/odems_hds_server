define([
    "text!views/neterr",
	"text!views/searchForm",
	"css!cs/stylesheets/adminPage.css"
], function (
    netError,
    searchForm
) {

    var ErrorModel = Backbone.Model.extend({
        url: '/network/error',
        parse: function(result){
            return result;
        }
    });

	return Backbone.View.extend({
        el: '.component-box',
        locationList: undefined,
        lookUpDate: undefined,
		config: {
			form: {
                name: 'netErrorForm',
                formHTML: searchForm,
                header: '검색',
                fields: [
                    { name: 'startDate', type: 'date', options:{ format: 'yyyy/mm/dd', end: $('input[name=endDate]'), keyboard: false, silent:false}},
                    { name: 'endDate', type: 'date', options:{ format: 'yyyy/mm/dd', end: $('input[name=startDate]'), keyboard: false, silent:false}},
                    { name: 'deviceList', type: 'list', options: { items: window.main.view.deviceList} },
                ],
                actions: {
                    'reset': function(){
                        var form = this;
                        form.clear();
                        window.main.view.adminView.initForm();
                        window.w2ui['netErrorGrid'].clear();
                        $('.w2ui-footer-left').text('');
                        window.w2ui['netErrorGrid'].off('refresh:after');

                    },
                    'save' : function(){
                        var form = window.w2ui['netErrorForm'];
                        var record = form.record;

                        var _tempStartDate = record['startDate'] ? record['startDate'] : $('input[name=startDate]').val();
                        var _startDate=_tempStartDate.replace(/\//g,'-');
                        
                        var _tempEndDate = record['endDate'] ? record['endDate'] : $('input[name=endDate]').val();
                        var toDate = new Date(_tempEndDate);
                        toDate.setDate(toDate.getDate()+1);
                        var toYear = toDate.getFullYear();
                        var toMonth = toDate.getMonth()+1 >= 10 ? toDate.getMonth()+1 : '0'+(toDate.getMonth()+1);
                        var toDay = toDate.getDate() >= 10 ? toDate.getDate() : '0'+toDate.getDate();
                        var _endDate = toYear+'-'+toMonth+'-'+toDay;
                        var deviceId = record['deviceList'] ? record['deviceList']['value'] : undefined;

                        var searchObj = {};
                        searchObj.startDate = _startDate;
                        searchObj.endDate = _endDate;
                        searchObj.deviceId = deviceId;

                        window.main.view.adminView.search(searchObj);

                        $('.w2ui-icon-collapse').trigger('click');
                        window.w2ui['netErrorGrid'].off('refresh:after');


                    }
                }, //end actions
                onAction : function(event){
                    var target = event.target;
                    //$('input[name=endDate]').w2tag();
                    //$('input[name=endDate]').removeClass('w2ui-error');
                   // window.main.view.adminView.initForm();
                    if( target === 'download'){
                        window.main.view.adminView.excelDownload();
                    }
                    else if( target === 'thisWeek'){
                        window.main.view.adminView.setThisWeek();

                    }
                    else if( target === 'thisMonth'){
                        window.main.view.adminView.setThisMonth();
                    }
                    else if( target === 'lastMonth'){
                        window.main.view.adminView.setLastMonth();
                    }
                },
                onChange:  function(event){
                    var target = event.target;
                    console.log(target);
                    if(target === 'deviceList'){
                        var deviceVal = $('input[name=deviceList]').val();
                    }
                    else if( target === 'startDate' || target === 'endDate' ){
                        window.main.view.adminView.dateCheck();       
                    }
                }             
            }, // end form
            grid: {
                name:'netErrorGrid',
                recid: "id",
                show: { footer: true },
                columnGroups: [
                    { caption: '디바이스 정보', span: 2 },
                    { caption: '네트워크', span: 3 }
                ],        
                columns: [                
                    { field: 'device_name', caption: '타입', size: '10%', attr: "align=right"},
                    { field: 'location', caption: '설치위치(상세설명)', size: '20%', attr: "align=left"},
                    { field: 'error_time', caption: '장애 발생', size: '15%', attr: "align=right" },
                    { field: 'restore_time', caption: '복구', size: '15%', attr: "align=right"},
                    { field: 'delay_time', caption: '장애 누적시간', size: '10%', attr: "align=right"}
                ],
                records: undefined
            } // end grid
		},
		initialize: function () {
			console.log('netError.js');
            this.$el.html(netError)
            this.render();
            this.location();

        },
        events: {
            "change input[name=endDate]": "dateCheck",
		},
        render: function (){
            var _this = this;
            var formOption = _this.config.form;
            _this.$el.find('#netError_form').w2form(formOption);
            var gridOption = _this.config.grid;
            console.log(gridOption)
            _this.$el.find('#netError_grid').w2grid(gridOption);

            
            _this.initForm();
        },
        location: function(){
            var _this = this;
        	var model = new ErrorModel();
        	model.url += "/location";
        	model.fetch({
        		success : function(model,response){
                    for( i in response ){
                        console.log(response[i]);
                        response[i]['w2ui']={};
                        response[i]['w2ui']['children']=[];
                    }
                    
                    _this.locationList = response;
        		},
        		error : function(model,response){
        			
        		},
        	});
        },
        setInitLocation: function(){
            var _this = this;
            var _locationList = _this.locationList;
            for( i in _locationList){
                _locationList[i]['w2ui']['children']=[];
            }
        },
        search: function(obj){
            var _this = this;
            _this.setInitLocation();
            var model = new ErrorModel();
            model.url += '/search';
            console.log(obj);
            model.set(obj);
            model.save({}, {
                success: function (model, response) {
                    var result = response;
                    var locationList = _this.locationList;
                    
                    for( i in result){
                        var errorTime = result[i]['error_time'];
                        var restoreTime = result[i]['restore_time'];

                    //     var fromDate = new Date(errorTime);
                    //     var toDate = restoreTime ? new Date(restoreTime) : new Date();
                    //     periodTime = toDate.getTime()-fromDate.getTime();
                    //     pDay = periodTime / (60*60*24*1000); 
                    //     strDay = Math.floor(pDay); // 일
                    //     pHour = (periodTime-(strDay * (60*60*24*1000))) / (60*60*1000);
                    //     strHour = Math.floor(pHour);
                    //     strMinute = Math.floor((periodTime - (strDay * (60*60*24*1000)) - (strHour * (60*60*1000))) / (60*1000));
                    //    // console.log(">>>" + strDay + " 일 " + strHour + " 시간 " + strMinute + " 분 되었습니다. </B>");   

                       
                        var _delayTime = _this.periodTime(errorTime, restoreTime);
                        if(_delayTime != 0){
                            result[i]['delay_time'] = '<p style="color:#516173">'+_delayTime +'</p>';
                        } else {
                            result[i]['delay_time'] = 0;
                        }


                        errorTime = errorTime.substr(0, errorTime.indexOf(':',14));
                        errorTime = errorTime.replace('T', ' | ');
                        result[i]['error_time'] = '<p style="color:#FF0000">'+errorTime+'</p>';

                        restoreTime = restoreTime ? restoreTime.substr(0, restoreTime.indexOf(':',14)) : '미복구';
                        restoreTime = restoreTime ? restoreTime.replace('T', ' | ') : '미복구';
                        result[i]['restore_time'] = '<p style="color:#1ABA00">'+restoreTime+'</p>';

                        for( j in locationList){
                            var location = locationList[j]['location'];
                            var children = locationList[j]['w2ui']['children'];
                            if(location == result[i]['location']){
                                if( result[i]['delay_time'] != 0){

                                    locationList[j]['w2ui']['children'].push(result[i]);
                                }
                            }
                        }
                    }
                    _this.recordUpdate(locationList);

                },
                error: function (model, response) {

                }
            });
        },
        periodTime: function(startDate, endDate){
            var fromDate = new Date(startDate);
            var toDate =endDate ? new Date(endDate):new Date;

            periodTime = toDate.getTime()-fromDate.getTime();
            pDay = periodTime / (60*60*24*1000); 
            strDay = Math.floor(pDay); // 일
            pHour = (periodTime-(strDay * (60*60*24*1000))) / (60*60*1000);
            strHour = Math.floor(pHour);
            strMinute = Math.floor((periodTime - (strDay * (60*60*24*1000)) - (strHour * (60*60*1000))) / (60*1000));
            sec = Math.floor((periodTime % (1000 * 60)) / 1000);
            var periodDate = '';
          
            if( strDay != 0 ){
                periodDate = strDay + " 일 " + strHour + " 시간 " + strMinute +'분';
            }
            else if( strDay == 0 && strHour != 0){
                periodDate = strHour + " 시간 " + strMinute +'분';
            }
            else if( strDay == 0 && strHour == 0 && strMinute !=0  ){
                periodDate = strMinute +'분';
            } 
            else if(  strDay == 0 && strHour == 0 && strMinute ==0 && sec !=0 ){
                //periodDate = sec+'초';
                periodDate = 0;
            }

            return periodDate;
        },
        recordUpdate: function(records){
            var _this =this;
            var tempRecord = [];
            for( i in records){
                var _childrenLeng = records[i]['w2ui']['children'].length;
                if(_childrenLeng > 0){
                    var obj ={};
                    obj['id']=records[i]['id'];
                    obj['device_id']=records[i]['device_id'];
                    obj['device_name']=records[i]['device_name'];
                    obj['location']=records[i]['location'];
                    obj['w2ui']=records[i]['w2ui'];
                    obj['recid']=records[i]['recid'];
                    obj['site_id']=records[i]['site_id'];

                    tempRecord.push(records[i]);
                }
            }

            for( i in tempRecord){
                var deviceId = tempRecord[i]['device_id'];
            
                if( i>0){
                    if(deviceId === tempRecord[i-1]['device_id']){
                        tempRecord[i]['device_name']='';
                    }
                }
            }

            var gridName = _this.config.grid['name'];
            window.w2ui[gridName].records = tempRecord;
            window.w2ui[gridName].render();

            //_this.$el.find('.w2ui-grid-footer').text('현재시간');

            var tempRecordLeng = tempRecord.length;
            if(tempRecordLeng>0){
                console.log('true');
                $('#download-btn').prop('disabled', false);
            } 
            else if(tempRecordLeng == 0){
                console.log('false');

                $('#download-btn').prop('disabled', true);
            }
            var date = new Date();
            var toYear = date.getFullYear();
            var tempMonth = date.getMonth()+1;
            var toMonth = tempMonth >= 10 ? tempMonth : '0'+tempMonth;
            var tempDate = date.getDate();
            var toDate = tempDate >= 10 ? tempDate : '0'+tempDate;

            var toHour = date.getHours() >= 10 ? date.getHours() : '0'+date.getHours();
            var toMinute = date.getMinutes() >= 10 ? date.getMinutes() : '0'+date.getMinutes();
            var toSec = date.getSeconds() >= 10 ? date.getSeconds() : '0'+date.getSeconds();

            var currentDate = toYear+'-'+toMonth+'-'+toDate+' '+toHour+':'+toMinute+':'+toSec;

            $('.w2ui-footer-left').text(currentDate);
            window.w2ui[gridName].on('render:after', function (event) {
                var hasClaz = $('.w2ui-show-children').hasClass('w2ui-icon-collapse');
                if(hasClaz){
                    $('.w2ui-show-children').removeClass('w2ui-icon-collapse');
                    $('.w2ui-show-children').addClass('w2ui-icon-expand');
                }
            });
            window.w2ui[gridName].on('refresh:after', function (event) {
                $('.w2ui-footer-left').text(currentDate);
            });

        },
        initForm: function(){
            var _this = this;
            _this.$el.find('.w2ui-field:nth-child(1)').css('display','none');
            _this.$el.find('.w2ui-field:nth-child(5)').css('display','none');

            
            var toDate = _this.getToDay();
            _this.$el.find('input[name=startDate]').val(toDate);
            _this.$el.find('input[name=endDate]').val(toDate);
            _this.$el.find('input[name=endDate]').w2tag();
            _this.$el.find('input[name=endDate]').removeClass('w2ui-error');
            _this.$el.find('#search-btn').prop('disabled',false);
            _this.$el.find('#download-btn').prop('disabled', true);

            _this.$el.find('.date-setting').find('.w2ui-btn').removeClass('w2ui-btn-blue');

            setTimeout(function(){
                _this.$el.find('input[name=deviceList]').val('전체');
           }, 200);


        },
        getToDay: function(){
            var date = new Date();
            var toYear = date.getFullYear();
            var tempMonth = date.getMonth()+1;
            var toMonth = tempMonth >= 10 ? tempMonth : '0'+tempMonth;
            var tempDate = date.getDate();
            var toDate = tempDate >= 10 ? tempDate : '0'+tempDate;

            var toDays = toYear+'/'+toMonth+'/'+toDate;

            return toDays;
        },
        setThisWeek: function(){
            console.log('setTHisWeek');
            var _this = this;
            var $targetBtn = _this.$el.find('#thisWeek-btn'); 
            var _hasClaz = $targetBtn.hasClass('w2ui-btn-blue');
            var _hasClazSiblings = $targetBtn.siblings().hasClass('w2ui-btn-blue');
            var _getToDay = _this.getToDay();
            if(_hasClaz){
                $targetBtn.removeClass('w2ui-btn-blue');
                _this.$el.find('input[name=startDate]').val(_getToDay);
                _this.$el.find('input[name=endDate]').val(_getToDay);
            } else {
                $targetBtn.addClass('w2ui-btn-blue');
                if(_hasClazSiblings){
                    $targetBtn.siblings().removeClass('w2ui-btn-blue');
                }
                var currentDay = new Date();  
                var theYear = currentDay.getFullYear();
                var theMonth = currentDay.getMonth();
                var theDate  = currentDay.getDate();
                var theDayOfWeek = currentDay.getDay();
                 
                var thisWeek = [];
                 
                for(var i=1; i<8; i++) {
                  var resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek));
                  var yyyy = resultDay.getFullYear();
                  var mm = Number(resultDay.getMonth()) + 1;
                  var dd = resultDay.getDate();
                 
                  mm = String(mm).length === 1 ? '0' + mm : mm;
                  dd = String(dd).length === 1 ? '0' + dd : dd;
                 
                  thisWeek[i] = yyyy + '/' + mm + '/' + dd;
                }
                console.log(thisWeek);     
                _this.$el.find('input[name=startDate]').val(thisWeek[1]);
                _this.$el.find('input[name=endDate]').val(thisWeek[7]);       

            }
        },
        setThisMonth: function(){
            console.log('setThisMonth');
            var _this = this;
            var $targetBtn = _this.$el.find('#thisMonth-btn'); 
            var _hasClaz = $targetBtn.hasClass('w2ui-btn-blue');
            var _hasClazSiblings = $targetBtn.siblings().hasClass('w2ui-btn-blue');
            var _getToDay = _this.getToDay();
            if(_hasClaz){
                $targetBtn.removeClass('w2ui-btn-blue');
                _this.$el.find('input[name=startDate]').val(_getToDay);
                _this.$el.find('input[name=endDate]').val(_getToDay);
            } else {
                $targetBtn.addClass('w2ui-btn-blue');
                if(_hasClazSiblings){
                    $targetBtn.siblings().removeClass('w2ui-btn-blue');
                }
                var date = new Date();
                var thisYear = date.getFullYear();
                var tempMonth = date.getMonth()+1;
                var thisMonth = tempMonth>= 10 ? tempMonth : '0'+tempMonth;
                var thisDate = '01';
    
                var startDate = thisYear+'/'+thisMonth+'/'+thisDate;
                var endDate = _getToDay;

                _this.$el.find('input[name=startDate]').val(startDate);
                _this.$el.find('input[name=endDate]').val(endDate);
            }
            

        },
        setLastMonth: function(){
            console.log('setLastMonth');
            var _this = this;
            var $targetBtn = _this.$el.find('#lastMonth-btn'); 
            var _hasClaz = $targetBtn.hasClass('w2ui-btn-blue');
            var _hasClazSiblings = $targetBtn.siblings().hasClass('w2ui-btn-blue');
            var _getToDay = _this.getToDay();
            if(_hasClaz){
                $targetBtn.removeClass('w2ui-btn-blue');
                _this.$el.find('input[name=startDate]').val(_getToDay);
                _this.$el.find('input[name=endDate]').val(_getToDay);
            } else {
                $targetBtn.addClass('w2ui-btn-blue');
                if(_hasClazSiblings){
                    $targetBtn.siblings().removeClass('w2ui-btn-blue');
                }
                var firstDay = new Date();
                firstDay.setMonth( firstDay.getMonth() - 1 ); 
                firstDay.setDate(1);

                var firstYear = firstDay.getFullYear();
                var tempFirstMonth = firstDay.getMonth()+1;
                var firstMonth = tempFirstMonth >= 10 ? tempFirstMonth : '0'+tempFirstMonth;
                var tempFirstDate = firstDay.getDate();
                var firstDate = tempFirstDate >= 10 ? tempFirstDate : '0'+tempFirstDate;
                var startLastDate = firstYear+'/'+firstMonth+'/'+firstDate; 

                var endDay = new Date();
                endDay.setMonth( endDay.getMonth() ); 
                endDay.setDate(0);

                var endYear = endDay.getFullYear();
                var tempEndMonth = endDay.getMonth()+1;
                var endMonth = tempEndMonth >= 10 ? tempEndMonth : '0'+tempEndMonth;
                var tempEndDate = endDay.getDate();
                var endDate = tempEndDate >= 10 ? tempEndDate : '0'+tempEndDate;
                var endLastDate = endYear+'/'+endMonth+'/'+endDate; 

                _this.$el.find('input[name=startDate]').val(startLastDate);
                _this.$el.find('input[name=endDate]').val(endLastDate);
            }        
            
        },
        excelDownload: function(){
            location.replace('/network/error/excelDown');
        },
        dateCheck: function(){
            console.log('change');
            var _this =this;
            var startDate = _this.$el.find('input[name=startDate]').val();
            var endDate = _this.$el.find('input[name=endDate]').val(); 
            
            if(startDate > endDate){
                console.log('big');
                _this.$el.find('input[name=endDate]').addClass('w2ui-error');
                _this.$el.find('input[name=endDate]').w2tag('시작일 이후의 일자를 <br> 선택하세요.');
                _this.$el.find('#search-btn').prop('disabled',true);
                
            } else {
                _this.$el.find('input[name=endDate]').removeClass('w2ui-error');
                _this.$el.find('input[name=endDate]').w2tag();
                _this.$el.find('#search-btn').prop('disabled',false);
            }

        },
		destroy: function () {
			var _this = this;
			var gridName = _this.config.grid['name'];
			var formName = _this.config.form['name'];

			if (window.w2ui.hasOwnProperty(gridName)) {
				window.w2ui[gridName].destroy();
			}
			if (window.w2ui.hasOwnProperty(formName)) {
				window.w2ui[formName].destroy();
			}
			this.undelegateEvents();
		},
	});
});