var express = require('express');
var router = express.Router();
var request = require('request');

var servers = require('./config/servers');
var xl = require('excel4node');

/* GET users listing. */
router.get('/list', function(req, res, next) {
    var geturl = servers.apisvr.url + '/api/ups/1'
    request.get({
            url:geturl,
            json: true
        }, function(error, _res, body){
        if(!error){
             upsList = _res.body;
            res.json(upsList);
        }else {
            res.send(error);
        }
    });
});

router.get('/device', function(req, res, next) {
    var geturl = servers.apisvr.url + '/api/ups/device/1';

    request.get({
            url:geturl,
            json: true
        }, function(error, _res, body){
        if(!error){
            var _deviceList = _res.body;
            res.json(_deviceList);
        }else {
            res.send(error);
        }
    });

});

// error 검색
/* 
    @body startDate
    @body endDate
    @body localIndex = 'local101' --사이트 조건
    @body upsIndex(필수 x) 
*/
router.post('/error/search', function(req, res, next){
    var errorURL = servers.apisvr.url + '/api/ups/error/search';

    var reqBody = req.body;
    reqBody['localIndex'] = 'hds';  //대곡-소사 운영 웹서버
    //reqBody['localIndex'] = 'local101'; //로컬 개발 웹서버

    request.post({
        url: errorURL,
        body: reqBody,
        json: true,
    }, function(error, _res, _body) {
        if(!error){
            var errorList = _res.body;
            res.json(errorList);
            for( i in errorList){
                for( j in upsList){
                    if( errorList[i]['ups_idx'] == upsList[j]['device_idx']){
                        errorList[i]['location'] = upsList[j]['location'];
                    }
                }
            }

            searchList = errorList;
            searchBody = reqBody;
        } else {
            res.send(error);
        }
    });
});

// 엑셀 다운로드
var upsList;
var searchList;
var searchBody;
router.get('/error/excelDown', function(req, res, next){

    var _tempEndDate = searchBody["endDate"];
    var toDate = new Date(_tempEndDate);
    toDate.setDate(toDate.getDate()-1);
    var toYear = toDate.getFullYear();
    var toMonth = toDate.getMonth()+1 >= 10 ? toDate.getMonth()+1 : '0'+(toDate.getMonth()+1);
    var toDay = toDate.getDate() >= 10 ? toDate.getDate() : '0'+toDate.getDate();
    var _endDate = toYear+'-'+toMonth+'-'+toDay;
    console.log("_endDate->",_endDate);

    if(searchBody.length != 0){
        var wb= excelDownHandler(searchList);
        wb.write('대곡-소사 복선전철 민간투자 시설사업 제2공구 유지관리 통합관제 보조전원장치_장애이력 조회('+searchBody["startDate"]+'_'+_endDate+').xlsx', res);
    }
    
});


function excelDownHandler(data){
    var _data = data;
    var wb = new xl.Workbook();
    var ws = wb.addWorksheet('sheet1');
    var style1 = wb.createStyle({
        alignment: {
            vertical: ['center']
        },
        font: {
            size: 10,
            bold: false
        },
        border: {
            left: {
                style: 'thin',
                color: '#000000'
            },
            right: {
                style: 'thin',
                color: '#000000'
            },
            top: {
                style: 'thin',
                color: '#000000'
            },
            bottom: {
                style: 'thin',
                color: '#000000'
            }
        }
    });


    ws.column(1).setWidth(15);
    ws.column(2).setWidth(20);
    ws.column(3).setWidth(20);
    ws.column(4).setWidth(20);
    ws.column(5).setWidth(20);
    ws.column(6).setWidth(20);
    ws.column(7).setWidth(20);
    ws.column(8).setWidth(20);
    ws.column(9).setWidth(20);

    ws.cell(1, 2, 1, 4, true).string('보조 전원장치').style(style1);
    ws.cell(1, 5, 1, 6, true).string('전원 상태').style(style1);
    ws.cell(1, 7, 1, 9, true).string('네트워크').style(style1);


    ws.cell(2, 1).string('설치위치(상세설명)').style(style1);
    ws.cell(2, 2).string('보조전원 사용').style(style1);
    ws.cell(2, 3).string('사용시간').style(style1);
    ws.cell(2, 4).string('배터리방전').style(style1);
    ws.cell(2, 5).string('복구').style(style1);
    ws.cell(2, 6).string('장애누적시간').style(style1);
    ws.cell(2, 7).string('장애발생').style(style1);
    ws.cell(2, 8).string('복구').style(style1);
    ws.cell(2, 9).string('장애누적시간').style(style1);


    for (let i = 0; i < data.length; i++) {
        var index = i+3;
        var errorType = data[i]['error_type'];
        for (let j = 1; j < 10; j++) {      
          if(j == 1){
        
            ws.cell(index, j).string( data[i]['location']).style(style1);
          }
          else if(j == 2){
            var blackoutTime =  data[i]['blackout_time'] ? data[i]['blackout_time']:"";
             if(blackoutTime) {
                blackoutTime =
                blackoutTime = blackoutTime.substr(0,blackoutTime.indexOf(':',14));
                blackoutTime = blackoutTime.replace('T', ' | ');
            }
            ws.cell(index, j).string(blackoutTime).style(style1);
          }
          else if(j == 3){
            //사용시간
            // 정전
            var _batteryUsedTime="";
            var blackoutTime =  data[i]['blackout_time'] ? data[i]['blackout_time']:"";
            var dischargeTime = data[i]['discharge_time'] ? data[i]['discharge_time'] : "";
            if( blackoutTime || dischargeTime){
                var fromDate = new Date(blackoutTime);
                if( errorType === 1 ){
                    var restoreTime = data[i]['restore_time']; 
                    var toDate = restoreTime ? new Date(restoreTime) : new Date();
                }
                else if( errorType === 2 ){
                    var toDate = new Date(dischargeTime);
                }
                periodTime = toDate.getTime()-fromDate.getTime();
                pDay = periodTime / (60*60*24*1000); 
                strDay = Math.floor(pDay); // 일
                pHour = (periodTime-(strDay * (60*60*24*1000))) / (60*60*1000);
                strHour = Math.floor(pHour);
                strMinute = Math.floor((periodTime - (strDay * (60*60*24*1000)) - (strHour * (60*60*1000))) / (60*1000));
                _batteryUsedTime = strDay + " 일 " + strHour + " 시간 " + strMinute +'분';
            }
            ws.cell(index, j).string(_batteryUsedTime).style(style1);


          }
          else if(j == 4){
            var dischargeTime = data[i]['discharge_time'] ? data[i]['discharge_time'] : "";
            if(dischargeTime) {
                dischargeTime = dischargeTime.substr(0,dischargeTime.indexOf(':',14));
                dischargeTime = dischargeTime.replace('T', ' | ');
            }
            ws.cell(index, j).string(dischargeTime).style(style1);
          }
          else if(j == 5){
             // 장애 복구 시간
             var restoreTime = data[i]['restore_time'] ? data[i]['restore_time'] : "";
             if(restoreTime){   
                restoreTime = restoreTime.substr(0,restoreTime.indexOf(':',14));
                restoreTime = restoreTime.replace('T', ' | ');
             }

             ws.cell(index, j).string(restoreTime).style(style1);

          }
          else if(j == 6){
             // 장애 누적 시간
             var ups_delay_time ="";
             if(errorType === 2){
                  var dischargeTime = data[i]['discharge_time'];
                  var restroeTime = data[i]['restore_time'];

                  var fromDate = new Date(dischargeTime);
                  var toDate = restroeTime ? new Date(restroeTime) : new Date();
                  periodTime = toDate.getTime()-fromDate.getTime();
                  pDay = periodTime / (60*60*24*1000); 
                  strDay = Math.floor(pDay); // 일
                  pHour = (periodTime-(strDay * (60*60*24*1000))) / (60*60*1000);
                  strHour = Math.floor(pHour);
                  strMinute = Math.floor((periodTime - (strDay * (60*60*24*1000)) - (strHour * (60*60*1000))) / (60*1000));
                  ups_delay_time = strDay + " 일 " + strHour + " 시간 " + strMinute +'분';
             }
             ws.cell(index, j).string(ups_delay_time).style(style1);


          }
          else if(j == 7){
            var errorTime = data[i]['error_time'] ? data[i]['error_time'] : "";
            if(errorTime) {
                errorTime = errorTime.substr(0,errorTime.indexOf(':',14));
                errorTime = errorTime.replace('T', ' | ');
            }
            ws.cell(index, j).string(errorTime).style(style1);
          }
          else if(j == 8){
             //장애 복구 시간
             var networkRestore_time = data[i]['restore_time'] ? data[i]['restore_time'] : "";
             if(networkRestore_time){   
                networkRestore_time = networkRestore_time.substr(0,networkRestore_time.indexOf(':',14));
                networkRestore_time = networkRestore_time.replace('T', ' | ');
             }
             ws.cell(index, j).string(networkRestore_time).style(style1);

          }
          else if(j == 9){
             //장애 누적 시간
             var network_delay_time ="";
             if(errorType === 2 || errorType === 3){
                  var errorTime = data[i]['error_time'];
                  var restroeTime = data[i]['restore_time'];

                  var fromDate = new Date(errorTime);
                  var toDate = restroeTime ? new Date(restroeTime) : new Date();
                  periodTime = toDate.getTime()-fromDate.getTime();
                  pDay = periodTime / (60*60*24*1000); 
                  strDay = Math.floor(pDay); // 일
                  pHour = (periodTime-(strDay * (60*60*24*1000))) / (60*60*1000);
                  strHour = Math.floor(pHour);
                  strMinute = Math.floor((periodTime - (strDay * (60*60*24*1000)) - (strHour * (60*60*1000))) / (60*1000));
                  network_delay_time = strDay + " 일 " + strHour + " 시간 " + strMinute +'분';
             }
             ws.cell(index, j).string(network_delay_time).style(style1);
          }
         
        }
    }

     return wb;
 }


module.exports = router;
