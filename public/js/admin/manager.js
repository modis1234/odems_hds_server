define([
    "text!views/manager",
	"css!cs/stylesheets/adminPage.css"
], function (
    manager
) {
    var ManagerModel = Backbone.Model.extend({
		url: '/manager/managers',
		parse: function (result) {
			return result;
		}
	});


	return Backbone.View.extend({
        el: '.component-box',
		config: {
            grid: {
                name:'managerGrid',
                recid: "id",      
                columns: [                
                    { field: 'location_text', caption: 'UPS 위치', size: '30%', attr: "align=right"},
                    { field: 'level_text', caption: '구분', size: '10%', attr: "align=right"},
                    { field: 'name', caption: '담당자 이름', size: '20%', attr: "align=center" },
                    { field: 'tel', caption: '연락처', size: '20%', attr: "align=center"},
                    { field: 'desc', caption: '', size: '20%', attr: "align=center"}

                ],
                records: undefined,
                onClick: function(event) {
                    var grid = this;
                    var form = window.w2ui['managerForm'];                    
                    event.onComplete = function () {
                        var sel = grid.getSelection();
                        $('button[name=save]').prop('disabled',false);
                        if (sel.length == 1) {
                            form.recid  = sel[0];
                            form.record = $.extend(true, {}, grid.get(sel[0]));
                            form.refresh();
                        } else {
                            $('button[name=save]').prop('disabled',true);
                            form.clear();
                        }
                    }
                }
            }, // end grid
            form: {
                name: 'managerForm',
                header: '담당자 정보',
                fields: [
                    { name: 'location', type: 'text', html: { caption: 'UPS 위치', attr: 'style="width: 90px; height: 24px;" readonly' } },
                    { name: 'level_text', type: 'text', html: { caption: '구분', attr: 'style="width: 90px; height: 24px;" readonly' } },
                    { name: 'name', type: 'text', html: { caption: '이름', attr: 'style="width: 90px; height: 24px;" ' } },
                    { name: 'tel', type: 'text', html: { caption: '연락처', attr: 'style="width: 180px; height: 24px;"  maxlength="13"' } }
                ],
                actions: {
                    'save' : function(){
                        var form = window.w2ui['managerForm'];
                        var record = form.record;
                        console.log(">>>>>>",record);
                        var updateObj = {};
                        updateObj['id'] = record['id'];
                        updateObj['level'] = record['level'];
                        updateObj['upsId'] = record['ups_id'];
                        updateObj['location'] = record['location'];
                        updateObj['name'] = record['name'];
                        updateObj['tel'] = $('input[name=tel]').val();

                        var options = {
                            msg: "선택 된 담당자를 수정하시겠습니까?",
                            title: 'Confirmation',
                            width: 450,
                            height: 220,
                            btn_yes: {
                                text: '확인',
                                class: '',
                                style: 'background-image:linear-gradient(#73b6f0 0,#2391dd 100%); color: #fff',
                                callBack: function () {
                                    console.log("yes");
                                    
                                    window.main.view.adminView.update(updateObj);
                                }
                            },
                            btn_no: {
                                text: '취소',
                                class: '',
                                style: '',
                                callBack: function () {
                                    console.log("no");
                                }
                            },
                            callBack: null
                        };
                        w2confirm(options);
            
                        // console.log(updateObj);
                    }
                }, //end actions
                onAction : function(event){
                    var target = event.target;

                },
                onChange:  function(event){
                    var target = event.target;
 
                }             
            } // end form 
		},
		initialize: function () {
			console.log('manager.js');
            this.$el.html(manager)
            this.render();
        },
        events: {
            'keyup input#tel' : 'inputPhoneNumber'
		},
        render: function (){
            var _this = this;
            var gridOption = _this.config.grid;
            _this.$el.find('#manager_grid').w2grid(gridOption);
            var formOption = _this.config.form;
            _this.$el.find('#manager_form').w2form(formOption);

            this.managerModel = new ManagerModel();
			this.listenTo(this.managerModel, "sync", this.getManagerList);
			this.managerModel.fetch();
            
            _this.initForm();
        },
        initForm: function(){
            var _this = this;
            _this.$el.find('button[name=save]').text('저장');
            _this.$el.find('button[name=save]').prop('disabled',true);

        },
        getManagerList: function(model, response){
            var result =response;
            for( i in result ){
                var level = result[i]['level'];
                if(level === 0){
                    result[i]['level_text'] = '(정)';
                    result[i]['location_text'] = result[i]['location'];
                }
                else if(level === 1){
                    result[i]['level_text'] = '(부)';
                    result[i]['location_text'] = '';
                }
            }
            console.log(result);
            
            var _gridName = this.config.grid['name'];
            window.w2ui[_gridName].records = result;
            window.w2ui[_gridName].render();

            
        },
        update: function(obj){
            var _this = this;
			var model = new ManagerModel();
            model.url += "/" + obj.id;
            // var updateObj = {};
            // updateObj['id'] = obj['id'];
            // updateObj['level'] = obj['level'];
            // updateObj['upsId'] = obj['ups_id'];
            // updateObj['location'] = obj['location'];
            // updateObj['name'] = obj['name'];
            // updateObj['tel'] = obj['tel'];

            // console.log(updateObj);
			model.set(obj);
			model.save({}, {
				success: function (model, response) {
                    var result = response;
                    console.log(response);
                    var gridName = _this.config.grid['name'];
                    window.w2ui[gridName].set(obj['id'], obj);
                    var formName = _this.config.form['name'];
                    window.w2ui[formName].clear();
				},
				error: function (model, response) {

				}
			});
        },
        inputPhoneNumber: function(event){
            console.log(event.target);
            var $target = $(event.target);
           var number = $target.val().replace(/[^0-9]/g, "");
            var phone = "";    
        
            if(number.length < 4) {
                return number;
            } else if(number.length < 7) {
                phone += number.substr(0, 3);
                phone += "-";
                phone += number.substr(3);
            } else if(number.length < 11) {
                phone += number.substr(0, 3);
                phone += "-";
                phone += number.substr(3, 3);
                phone += "-";
                phone += number.substr(6);
            } else {
                phone += number.substr(0, 3);
                phone += "-";
                phone += number.substr(3, 4);
                phone += "-";
                phone += number.substr(7);
            }
            $target.val(phone);
            return false;

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