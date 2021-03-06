define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./xsjsdfmxBS');

    var viewConfig = {
        initialize: function() {
        	var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'jsdfmx', 'form');
        	 $("#emapForm").emapForm({
                 data: mode,
                 model: 'h'
             });
             
             this.eventMap = {
                 '[data-action=save]': this.save
             };
         },
         save: function(){
         	if( $("#emapForm").emapValidate('validate') ){
         		var formData = $("#emapForm").emapForm("getValue");
         		//数据整合成list集合
         		var resultListData = this.changeData(formData);
         		//在list集合内计算获奖得分
         		resultListData = this.getScore(resultListData);
         		BH_UTILS.bhDialogSuccess({
                     title:'操作提示',
                     content:'是否进行保存操作',
                     buttons:[{text:'确认',className:'bh-btn-success',callback:function(){
                    	//参数格式转换
                    	 var resultParam = JSON.stringify(resultListData); 
                    	 //参数存入参数组中
                    	 var param = {'modelList':resultParam};
                    	 //使用多条数据新增动作流
                    	 BH_UTILS.doAjax('../modules/xsjsdfmx/jsdfcjdzl.do', param).done(function(data){
                    		 if(data.code == "0"){
                    			 BH_UTILS.bhDialogSuccess({
                    				 title:'操作提示',
                    				 content:'保存成功',
                    				 callback:function(){
                    				 }
                    			 });
                    			 $('#emapdatatable').emapdatatable('reload');
                    			 $.bhPaperPileDialog.hide();//关闭当前弹窗
                    		 }else{
                    			 BH_UTILS.bhDialogDanger({
                    				 title:'操作提示',
                    				 content:'保存失败',
                    				 buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]
                    			 });
                    		 }
                    	 });
                     }},{text:'取消',className:'bh-btn-warning',callback:function(){                        	
                     }}]
                 });
         	}
         },
       //数据整合成list集合
         changeData :function (mapData){
         	var sidlist= mapData.STULIST.split(",");//学生SID,专业，学院
         	var xsmclist = mapData.STULIST_DISPLAY.split(",");//学生名称，学号
         	//团队人员
         	var stuListString="";
         	for (var i=0;i<xsmclist.length;i++){
         		var xsmcArray = xsmclist[i].split("-");
         		stuListString=stuListString+xsmcArray[0]+"、";
         	}
         	stuListString = stuListString.substr(0, stuListString.length-1); 
         	var listData =[];
         	for (var i=0;i<sidlist.length;i++){
         		var sidArray = sidlist[i].split("-");
         		var xsmcArray = xsmclist[i].split("-");
         		var oneVO = {'JSID':mapData.JSMC,
         				'JSMC':mapData.JSMC_DISPLAY,
         				'JSLB':mapData.JSLB_DISPLAY, 
         				'JSJB':mapData.JSJB_DISPLAY,
         				'JS_DATE':mapData.JS_DATE,
         				'JSJX':mapData.JSJX_DISPLAY,
         				'XSID':sidArray[0],
         				'XSXM':xsmcArray[0],
         				'ZYMC':sidArray[1],
         				'XYMC':sidArray[2],
         				'STULIST':stuListString,
         				'ZDLSMC':mapData.JG0101ID,
         				'SCORE':0
         				};
         		//是否团队第一人
         		if(i == 0){//是
         			oneVO['ISLEADER'] = "Y";
         		}else{//否
         			oneVO['ISLEADER'] = "N";
         		}
         		listData.push(oneVO);
         	}
         	return listData;
         },
         //在list集合内计算获奖得分
         getScore : function (listData){
         	var number =listData[0].STULIST.split("、").length;//团队人数
         	var resultData =[listData.length] ;//最终集合
         	for (var i=0;i<listData.length;i++){
         		var oneVO = listData[i];
         		oneVO = bs.popupGetScore(oneVO,number);//获奖得分公共计算方法
         		resultData[i] = oneVO;
         	}
         	return resultData;
         }

     };
     return viewConfig;
 });