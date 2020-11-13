
requirejs.config({
    paths: {
        jquery : 'plugins/jQuery/jquery.min',
        jqueryui : 'plugins/jQueryUI/juqery-ui-no-conflict',
        "jquery-ui-src" : 'plugins/jQueryUI/jquery-ui.min',
        backbone : 'plugins/backbone/backbone-min',
        underscore : "plugins/underscore/underscore-min",
        text : "plugins/require/text",
        bootstrap : 'plugins/bootstrap/js/bootstrap.min',
        circleprogress : 'plugins/circle-progress/circle-progress',
        w2ui : 'plugins/w2ui/w2ui-1.5.rc1',
        //openui : "js/lib/ui/OpenworksUI",
        moment: "plugins/moment/moment.min",
        daterangepicker: "plugins/daterangepicker/daterangepicker",
        slimScroll: "plugins/slimscroll/jquery.slimscroll.min",
        views : ".",
        cs : ".",
    },
    shim :{
        //bootstrap : {deps : ['jquery',"jquery-ui-src","css!plugins/bootstrap/css/bootstrap.min"]},
        w2ui : {
            deps : [
                'css!plugins/w2ui/w2ui-1.5.rc1.min',
                "css!plugins/fontawesome5/css/fontawesome.min",
                "css!plugins/fontawesome5/css/all"
            ]    
        },
        // openui : {
        // 	deps : [
        // 		'jquery',
        // 		'css!plugins/jQueryUI/jquery-ui.min',
        // 		'css!js/lib/ui/OpenworksUI',
        // 		'w2ui',
        // 		'dahua'
        // 	]
        // },
        daterangepicker:{
        	deps: [
        		"css!plugins/daterangepicker/daterangepicker"
        	]
        },
        
    },
    map: {
        '*': {
            'css': 'plugins/require/css.min',
        },
    	
    }
});
