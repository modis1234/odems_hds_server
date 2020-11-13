$.widget("openui.setGridButtons", {
	options: {

	},
	el: {
		_id : null,
		_class : null,
	},
	_create: function() {
		this.init();
	},
	_destroy: function() {
		this.el.empty();
	}
});

$.extend( $.openui.setGridButtons.prototype, {
	init: function() {
		this.el._id = this.element.attr("id");
		this.el._class = this.element.attr("class");
		this.render();
	},
	render: function() {
		var html ='<div class="button-box">' 
				 +'<button type="button" class="btn btn-primary" id="inputBtn">입력</button>'
				 +'<button type="button" class="btn btn-primary" id="updateBtn" style="margin-left: 10px;" disabled>수정</button>'
				 +'<button type="button" class="btn btn-default" id="deleteBtn" style="margin-left: 10px;">삭제</button>'
				 +'</div>'
		var target = this.element;
		target.append(html);
	},
	searchBox: function(options){
			var _id = this.el._id;
			var _options = options ;
			var _value=_options.value || undefined;
			var _data= _options.data ||"";
	
			var html = '<div class="search-box">'
						+'<div class="sch_company">'
						+'<select class="form-control select" id="sch_compName">'
						+'<option value="">선택</option>';
			_value.forEach(function(obj) {
				var text = obj.text;
				var value = obj.value;
				var select = obj.select;
				html += '<option value="'+value+'"';
				if(_data == text)html += ' selected'
				html += '>'+text+'</option>'
			});
			html +=('</select></div>'
						+'<div class="form-group sch_name">'
						+'<input type="text" class="form-control" placeholder="이름" id="sch_workerName">'
						+'</div>'
						+'<div class="col-md-2 sch_btn">'
						+'<button type="button" class="btn btn-primary" id="btn_search">검색</button>'
						+'</div></div>');
			
			var target = this.element;
			target.prepend(html);
			
		},
		
	searchTerm: function(options){
		var _id = this.el._id;
		var _options = options ;
		var _value=_options.value || undefined;
		var _data= _options.data ||"";

		var html = '<div class="search-box">'
					+'<div class="sch_company">'
					+'<select class="form-control select" id="sch_select">'
					+'<option value="">구간선택</option>';
		_value.forEach(function(obj) {
			var text = obj.text;
			var value = obj.value;
			var select = obj.select;
			html += '<option value="'+value+'"';
			if(_data == text)html += ' selected'
			html += '>'+text+'</option>'
		});
		html +=('</select></div>'
					+'<div class="sch-input-box sch_name">'
					+'<input type="text" class="form-control pull-right" id="term-input" readonly>'
					+'</div>'
					+'<div class="col-md-2 sch_btn">'
					+'<button type="button" class="btn btn-primary" id="btn_search">검색</button>'
					+'</div></div>');
		
		var target = this.element;
		target.append(html);
		
	},
	addSelectDiv: function(options){
		var _id = this.el._id||"";
		var _class=this.el._class||"";
		var _options = options ;
		var _value=_options.value || undefined;
		var _data= _options.data ||"";
		var _title=_options.title ||"";
		var html = '<div class="select-box">'
				+'<select class="form-control gas-box">'
				+'<option value="">'+_title+'선택</option>';
		_value.forEach(function(obj) {
			var text = obj.title;
			var value = obj.code;
			html += '<option value="'+value+'"';
			if(_data == text)html += ' selected'
			html += '>'+text+'</option>'
		});
		
	        html += '</select></div>';
	       // this.element.find(".search-box").prepend(html);
	        var target = this.element;
			target.prepend(html);
	        
	        var  htmlCSS={
	        	"width":"150px",
	        	"float":"left",
	        	"margin-right":"10px"
	        }
	        target.find(".select-box").css(htmlCSS);
	},
	button: function(options){
		var _options=options;
		var _id=_options._id||"";
		var _class=_options._class||"";
		var text=_options.text||"";
		
		var html="<div class='"+_class+"-btn'></div>"
		
	}
});

$.widget("openui.setGridBody", {
	options: {

	},
	el: {
		_id : null,
		_class : null,
	},
	_create: function() {
		this.init();
	},
	_destroy: function() {
		this.el.empty();
	}
});

$.extend( $.openui.setGridBody.prototype, {
	init: function() {
		this.el._id = this.element.attr("id");
		this.el._class = this.element.attr("class");

		this.render();
	},
	render: function() {
		var html = '<div id="data-grid"></div>';
		var target = this.element;
		target.append(html);
	}
});


$.widget("openui.setGridfooter", {
	options: {

	},
	el: {
		_id : null,
		_class : null,
	},
	_create: function() {
		this.init();
	},
	_destroy: function() {
		this.el.empty();
	}
});

$.extend( $.openui.setGridfooter.prototype, {
	init: function() {
		this.el._id = this.element.attr("id");
		this.el._class = this.element.attr("class");

		this.render();
	},
	render: function() {
		var html = '<div class="pagination-box">'
				 +'<nav aria-label="Page navigation">'
				 +'<ul class="pagination" id="pagination"></ul>'
				 +'</nav></div>';
		
		var target = this.element;
		target.append(html);
	}
});

$.widget("openui.dahua", {
	options: {
		
	},
	el: {
		_id : null,
		_class : null,
	},
	_create: function() {
		this.init();
	},
	_destroy: function() {
		this.el.empty();
	}
});

$.extend( $.openui.dahua.prototype, {
	cctv:undefined,
	ptzEnable:false,  //ptz 동작 상태
	init: function() {
		this.el._id = this.element.attr("id");
		this.el._class = this.element.attr("class");
		this.cctv = new Dahua(this.el._id);

		this.render();
	},
	render: function() {
		this.cctv.init(this.options);
	},
	disConnect:function(options){
		var _ip = options.ip;
		this.cctv.disConnect(_ip);
	},
	startPTZ:function(options){
		var _options = options;
		this.cctv.startPTZ(_options);
	},
	stopPTZ:function(options){
		var _options=options;
		this.cctv.stopPTZ(_options);
	},
	locationPTZ:function(options){
		var _options=options;
		this.cctv.ptzLocate(_options);
	},
	zoomStartPTZ:function(options){
		var _options=options;
		this.cctv.zoomStartPTZ(_options);
		
	},
	zoomStopPTZ:function(options){
		var _options=options;
		this.cctv.zoomStopPTZ(_options);
	},
	moveCtlButton: function(){
	   var html="";
	   html +=  '<ul class="ptzMove">'
		        +'<li class="ptz_btn" value="LeftUp" ><div class="leftUp_text"><i class="fas fa-caret-left"></i></div></li>'
		        +'<li class="ptz_btn" value="Up" ><div class="up_text"><i class="fas fa-caret-up"></i></div></li>'
		        +'<li class="ptz_btn" value="RightUp"><div class="rightUp_text"><i class="fas fa-caret-right"></i></div></li>'
		        +'<li class="ptz_btn" value="Left"><div class="left_text" ><i class="fas fa-caret-left"></i></div></li>'
		        +'<li class="ptz_btn" value="Locate"><div class="locate_text" ><i class="fas fa-search"></i></div></li>'
		        +'<li class="ptz_btn" value="Right"><div class="right_text" ><i class="fas fa-caret-right"></i></div></li>'
		        +'<li class="ptz_btn" value="LeftDown"><div class="leftDown_text" ><i class="fas fa-caret-left"></i></div></li>'
		        +'<li class="ptz_btn" value="Down"><div class="down_text" ><i class="fas fa-caret-down"></i></div></li>'
		        +'<li class="ptz_btn" value="RightDown"><div class="rightDown_text"><i class="fas fa-caret-right"></i></div></li>'
		        +'</ul>'
		 return html;
	},
	zoomCtlButton: function(){
		var html=""
		html += '<ul class="ptzZoom">'
		    +'<li class="ptz_btn" style="float: left" value="ZoomTele"><a href="#"><img src="/img/cctv/ptz_plus.png"></a></li>'
            +'<li class="ptz_btn" value="ZoomWide"><a href="#"><img src="/img/cctv/ptz_minus.png"></a></li>'
            +'</ul>';
		return html;
	},

});

//아날로그 시계 위젯
$.widget("openui.analog", {
	options: {
		
	},
	el: {
		_id : null,
		_class : null,
	},
	_create: function() {
		this.init();
	},
	_destroy: function() {
		this.el.empty();
	}
});

$.extend( $.openui.analog.prototype, {
	init: function() {
		var _this = this;
		
		this.el._id = _this.element.attr("id");
		this.el._class = _this.element.attr("class");
		
		_this.render();
	},
	render: function() {
		var _this = this;
	
		window.context = document.getElementById(this.el._id).getContext("2d");
	    window.radius  = document.getElementById(this.el._id).width / 2;
		
	    setInterval(function(context, radius) {
	    	_this.makeClockTool(this.context,this.radius);
	    	_this.makeNumberTool(this.context,this.radius);
	    	_this.makeArrowTool(this.context,this.radius);
	    }, 1000);
		
		
	},
	makeClockTool: function(context, radius){
		// 1. 시계 틀 만들기
		var grad;
		context.beginPath();
        context.arc(radius, radius, radius, 0, Math.PI * 2);
        context.fillStyle = "#dad9d9";
        context.fill();
        
        grad = context.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
        grad.addColorStop(0, '#414141');
        grad.addColorStop(1, '#414141');
        context.strokeStyle = grad;
        context.lineWidth = 0;

        context.stroke();
	},
	makeNumberTool: function(context, radius){
	  // 2. 숫자 집어넣기
	  context.font = 10 + "px Arial";
        for (var i = 0; i < 12; i++) {
            var x = 350* Math.cos(Math.PI* (30 * i)/ 180)+ radius- 20;
            var y = 350* Math.sin(Math.PI* (30 * i)/ 180)+ radius+ 20;
            var number = 0;
            if(i <= 9) {
                number = i+ 3;
            } else {
                number = i- 9;
            }
            context.fillText("", x, y);
        }
	},
	makeArrowTool: function(context, radius){
		// 3. 시 분 초 침 만들기
	    var now = new Date();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();

    /*    // 초
         context.beginPath();
         context.moveTo(radius, radius);
         context.lineTo(20* Math.cos(Math.PI* ((second* 6)- 90)/ 180)+ radius,
                        20* Math.sin(Math.PI* ((second* 6)- 90)/ 180)+ radius);
         context.lineWidth= 1;
         context.strokeStyle= "#414141";
         context.stroke();*/

        // 분
        context.beginPath();
        context.moveTo(radius, radius);
        context.lineTo(25* Math.cos(Math.PI* (((minute* 6)- 90)+ (second* (6/ 60)))/ 180)+ radius,
                       25* Math.sin(Math.PI* (((minute* 6)- 90)+ (second* (6/ 60)))/ 180)+ radius);
        context.lineWidth= 2;
        context.strokeStyle= "#414141";
        context.lineCap="round";
        context.stroke();

        // 시
        context.beginPath();
        context.moveTo(radius, radius);
        /*
        context.lineTo(20* Math.cos(Math.PI* (((hour* 30)- 90)+ (second* (6/ 60/ 60)))/ 180)+ radius,
                       20* Math.sin(Math.PI* (((hour* 30)- 90)+ (second* (6/ 60/ 60)))/ 180)+ radius);
        */
        context.lineTo(20* Math.cos(Math.PI* (((hour* 30)- 90)+ Math.PI* (minute * (6/30)))/ 180)+ radius,
                	   20* Math.sin(Math.PI* (((hour* 30)- 90)+ Math.PI* (minute * (6/30)))/ 180)+ radius);
        context.lineWidth= 2;
        context.strokeStyle= "#414141";
        context.lineCap="round";
        context.stroke();
	},

	
});

//end 아날로그

//디지털 시계 위젯
$.widget("openui.digital", {
	options: {
		
	},
	el: {
		_id : null,
		_class : null,
	},
	_create: function() {
		this.init();
	},
	_destroy: function() {
		this.el.empty();
	}
});
$.extend( $.openui.digital.prototype, {
	init: function() {
		var _this = this;
		
		this.el._id = _this.element.attr("id");
		this.el._class = _this.element.attr("class");
		
		_this.render();
	},
	render: function() {
		var _this = this;
		
		_this.start();
		
	},
	start:function(){
		var _this=this;
		setInterval(function() {
			_this.printClock();
	    }, 1000);
	},
	printClock: function(){
		var _this = this;
		var _id =this.el._id;
		var clock = document.getElementById(_id) // 출력할 장소 선택

		var currentDate = new Date(); // 현재시간
		var currentMonth = currentDate.getMonth() + 1;
		var currentDay = currentDate.getDate();

		var calendar = currentDate.getFullYear() + "-"
				+ (currentMonth < 10 ? "0" + currentMonth : currentMonth)
				+ "-" + (currentDay < 10 ? "0" + currentDay : currentDay) // 현재 날짜


		var currentHours = _this.addZeros(currentDate.getHours(), 2);
		var currentMinute = _this.addZeros(currentDate.getMinutes(), 2);
		var currentSeconds = _this.addZeros(currentDate.getSeconds(), 2);

		var timer = "<div class='calendar-box'><span style='font-size: 20px;'>" + calendar
				+ "</span></div><div class='time-box'><span style='font-size: 35px;'>" + currentHours + ":"
				+ currentMinute + ":" + currentSeconds
				+ "</span></div>";
		if (!clock) {
			clearTimeout(_this.start)
			return false
		}
		clock.innerHTML = timer; //날짜를 출력해 줌	
	},
	addZeros: function(num, digit){
		// 자릿수 맞춰주기
		var zero = '';
		num = num.toString();
		if (num.length < digit) {
			for (i = 0; i < digit - num.length; i++) {
				zero += '0';
			}
		}
		return zero + num;
	},
}); //end 디지털 시계

$.widget("openui.math", {
	options: {
		percent:0,
		placevlaue:0,
	},
	el: {
		_id : null,
		_class : null,
	},
	_create: function() {
		this.init();
	},
	_destroy: function() {
		this.el.empty();
	}
});
$.extend( $.openui.math.prototype, {
	init: function() {
		var _this = this;
		this.el._id = _this.element.attr("id");
		this.el._class = _this.element.attr("class");
			
		
		_this.render();
	},
	render: function() {
		var _this = this;
		console.log("el-->",_this.el._class);
		
	},
    ceil: function(data){
    	console.log("el-->",this.el._class);
    	console.log("el-->",data);
    	var _percent = data.percent;
    	var _placeValue = data.placeValue || 0; //소수점 자릿수 까지
    	var _cal = Math.pow(10,_placeValue);
    	var result = Math.ceil(_percent*_cal)/_cal;
    	return result;
    },
    floor: function(data){
    	var _percent = data.percent;
    	var _placeValue = data.placeValue || 0; //소수점 자릿수 까지
    	var _cal = Math.pow(10,_placeValue);
    	var result =Math.floor(_percent*_cal)/_cal;
    	return result;
    },
    round:function(data){
    	var _percent = data.percent;
    	var _placeValue = data.placeValue || 0; //소수점 자릿수 까지
    	var _cal = Math.pow(10,_placeValue);
    	var result = Math.floor(_percent*_cal)/_cal;
    	return result;
    },

});

$.widget("openui.pagination", {
	options: {
		totalPages:1,
	},
	el: {
		_id : null,
		_class : null,
	},
	_create: function() {
		this.init();
	},
	_destroy: function() {
		this.options = {};
		$.removeData(this.element.get(0));
	}
});

$.extend( $.openui.pagination.prototype, {
	init: function() {
		this.el._id = this.element.attr("id");
		this.el._class = this.element.attr("class");
		this.render();
	},
	destroy: function() {
		$(this.element).twbsPagination('destroy');
	},
	render : function() {
		var _this = this;
		var _totalPages = _this.options.totalPages||1;
		console.log(_this.options);
		var _opt={
				startPage:1,
	    		totalPages:_totalPages,
	    		visiblePages:5,
	    		first:'<<',
	    		prev:'<',
	    		next:'>',
	    		last:'>>',
	    		onPageClick:function(event,page){
	    			var query = page-1;
	    		}
		}
		$(this.element).twbsPagination(_opt);
		
		$(this.element).css("text-align", "center");
	},
	update: function(visiblePages) {
		$(this.element).twbsPagination({
            visiblePages: visiblePages
        });
	},
	changePage: function(page){
		$(this.element).twbsPagination("show",page);
	},
	open : function(data) {
		var _this = this;
		var totalPages = 1;
		var visiblePages = 1;
		var totalPages = data.totalCount / this.options.pagePerRow;

		if(data.totalCount % this.options.pagePerRow > 0) {
			totalPages += 1;
		}

		if(totalPages < 1) {
			totalPages = 1;
		} else if(totalPages < 6) {
			visiblePages = totalPages;
		} else {
			visiblePages = 5;
		}

		$(this.element).twbsPagination({
            totalPages: totalPages,
            visiblePages: visiblePages,
            pagePerRow : _this.options.pagePerRow,
    		first: ' ',
    		prev: ' ',
    		next: ' ',
    		last: ' '
        });

		$(this.element).css("text-align", "center");
	},
	changeTotalPages : function(options) {
		var _options = options;
		var _totalPages = _options.totalPages;
		if(_totalPages === 0) _totalPages+=1
		var _currentPage = _options.currentPage+1;
		$(this.element).twbsPagination("changeTotalPages",_totalPages,_currentPage);
   	},
   	reset : function() {
   		$(".pagination").find(".active").removeClass("active");
   		$($(".pagination > .page-item")[2]).addClass("active");
   	},
   	getCurrentpage: function(){
		return $(this.element).twbsPagination("getCurrentPage");
   	},

});


$.widget("openui.grid", {
	options: {

	},
	el: {
		_id : null,
		_class : null,
	},
	_create: function() {
		this.init();
	},
	_destroy: function() {
		w2ui[this.options.name].destroy();
		$.removeData(this.element.get(0));
	}
});

$.extend( $.openui.grid.prototype, {
	init: function() {
		this.el._id = this.element.attr("id");
		this.el._class = this.element.attr("class");

		$(window).on('resize', function(evt) {
			for(var grid in w2ui) {
				if(grid.indexOf('_') == -1) w2ui[grid].resize();
			}
		});

		this.render();
	},
	render : function() {
		this.options.recid = this.options.recid || "id";
		this.options.name = this.el._id.replace(/[^a-zA-Z0-9]/gi, "") + "Grid";
		this.options.recordHeight = this.options.recordHeight;
		$(this.element).w2grid(this.options);
		if(this.options.data != undefined) this.update(this.options.data);
	},
	update : function(data) {
		w2ui[this.options.name].records = data;
		w2ui[this.options.name].render();
	},
	refresh : function(){
		 w2ui[this.options.name].refresh();
	},
	getRecid : function() {
		//return $(".w2ui-selected").attr("recid");
		return $("#"+this.element.attr("id")).find(".w2ui-selected").attr("recid");
	},
	addRow : function(data) {
		w2ui[this.options.name].add(data);
	},
	getRow : function(recid) {
		return w2ui[this.options.name].get(recid);
	},
	updateRow : function(recid, data) {
		this.deleteRow(recid);
		this.addRow(data);
	},
	deleteRow : function(recid) {
		w2ui[this.options.name].remove(recid);
			w2ui[this.options.name].render();
	},
	empty : function() {
		w2ui[this.options.name].clear();
	},
	unselect : function(recid) {
		w2ui[this.options.name].unselect(recid);
		this.element.enableSelection();
	},
	resize : function() {
		var name = this.element.attr("id").replace(/[^a-zA-Z0-9]/gi, "") + "Grid";
		w2ui[name].resize();
	},
	destroy : function() {
		w2ui[this.options.name].destroy();
		$.removeData(this.element.get(0));
	}
});

$.widget("openui.table", {
    options: {
    	_captions : [],
    	_field : [],
    	columns: [],
    	data: []
    },

    el: {
        _id : null,
        _class : null,
    },
    _create: function() {
        this.init();
    },
    _destroy: function() {
        $(this.element).empty();
    }
});

$.extend( $.openui.table.prototype, {
    init : function() {
        this.el._id = this.element.attr("id");
        this.el._class = this.element.attr("class");

        this.render();
    },
    initOptions : function() {
    	this.options = {
	    	_captions : [],
	    	_field : [],
	    	columns: [],
	    	data: []
	    }
    },
    clearTable : function() {
    	this.element.find("table tr:not(tr:first-child)").remove();
    },
    removeTable : function() {
    	this.element.find("table").remove();
    },
    setTable : function() {
		var _this = this;
    	var header = "";
		var table = ""
		var row = "";

		this.setColumns();

		this.options._captions.forEach(function(val) {
			header += "<th>"+val+"</th>";
		});

		row = this.setRows(this.options.data);


		table = "<table id='"+this.el._id+"-tbl'>" + header + row + "</table>";

		return table;
	},
	setColumns : function() {
		var _this = this;
		_this.options._captions = [];
		_this.options._field = [];
		this.options.columns.forEach(function(val) {
			_this.options._captions.push(val.caption);
			_this.options._field.push(val.field);
		});
	},
	setRows : function(data) {
		var _this = this;
		var rows = ""
		var data = data || [];
		if(data.length !=0) {
			data.forEach(function(val) {
				var td = ""
				_this.options._field.forEach(function(v) {
					var text = val[v] || "";
					td += "<td>" + text + "</td>";

				})
				rows += "<tr>" + td + "</tr>";
			});
		}

		return rows;
	},
    render : function(options) {
    	var target = this.element;
    	target.append(this.setTable());
    },
    resize : function() {

    },
    update : function(data) {
    	var columns = data.columns || [];
        var data = data.data || [];

        if(columns.length != 0) {
        	this.initOptions();
        	this.options.columns = columns;
        	this.options.data = data;
        	this.removeTable();
        	this.render();
        } else {
        	this.clearTable();
        	this.setRows(data);
        	this.element.find("table").append(this.setRows(data));
        }

    },
});

$.widget("openui.popup", {
	options: {
		open: function() {
			var zIdx=2000;
			$(".ui-widget-overlay").css("z-index", zIdx);
			$(".ui-dialog").css("z-index", zIdx+1);
		},
		close: function() {
			$('.ui-dialog').empty();
			//$(this.element).remove();
		},
		minWidth: 400,
        minHeight: 'auto',
        resizable: false,
        autoOpen: false,
        dialogClass: 'ui-widget-shadow',
        modal: true
	},
	el: {
		_id : null,
		_class : null,
	},
	_create: function() {
		this.init();
	},
	_destroy: function() {
		this.options = {};
		$.removeData(this.element.get(0));
	}
});


$.extend( $.openui.popup.prototype, {
	init: function() {
		this.el._id = this.element.attr("id");
		this.el._class = this.element.attr("class");
		var form = this.options.form;
		var body = this.options.body;
		if(form == undefined) {
			$(this.element).dialog(this.options);
		} else {
			this.render();
		}
		$(window).on('resize', function(evt) {
			$(".ui-dialog").css("top", Math.max(0, (($(window).height() - $('.ui-dialog').outerHeight()) / 2) + $(window).scrollTop()) + "px");
			$(".ui-dialog").css("left", Math.max(0, (($(window).width() - $('.ui-dialog').outerWidth()) / 2) + $(window).scrollLeft()) + "px");
		});
		/*

		*/
	},
	destroy: function() {
		$.removeData(this.element.get(0));
	},
	render : function() {
		var _this = this;
		var title = this.options.title || '';
		var formArr = this.options.form;
		var bodyHtml = '<div id="'+ this.el._id +'-popup" class="openui-popup-body">' +
        			   '<form><fieldset><ul class="list-box" style="list-style-type:none;">';
		formArr.forEach(function(form,index) {
			bodyHtml +=  '<li id="popup-'+index+'"style="margin-top:5px;">' + _this[form.type](form) + '</li>';
		});

		bodyHtml += '</ul></fieldset></form><div id="someSelect"></div></div>';

		$(this.element).empty();
		$(this.element).hide();
		$(this.element).attr('title', title);
		$(this.element).append(bodyHtml);
		if(!this.options.main) {
			$(this.element).find(".popup-date").datepicker();
//			$(this.element).find(".popup-datetime").datetimepicker({format: 'Y-m-d H:i', formatDate: 'Y-m-d'});
		}
		$(this.element).dialog(this.options);
	},
	open : function() {
		var zIdx=2000;
		$(".ui-widget-overlay").css("z-index", zIdx);
		$(".ui-dialog").css("z-index", zIdx+1);
		$('.popup-form.text').keypress(function (e) {
			if(e.which == 13) {
				e.preventDefault();
			}
		});
		$(this.element).dialog('open');
	},
	close : function() {
		$(this.element).dialog('close');
		$('.ui-dialog').empty();
	},
	set: function(options) {
		for(opt in options) {
			this.options[opt] = options[opt];
		}
	},
	getValues : function() {
		var result = {};
		var array = [];
		if(this.options.form == undefined) return {};
		this.options.form.forEach(function(obj) {
			var id = obj.id;
			var type = obj.type;

			if(type == 'radio') {
				result[id] = $("input[name="+id+"]:checked").val();
			} else if (type == 'checkbox') {
				$("input[name="+id+"]:checked").each(function() {
					array.push($(this).val());
				});
				result[id] = array;
			} else {
				result[id] = $('#'+id).val();
			}

		});
		return result;
	},


select_text : function(option) {
		var _id = option.id || this.el._id;
		var _label = option.label || "";
		var _placeholder = option.placeholder || "";
		var _value = option.value || "";
		var _name = _id.replace(/[^a-zA-Z0-9]/gi, "");
		var html = '<div style="width: 330px; margin-bottom:15px"><div class="data-box"><label for="'+_name+'-text">'+_label+'</label>' +
				   '<input type="text" class="popup-form text " id="'+_id+'" ' +
				   'placeholder="'+_placeholder+'" value="'+_value+'" autocomplete="off" readonly></div></div>'+
					 '<div id="'+_id+'_Grid" style="height:120px;display:none"></div></div>';
		return html;
	},

	date_text : function(option) {
		var _id = option.id || this.el._id;
		var _label = option.label || "";
		var _placeholder = option.placeholder || "";
		var _value = option.value || "";
		var _name = _id.replace(/[^a-zA-Z0-9]/gi, "");


		var _year=_value.substring(0,4)||"";
		var _month=_value.substring(5,7)||"";
		var _day=_value.substring(8,10)||"";
		var html = '<div><label for="birth-text">'+_label+'</label></div>'+
					'<div id="birth"><input type="text" class="popup-form text " id="birth-year" placeholder="년(4자)" value="'+_year+'" autocomplete="off" style="width:75px" maxlength="4">'+
					'<input type="text" class="popup-form text " id="birth-months" placeholder="월" value="'+_month+'" autocomplete="off" style="width:75px;margin-left: 10px;" maxlength="2">'+
					'<input type="text" class="popup-form text " id="birth-day" placeholder="일" value="'+_day+'" autocomplete="off" style="width:75px;margin-left: 10px;" maxlength="2"></div>'
		return html;
	},

	calendar_text : function(option) {
		var _id = option.id || this.el._id;
		var _label = option.label || "";
		var _placeholder = option.placeholder || "";
		var _value = option.value || "";
		var _name = _id.replace(/[^a-zA-Z0-9]/gi, "");

		var html = '<div><label for="birth-text">'+_label+'</label></div>'+
					'<div id="birth"><input type="text" class="popup-form text " name="birthday" id="birth-year" placeholder="년(4자)" value="'+_value+'" autocomplete="off" readonly></div>'
		return html;
	},

	text : function(option) {
		var _id = option.id || this.el._id;
		var _label = option.label || "";
		var _placeholder = option.placeholder || "";
		var _value = option.value || "";
		var _name = _id.replace(/[^a-zA-Z0-9]/gi, "");
		var html = '<div><label for="'+_name+'-text">'+_label+'</label></div>' +
					 '<div><input type="text" class="popup-form text " id="'+_id+'" ' +
					 'placeholder="'+_placeholder+'" value="'+_value+'" autocomplete="off" maxlength="25"></div>';
		return html;
	},

	email : function(option) {
		var _id = option.id || this.el._id;
		var _label = option.label || "";
		var _placeholder = option.placeholder || "";
		var _value = option.value || "";
		var name = _id.replace(/[^a-zA-Z0-9]/gi, "");
		var html = '<div><label for="'+name+'-email">'+_label+'</label></div>' +
				   '<div class=""><input type="email" class="popup-form text " id="'+_id+'" ' +
				   'placeholder="'+_placeholder+'" value="'+_value +'"></div>';
		return html;
	},
	password : function(option) {
		var _id = option.id || this.el._id;
		var _label = option.label || "";
		var _placeholder = option.placeholder || "";
		var _value = option.value || "";
		var _class_col = this.options.main ? '-main' : '';
		var _name = _id.replace(/[^a-zA-Z0-9]/gi, "");
		var html = '<div class="first-div'+_class_col+'"><label for="'+_name+'-password">'+_label+'</label></div>' +
				   '<div class="last-div'+_class_col+'"><input type="password" class="popup-form text " id="'+_id+'" ' +
				   'placeholder="'+_placeholder+'" value="'+_value+'"></div>';
		return html;
	},
	combo : function(option) {
		var _id = option.id || this.el._id;
		var _label = option.label || "";
		var _value = option.value || {};
		var _name = _id.replace(/[^a-zA-Z0-9]/gi, "");

		var _data= option.data ||"";

		var html = '<div><label for="'+_name+'-combo">'+_label+'</label></div>' +
			       '<div id="'+_id+'_div"><select name="'+_name+'" value="'+_name+'-select" class="popup-form" id="'+_id+'">';
		_value.forEach(function(obj) {
			var text = obj.text;
			var value = obj.value;
			var select = obj.select;
			html += '<option value="'+value+'"';
			if(_data == text)html += ' selected'
			html += '>'+text+'</option>'
		});
		html += '</select></div>';

		return html;
	},

	date : function(option) {
		var _id = option.id || this.el._id;
		var _label = option.label || "";
		var _value = option.value || {};
		var _name = _id.replace(/[^a-zA-Z0-9]/gi, "");

		var html = '<div><label for="'+_name+'-date">'+_label+'</label></div>' +
				   '<div><input type=text name="'+_name+'" value=""' +
			       'class="popup-form popup-date text ui-widget-content' +
			       '  ui-corner-all" id="'+_id+'"></div>';

		return html;
	},
	datetime : function(option) {
		var _id = option.id || this.el._id;
		var _label = option.label || "";
		var _value = option.value || {};
		var _name = _id.replace(/[^a-zA-Z0-9]/gi, "");

		var html = '<div><label for="'+_name+'-datetime">'+_label+'</label></div>' +
			       '<div><input type=text name="'+_name+'" value=""' +
			       'class="popup-datetime text"' +
			       ' id="'+_id+'"></div>';
		return html;
	},
	radio: function(option) {
		var _id = option.id || this.el._id;
		var _label = option.label || "";
		var _value = option.value || {};
		var _name = _id.replace(/[^a-zA-Z0-9]/gi, "");

		var html = '<div><label for="'+_name+'-radio">'+_label+'</label></div>' +
				   '<div class="popup-form" id="'+_id+'">';
		_value.forEach(function(obj,index) {
			var text = obj.text;
			var value = obj.value;
			var check = obj.check;
			html += '<div class="radioBtn"><input type="radio" id="radio-'+index+'" name="'+ _name +'" value="'+value+'"';
			if(check==true) html += ' checked="checked"'
			html += '>'+text+'</div>';
		});
		html += '</div>';
		return html;
	},
	checkbox: function(option) {
		var _id = option.id || this.el._id;
		var _label = option.label || "";
		var _value = option.value || {};
		var _name = _id.replace(/[^a-zA-Z0-9]/gi, "");

		var html = '<div><label for="'+_name+'-check">'+_label+'</label></div>' +
				   '<div class="popup-form" id="'+_id+'">';
		_value.forEach(function(obj) {
			var text = obj.text;
			var value = obj.value;
			var check = obj.check;
			html += '<div class="checkBtn"><input type="checkbox" name="'+ _name +'" value="'+value+'"';
			if(check==true) html += ' checked="checked"'
			html += '>'+text+'</div>';
		});
		html += '</div>';
		return html;
	},
	emptydiv: function(option){
		var _id = option.id || this.el._id;
		var _label = option.label || "";
		var html = '<div id="'+_id+'-title" class="label-title"><label class="label-text">'+_label+'</label></div>' +
	       '<div><div id='+_id+' style="height: 300px; margin-top: 35px;"></div></div>';
		//$(".ui-dialog-titlebar").hide();
		$(".ui-dialog").addClass(_id+"-ui-dialog")
		$(".ui-dialog").css("top","185px");
		$(".ui-dialog-titlebar").hide();
	    return html;
	},

	emptydiv_1: function(option){
		var _id = option[1].id || this.el._id;
		var _label = option[1].label || "";

		var _label_insert =option[0].label || "";
	  var _placeholder = option[0].placeholder || "";
	 	var name = option[0] ||"";
		var option_id=option[0].id || this.el._id;

		var html = '<div>'+
					'<div  class="input-box"><div><input type="text" id="'+option_id+'" class="form-control ycui-form-text" id="'+name+'-text" ' +
					'placeholder="'+_placeholder+'" value="'+'" autocomplete="off" style="width: 265px; float:left;"><button type="button" class="btn btn-primary addBtn" style="margin-left:35px">추가</button></div>'+
	       			'<div><div id='+_id+'></div></div>';

	    return html;
	},
	alarmDiv: function(){				
		var html = '<div class="popup-header">'
					+ '<div class="emergency-img"><img src="/img/emergency_img.png"></div>'
					+'<div class="title-panel"><span id="alarm-title"></span></div></div>'
					+'<div class="popup-body"></div>'
					+'<div class="popup-bottom"><span id="alarm-count"></span></div>';
		
		
		$(".ui-dialog-buttonpane").addClass("alarm-dialog-buttonpane");
		$(".ui-widget-overlay").addClass("alarm-widget-overlay");
		$(".ui-dialog").addClass("alarm-ui-dialog")

		    return html;
		},

	button : function(id) {

	},
	tellText: function(option){
		var _id = option.id || this.el._id;
		var _label = option.label || "";
		var _placeholder = option.placeholder || "";
		var _value = option.value || "";
		var _tellStr=""
		if(_value) _tellStr = _value.split("-");
		var _firstNum=_tellStr[0]||"";
		var _middleNum=_tellStr[1]||"";
		var _endNum=_tellStr[2]||"";
		
		var _name = _id.replace(/[^a-zA-Z0-9]/gi, "");
		var html = '<div><label for="'+_name+'-text">'+_label+'</label></div>' +
					 '<div><input type="text" class="popup-form tell-form" id="first-'+_id+'" ' +
					 'placeholder="'+_placeholder+'" value="'+_firstNum+'" autocomplete="off" maxlength="3">'+
					 '<span class="tell-span">-</span>'+
					 '<input type="text" class="popup-form tell-form" id="middle-'+_id+'" ' +
					 'placeholder="'+_placeholder+'" value="'+_middleNum+'" autocomplete="off" maxlength="4">'+
					 '<span class="tell-span">-</span>'+
					 '<input type="text" class="popup-form tell-form" id="end-'+_id+'" ' +
					 'placeholder="'+_placeholder+'" value="'+_endNum+'" autocomplete="off" maxlength="4"></div>';
		return html;
	},
	drillRateTable: function(option){
		var _id = option.id || this.el._id;
		var _label = option.label || "";
		var _value = option.value || "";
		var _label = option.label || "";
		
    	console.log("areaList->",_value);
    	var nameHTML="";
    	var areaDistHTML="";
    	var drillDistHTML="";
    	var drillRateHTML="";
    	var _areaDistTotal=0;
    	var _drillDistTotal=0;

    	for (var i = 0; i < _value.length; i++) {
    		var _areaAlias = _value[i].areaAlias;
			var _areaName = _value[i].areaName;
			var _areaDist = _value[i].areaDist;
			var _drillDist= _value[i].drillDist;
			var _drillRate = Math.round(((_drillDist/_areaDist)*100)*10)/10;
			_areaDistTotal += _areaDist;
			_drillDistTotal += _drillDist;
			
			nameHTML +='<th class="'+_areaAlias+'-name">'+_areaName+'</th>';
			areaDistHTML +='<td class="'+_areaAlias+'-areaDist">'+_areaDist+'</td>';
			drillDistHTML +='<td class="'+_areaAlias+'-drillDist">'+_drillDist+'</td>';
			drillRateHTML +='<td class="'+_areaAlias+'-drillRate">'+_drillRate+'%</td>';
		}
    	
    	var _drillRateTotal=Math.round(((_drillDistTotal/_areaDistTotal)*100)*10)/10;

		var html='<div class="'+_id+'-title label-title"><label class="label-text">'+_label+'</label></div>'
			      +'<table class="drillRate-table"  id='+_id+'-table>'
				  +'<tr class="drillRate-box areaRow-box"><th colspan="2">구분</th>'
			html+= nameHTML		    				  
			html +=('<th class="areaTotal-col-title">합계</th></tr>'		    
					+'<tr class="drillRate-box areaDistRow-box">'
				    +'<td colspan="2">구간 길이</td>');   
			html +=	areaDistHTML	  	

			html +=('<td class="areaDist-total">'+_areaDistTotal+'</td></tr>'
				   + '<tr class="drillRate-box drillDistRow-box">'
				   + '<td rowspan="2">굴진현황</td>'
				   + '<td>누적굴진</td>');
			html +=	drillDistHTML	  	
		    html +=(' <td class="areaDist-total">'+_drillDistTotal+'</td></tr>'
		    	   +'<tr class="drillRate-box drillDistRow-box">'
		    	   +'<td class="drillRate-title">굴진율</td>');
			html +=	drillRateHTML	  	
			html +=' <td class="drillRate-total">'+_drillRateTotal+'%</td></tr></table>'
			
		
			
		return html;

	}
});

$.widget("openui.confirm", {
	options: {
		open: function() {
			var zIdx=3000;
			$(".ui-widget-overlay").css("z-index", zIdx);
			$(".ui-dialog.inner-popup").css("z-index", zIdx+1);
		},
		close: function() {
			$('.ui-dialog.inner-popup').empty();
			//$(this.element).remove();
		},
		minWidth: 480,
        minHeight: 'auto',
        resizable: false,
        autoOpen: false,
        dialogClass: 'ui-widget-shadow inner-popup',
        modal: true,
	},
	el: {
		_id : null,
		_class : null,
	},
	_create: function() {
		this.init();
	},
	_destroy: function() {
		this.options = {};
		$.removeData(this.element.get(0));
	}
});


$.extend( $.openui.confirm.prototype, {
	init: function() {
		this.el._id = this.element.attr("id");
		this.el._class = this.element.attr("class");
		this.render();
	},
	destroy: function() {
		$.removeData(this.element.get(0));
	},
	render : function() {
		var _this = this;
		var title = this.options.title || '';
		var formArr = this.options.form;
		var bodyHtml = '<div id="'+ this.el._id +'-popup" class="openui-confirm-body">' +
        			   '<form><fieldset><ul>';
		formArr.forEach(function(form) {
			bodyHtml +=  '<li>' + _this[form.type](form) + '</li>';
		});
		bodyHtml += '</ul></fieldset></form></div>';

		$(this.element).empty();
		$(this.element).hide();
		$(this.element).attr('title', title);
		$(this.element).append(bodyHtml);
		$(this.element).dialog(this.options);
		$(this.element).parent().find('.ui-widget-header').addClass('ui-widget-header-'+title.toLowerCase());
		$(this.element).parent().addClass('ui-widget-'+title.toLowerCase());
	},
	open : function() {
		$(this.element).dialog('open');
	},
	close : function() {
		$(this.element).dialog('close');
		$(".ui-widget-overlay").css("z-index", 2000);
		$('.ui-dialog.inner-popup').empty();
	},
	set: function(options) {
		for(opt in options) {
			this.options[opt] = options[opt];
		}
	},
	getValues : function() {
		if($('#pw').val() == undefined) return {};
		var result = {'password' : $('#pw').val()};
		return result;
	},
	password : function(option) {
		var _id = option.id || this.el._id;
		var _label = option.label || "";
		var _placeholder = option.placeholder || "";
		var _value = option.value || "";
		var _name = _id.replace(/[^a-zA-Z0-9]/gi, "");
		var html = '<div class="popup-form-pw-1"><label></label></div>' +
				   '<div class="popup-form-pw-2"><input type="password" class="popup-form text" id="pw" ' +
				   'placeholder="'+_placeholder+'" value="'+_value+'"></div>';
		return html;
	},
	label : function(option) {
		var _label = option.label || "";
		var html = '<div class="popup-form-div"><div class="icon-'+this.options.title.toLowerCase()+'"></div><label class="popup-form-label">'+_label+'</label></div>';
		return html;
	},
	button : function(id) {

	}
});

$.widget("openui.form", {
	options: {

	},
	el: {
		_id : null,
		_class : null,
	},
	_create: function() {
		this.init();
	},
	_destroy: function() {

	}
});

$.extend( $.openui.form.prototype, {
	init: function() {
		this.el._id = this.element.attr("id");
		this.el._class = this.element.attr("class");

		this.render();
	},
	render: function() {
		$(this.element).append(this[this.options.type]());
	},
	destroy: function() {
		$.removeData(this.element.get(0));
	},
	email : function() {
		var _label = this.options.label || "";
		var _placeholder = this.options.placeholder || "";
		var name = this.el._id.replace(/[^a-zA-Z0-9]/gi, "");
		var html = '<label for="'+name+'-email">'+_label+'</label>' +
				   '<input type="email" class="form-control ycui-form-email" id="'+name+'-email" ' +
				   'placeholder="'+_placeholder+'" value="'+'">';

		return html;
	},
	text : function() {
		var _label = this.options.label || "";
		var _placeholder = this.options.placeholder || "";
		var name = this.el._id.replace(/[^a-zA-Z0-9]/gi, "");
		var html = '<label for="'+name+'-text">'+_label+'</label>' +
				   '<input type="text" class="form-control ycui-form-text" id="'+name+'-text" ' +
				   'placeholder="'+_placeholder+'" value="'+'" autocomplete="off">';
		//$(this.element).append(html);
		return html;
	},
	password : function() {
		var _label = this.options.label || "";
		var _placeholder = this.options.placeholder || "";
		var name = this.el._id.replace(/[^a-zA-Z0-9]/gi, "");
		var html = '<label for="'+name+'-password">'+_label+'</label>' +
				   '<input type="password" class="form-control ycui-form-password" id="'+name+'-password" ' +
				   'placeholder="'+_placeholder+'" value="'+'">';

		return html;
	},
	progress : function(value) {
		var html = '<progress value="'+value+'" max="100">'+value+'" %</progress>';
		$(this.element).empty();
		$(this.element).append(html);
	},
	combo : function() {
		var _name = this.el._id.replace(/[^a-zA-Z0-9]/gi, "");

		var html = '<select name="'+_name+'" value="'+_name+'-select" id="'+_name+'-select">';
		this.options.data.forEach(function(obj, i) {
			var text = obj.text;
			var value = obj.value;
			var select = obj.select;
			html += '<option value="'+value+'"';
			if(select==true) html += ' selected'
			html += '>'+text+'</option>'
		});
		html += '</select>';

		return html;
	}
});

$.widget("openui.pager", {
	options: {
		visiblePages : 1,
		totalPages : 1,
		pagePerRow : 23,
		first: '<<',
		prev: '<',
		next: '>',
		last: '>>'
	},
	el: {
		_id : null,
		_class : null,
	},
	_create: function() {
		this.init();
	},
	_destroy: function() {
		this.options = {};
		$.removeData(this.element.get(0));
	}
});

$.extend( $.openui.pager.prototype, {
	init: function() {
		this.el._id = this.element.attr("id");
		this.el._class = this.element.attr("class");
		this.render();
	},
	destroy: function() {
		$(this.element).twbsPagination('destroy');
	},
	render : function() {
		var _this = this;
		var totalPages = 1;
		var visiblePages = 1;
		var totalPages = this.options.totalCount / this.options.pagePerRow;

		if(this.options.totalCount % this.options.pagePerRow > 0) {
			totalPages += 1;
		}

		if(totalPages < 1) {
			totalPages = 1;
		} else if(totalPages < 6) {
			visiblePages = totalPages;
		} else {
			visiblePages = 5;
		}

		$(this.element).twbsPagination({
            totalPages: totalPages,
            visiblePages: visiblePages,
            pagePerRow : _this.options.pagePerRow,
    		first: ' ',
    		prev: ' ',
    		next: ' ',
    		last: ' '
        });

		$(this.element).css("text-align", "center");
	},
	update: function(visiblePages) {
		$(this.element).twbsPagination({
            visiblePages: visiblePages
        });
	},
	open : function(data) {
		var _this = this;
		var totalPages = 1;
		var visiblePages = 1;
		var totalPages = data.totalCount / this.options.pagePerRow;

		if(data.totalCount % this.options.pagePerRow > 0) {
			totalPages += 1;
		}

		if(totalPages < 1) {
			totalPages = 1;
		} else if(totalPages < 6) {
			visiblePages = totalPages;
		} else {
			visiblePages = 5;
		}

		$(this.element).twbsPagination({
            totalPages: totalPages,
            visiblePages: visiblePages,
            pagePerRow : _this.options.pagePerRow,
    		first: ' ',
    		prev: ' ',
    		next: ' ',
    		last: ' '
        });

		$(this.element).css("text-align", "center");
	},
	pagerTableCSS : function(selector, totalRow, currentPage) {
   		var pagePerRow = 25;
   		var totalPages = Math.ceil(totalRow / pagePerRow);

   		if((totalPages > 1) && (currentPage != totalPages)) {
			$(selector + " .page-item.next .page-link").hover(function(){
			    $(this).css({"background": "url(dist/img/user/btn_next_on.png)",'background-repeat': 'no-repeat'});
			    }, function(){
			    $(this).css({"background": "url(dist/img/user/btn_next_off.png)",'background-repeat': 'no-repeat'});
			});

			$(selector + " .page-item.last .page-link").hover(function(){
			    $(this).css({"background": "url(dist/img/user/btn_last_on.png)",'background-repeat': 'no-repeat'});
			    }, function(){
			    $(this).css({"background": "url(dist/img/user/btn_last_off.png)",'background-repeat': 'no-repeat'});
			});
   		} else if(currentPage != 1) {
			$(selector + " .page-item.prev .page-link").hover(function(){
			    $(this).css({"background": "url(dist/img/user/btn_prev_on.png)",'background-repeat': 'no-repeat'});
			    }, function(){
			    $(this).css({"background": "url(dist/img/user/btn_prev_off.png)",'background-repeat': 'no-repeat'});
			});

			$(selector + " .page-item.first .page-link").hover(function(){
			    $(this).css({"background": "url(dist/img/user/btn_first_on.png)",'background-repeat': 'no-repeat'});
			    }, function(){
			    $(this).css({"background": "url(dist/img/user/btn_first_off.png)",'background-repeat': 'no-repeat'});
			});
   		}
   	},
   	reset : function() {
   		$(".pagination").find(".active").removeClass("active");
   		$($(".pagination > .page-item")[2]).addClass("active");
   	}
});
	$.widget("openui.timespinner", {
		options: {

		},
		el: {
			_id : null,
			_class : null,
		},
		_create: function() {
			this.init();
		},
		_destroy: function() {
			$.removeData(this.element.get(0));
		}
	});

	$.extend( $.openui.timespinner.prototype, {
		init: function() {
			this.el._id = this.element.attr("id");
			this.el._class = this.element.attr("class");

			this.render();
		},
		render: function() {
			var html = '<input id="spin-hours-'+this.el._id+'" class="spin-hh" name="value">' +
					   '<input id="spin-mins-'+this.el._id+'" name="value">';
			$(this.element).append(html);
			$( "#spin-hours-"+this.el._id ).spinner({
				spin: function( event, ui ) {
			        if ( ui.value > 23 ) {
			          	$( this ).spinner( "value", 0 );
			          	return false;
			        } else if ( ui.value < 0 ) {
			          	$( this ).spinner( "value", 23 );
			          	return false;
			        }
		      	}
		    });
			$( "#spin-mins-"+this.el._id ).spinner({
				spin: function( event, ui ) {
			        if ( ui.value > 59 ) {
			          	$( this ).spinner( "value", 0 );
			          	return false;
			        } else if ( ui.value < 0 ) {
			          	$( this ).spinner( "value", 59 );
			          	return false;
			        }
		      	}
		    });

			$( "#spin-hours-"+this.el._id ).val(0);
			$( "#spin-mins-"+this.el._id ).val(0);
		},
		setValues: function(hour, min){
			$( "#spin-hours-"+this.el._id ).val(hour);
			$( "#spin-mins-"+this.el._id ).val(min);
		},
		getValues: function() {
			var id = this.element.attr("id");
			var hours = $( "#spin-hours-"+id ).val();
			var mins = $( "#spin-mins-"+id ).val();

			return {'hours':hours, 'mins':mins };
		}
	});
	function Validate(rules, messages, type) {
		$('.yes-core-validate').unbind('focusout');

		this.result = {};
		this.rules = rules;
		this.messages = messages;
		//$(".validate-wrap").remove();

		for(var id in rules) {
			var _this = this;
			var _type = type || false;
			this.result[id] = {};

			var _rule = rules[id];
			var _max = _rule.max;

			if(_max != undefined) $('#'+id).attr('maxlength', _max);
			$('#'+id).addClass('yes-core-validate');
			$('#'+id).removeClass('invalid');
			if(_type)$('#'+id).attr('data-placement', _type);
			$('#'+id).focusout(function(evt) {

				var _id = $(evt.target).attr('id');

				$('#'+_id).attr('data-original-title', '');
				var rule = rules[_id];
				var require = rule.require;
				var min = rule.min || 0;
				var max = rule.max;
				var data = $('#'+_id).val();
				var cnt = 0;

				var up = rule.up;
				var down = rule.down;

				var result = _this.getResult(_id,require, min, max, data, up, down);
				for(var re in _this.result[_id]) {
					var bool = _this.result[_id][re];
					if(!bool) cnt += 1;

					if(cnt == 0) {
						$('#'+_id).attr('data-original-title', '');
					} else {
						var msg = ''
						if(_this.messages != undefined) {
							msg = _this.messages[_id];
							$('#'+_id).attr('data-original-title', msg);
							$('#'+_id).tooltip();
						}
					}

				}
				if(cnt == 0) {
					$('#'+_id).removeClass('invalid');
				} else {
					$('#'+_id).addClass('invalid');

				}

			});

		}

	}

	Validate.prototype = {
		init: function() {
			$('.yes-core-validate').removeClass('invalid');
			$('.yes-core-validate').attr('data-original-title', '');
			$('.yes-core-validate').tooltip('destroy');
		},
		valid: function() {
			var invalidCount = 0;

			for(var id in this.rules) {
				var _this = this;
				this.result[id] = {};

				var _rule = this.rules[id];
				var _require = _rule.require;
				var _min = _rule.min || 0;
				var _max = _rule.max;
				var _data = $('#'+id).val();
				var cnt = 0;

				var _up = _rule.up;
				var _down = _rule.down;

				_this.getResult(id,_require, _min, _max, _data, _up, _down);
				for(var re in _this.result[id]) {
					//if(!_this.result[id][re]) cnt += 1;
					var bool = _this.result[id][re];
					if(!bool) cnt += 1;
					if(cnt == 0) {
						$('#'+id).attr('data-original-title', '');
					} else {
						var msg = ''
						if(_this.messages != undefined) {
							msg = this.messages[id];
							$('#'+id).addClass('invalid');
							$('#'+id).attr('data-original-title', msg);
							$('#'+id).tooltip();
						}
					}
				}

				invalidCount += cnt;
			}
			this.result.invalidCount = invalidCount;
			return this.result;
		},
		getResult: function(id, require, min, max, data, up ,down) {
			if(require == true) {
				this.result[id]['require'] = this.checkReq(data);
			} else if(require == 'num') {
				this.result[id][require] = this.checkNum(data);
			} else if(require == 'str') {
				this.result[id][require] = this.checkStr(data);
			} else if(require == 'ip4') {
				min = undefined;
				this.result[id][require] = this.checkIp4(data);
			} else if(require == 'ip6') {
				min = undefined;
				this.result[id][require] = this.checkIp6(data);
			} else if(require == 'ip') {
				min = undefined;
				var ip4 = this.checkIp4(data);
				var ip6 = this.checkIp6(data);
				if(ip4) {
					this.result[id]['ip4'] = this.checkIp4(data);
				} else {
					this.result[id]['ip6'] = this.checkIp6(data);
				}
			} else if(require == 'userId') {
				this.result[id][require] = this.checkUserIdReq(data);
			}

			if(min != 0) {
				if(data.length < min) {
					this.result[id]['min'] = false;
				} else {
					this.result[id]['min'] = true;
				}
			}

			if(up){
				this.result[id]['up'] = this.compareUp(data, up);
			}else if(down){
				this.result[id]['down'] = this.compareDown(data, down);
			}

		},

		compareUp: function(data, others){
			let result = false;
			let others_count = others.length;
			try{
				for(var i=0; i < others_count; i++){
					var target = others[i];
					if(data > target){ result = true; }
					else { result = false; }
				}
			}catch(e){
				console.log(e);
				result = false;
			}
			return result;
		},

		compareDown : function(data, other){
			let result = false;
			let others_count = others.length;
			try{
				for(var i=0; i < others_count; i++){
					var target = others[i];
					if(data < target){ result = true; }
					else { result = false; }
				}
			}catch(e){
				console.log(e);
				result = false;
			}
			return result;
		},

		checkUserIdReq: function(data) {
			var _data = data.replace(/\s/g,'');
			var hanChk = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
			var check = /^[a-zA-Z0-9]+$/;

			if(_data == undefined || _data == '') {
				return false;
			} else {
				if(hanChk.test(_data)) {
					return false;
				}

				if(check.test(_data)) {
					return true;
				} else {
					return false;
				}
			}
		},
		checkReq: function(data) {
			var _data = data.replace(/\s/g,'');
			if(_data == undefined || _data == '') {
				return false;
			} else {
				return true;
			}
		},
		checkNum: function(data) {
			var _data = data;
			if(_data == '') return false;
			var numChk = /^[0-9]*$/;
			return numChk.test(_data);
		},
		checkStr: function(data) {
			var _data = data;
			if(_data == '') return false;
			var strChk = /[a-zA-Z]/;
			return strChk.test(_data);
		},
		checkIp4: function(data) {
		    var _data = data;
		    if(_data == '') return false;
			var ip4 = /(^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$)|(^\*$)|(^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.((25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.){0,2}\*$)$/;
		    return ip4.test(_data);
		},
		checkIp6: function(data) {
		    var _data = data;
		    if(_data == '') return false;
			var ip6 = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\*$)$/
		    return ip6.test(_data);
		},
		checkPw: function(data) {
			var bool = true;
			var _data = data;
			if(_data == '') return false;
			var pwStrChk = /^.*(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
			var pwRepeatChk = /(.)\1/;
			if(!pwStrChk.test(_data)) bool = false;
			if(!pwRepeatChk.test(_data)) bool = false;
			return bool;
		}
	}

$.widget("openui.loading", {
	options: {

	},
	el: {
		_id : null,
		_class : null,
	},
	_create: function() {
		this.init();
	},
	_destroy: function() {
		this.options = {};
		$.removeData(this.element.get(0));
	}
});

$.extend( $.openui.loading.prototype, {
	init: function() {
		this.el._id = this.element.attr("id");
		this.el._class = this.element.attr("class");
		this.render();
	},
	destroy: function() {
		$(this.element).loadingModal('destroy');
	},
	render : function() {
		$(this.element).loadingModal({
			  position: 'auto',
			  text: '',
			  color: '#fff',
			  opacity: '0.7',
			  backgroundColor: 'rgb(0,0,0)',
			  animation: 'foldingCube'
			});
		//this.hide();
	},
	hide : function(){
		$(this.element).loadingModal('hide');

	},
	show: function(){
		$(this.element).loadingModal('show');
	}
	/*
	 *
	 * $('body').loading()
	 *
	 *
	 * */

});
