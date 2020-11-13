
function Alarm(alarmData) {
	
}

Alarm.prototype = {
	options: {
			buttons :[
				{
					text:"알람음 중지",
					click:function(){
						
		
					}
				},
				{
					text:"팝업창 닫기",
					click:function(){
						$("#alarm").popup("close");
						$("#alarm").children().remove();
					}
				},
				
			],
			open : function() {
				//_this.setIpAddValidation();
				var zIdx = 2000;
				$(".ui-widget-overlay").css("z-index",zIdx);
				$(".ui-dialog").css("z-index", zIdx + 1);
				$('.popup-form.text').keypress(
						function(e) {
							if (e.which == 13) {
								e.preventDefault();
							}
						});
				$(this.element).dialog('open');
			},
			close : function() {
				$('#ipContentArea').grid('unselect',$('#ipContentArea').grid('getRecid'));
				$(this).popup("close");
			},
			minWidth : 795,
			minHeight: 500,
	},
	listener: function(alarmData) {
		var _this=this;
		var _data = alarmData;
		var _ALARM = _data.ALARM;
   	
		var _alarmObj={
			type:undefined,
			title:undefined,
			data:[]
		};
		var _gridData = {
			seq:undefined,
			txTime:undefined,
			contents:undefined
		}
		var _type = _data.TYPE;
		//_alarmObj["data"].push(_ALARM);
		if(_type === "BLE") {
			var _txTime = this.timeConversion(_ALARM.txTime);
			_ALARM.txTime = _txTime;
			_alarmObj.type = _data.TYPE;
			
			var _seq = _ALARM.seq;
			var _areaName=_ALARM.areaName;
			var _workerName=_ALARM.workerName;
			var _age=_ALARM.age;
			var _compName=_ALARM.compName;
			var _cell=_ALARM.cell;
			
			var _contents = "<b style='color:#C6942B'>작업자 SOS</b>"+"&nbsp;&nbsp;&nbsp;&nbsp;"
							+_areaName+"&nbsp;&nbsp;&nbsp;&nbsp;"
							+_workerName+"&nbsp;&nbsp;&nbsp;&nbsp;"
							+_age+"세&nbsp;&nbsp;&nbsp;&nbsp;"
							+_compName+"&nbsp;&nbsp;&nbsp;&nbsp;"
							+_cell;
			_gridData.txTime=_txTime;
			_gridData.contents =_contents;
			_gridData["seq"] =_seq
			
			_alarmObj["data"].push(_gridData);
			
			var _title = "<b style='color:#C6942B'>작업자 응급상황"+"</b>&nbsp;&nbsp;"+_areaName+"&nbsp;&nbsp;"+_workerName+"&nbsp;&nbsp;"+_cell;
			_alarmObj.title = _title;
		}
		else if(_type === "GAS"){
			_alarmObj.type = _data.TYPE;
			var _areaName=_ALARM.areaName;
			var _gasName=_ALARM.gasName;
			var _value=_ALARM.value;
			/**정상범위 추출**/
			var _desc=_ALARM.normal.desc;
			var normalStr=_desc.indexOf("NORMAL");
			var minorStr=_desc.indexOf("MINOR");
			var _nomalRange= _desc.substring(normalStr+7,minorStr-1);
			var _gasValue=_ALARM.normal.value;
			var _gasSign="";
			if(_gasValue ===0){
				_gasSign="%"
			}
			else if(_gasValue ===1 || _gasValue ===2){
				_gasSign="PPM"
			}
			else if(_gasValue===3){
				_gasSign="%LEL"
			}else{
				_gasSign=""
			}
			/**severity**/
			var _severity=_ALARM.severity;
			var _gasStatus="";
			if(_severity ==="MAJOR"){
				_gasStatus="위험";
			}
			else if(_severity ==="MINOR"){
				_gasStatus="경고";
			}
			/***************/
			var _contents = "<b style='color:#C6942B'>복합가스-"+_gasStatus+"</b>"+"&nbsp;&nbsp;&nbsp;&nbsp;"
							+_areaName+"&nbsp;&nbsp;&nbsp;&nbsp;"
							+_gasName+"&nbsp;&nbsp;&nbsp;&nbsp;"
							+"검출수치:"+_value+_gasSign+"&nbsp;&nbsp;&nbsp;&nbsp;"
							+"정상수치:"+_nomalRange+_gasSign+"&nbsp;&nbsp;&nbsp;&nbsp;";
			
			var _txTimeStamp = _ALARM.txTime;
			var _txTime = _txTimeStamp.replace('T'," ");
			_gridData.txTime  = _txTime;
			_gridData.contents =_contents;
			_gridData["seq"] =0;
			
			_alarmObj["data"].push(_gridData);
			
			var _title = _txTime+"&nbsp&nbsp<b style='color:#C6942B'>복합가스-"+_gasStatus+"</b>&nbsp&nbsp"+_areaName+"&nbsp&nbsp"+_gasName+"&nbsp&nbsp검출 수치:"+_value+_gasSign;
			_alarmObj.title = _title;			
			
		}
		_this.openPopup(_alarmObj);
	},
	openPopup: function(data) {
		var _this=this;
	   	var _alarm =  data;
	   	var _options = _this.options;
    
		var _type =_alarm.type;
		
		var _gridData = _alarm;
		var _popupClz = $("#alarm").hasClass("ui-dialog-content");
		var _title =_gridData.title;
		if(_popupClz){
			$("#data-grid").grid("addRow",_gridData.data);
			$(".w2ui-grid-records").scrollTop(99);
			_this.setTitle(_title);
			
		}else{
			$('#alarm').popup(_options);
			$('#alarm').popup('open');
			
			$(".ui-dialog-titlebar").remove();
			$('.ui-dialog-buttonset').children().eq(0).attr('class',"btn btn-default saveBtn");
			$('.ui-dialog-buttonset').children().eq(1).attr('class',"btn btn-primary cancleBtn");
			
			var alarmComp = $('#alarm').popup("alarmDiv");
			$("#alarm").append(alarmComp);
			$(".popup-body").setGridBody();

			_this.drawGrid(_gridData);
		}
	},
	drawGrid: function(data) {
		
		var _gridData = data
		
		var columns = [ 
			{field : 'txTime', caption : '발생시간', size : '25%',attr:"align=center"}, 
			{field : 'contents', caption : '내용 ', size : '75%',}, 
		
		];
		var _row = _gridData.data;
		
		var _type = _gridData.type;
		var _title = _gridData.title;
		if(_type == 'GAS') {
			this.setTitle(_title)
		} else if(_type == 'BLE') {
		 	this.setTitle(_title)
		}
		
		$("#data-grid").grid({
			columns : columns,
			data : _row,
			show : {
				selectColumn : false,
				recordTitles : true
			},
			recordHeight : 30,
			recid : "seq",
			multiSelect : false,

		});//end grid
		
	},
	setTitle: function(data) {
		var _title = data;

		$("#alarm-title").html(_title);
	},
	timeConversion: function(timeStamp){
    	var _timeStamp = timeStamp;
    	var date = new Date(_timeStamp);
    	
    	var _year= date.getFullYear();
    	var _month= date.getMonth()+1;
    	var _day= date.getDate();
    	var _hours= date.getHours();
    	var _minutes=date.getMinutes();
    	var _seconds=date.getSeconds();
    	
    	var _getMonth = (_month<10)?"0"+_month:_month;
    	var _getDay = (_day<10)?"0"+_day:_day;
    	var _getHours = (_hours<10)?"0"+_hours:_hours;
    	var _getMinutes = (_minutes<10)?"0"+_minutes:_minutes;
    	var _getSeconds = (_seconds<10)?"0"+_seconds:_seconds;
    	
    	var time=_year+"."+_getMonth+"."+_getDay+" "+_getHours+":"+_getMinutes+":"+_getSeconds
    	
    	return time;
    	
    },
}
