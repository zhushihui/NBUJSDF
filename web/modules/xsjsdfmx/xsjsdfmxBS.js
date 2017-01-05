define(function(require, exports, module) {
	var utils = require('utils');
	var FIRSTONE="一等奖";//第一级奖项
	var FIRSTTWO="金奖";
	var FIRSTTHREE="特等奖";
	var SECONDONE="二等奖";//第二级奖项
	var SECONDTWO="银奖";
	var THIRDONE="三等奖";//第三级奖项
	var THIRDTWO="铜奖";
	var THIRDTHREE="荣誉奖";
	var THIRDFOUR="Honorable";
	var LEVEL = "国家";  //竞赛级别
	var TYPE = "A";  //竞赛类别
	var ISHEAD = "Y";//是否领队
	var bs = {
		api: {
			pageModel: 'modules/xsjsdfmx.do',
			resultProfile: './mock/resultProfile.json'
		},
		getDemoMainModel: function() {
			var def = $.Deferred();
			utils.doAjax(bs.api.resultProfile, null, 'get').done(function(data) {
				data.length = data.list.length;
				def.resolve(data);
			}).fail(function(res) {
				def.reject(res);
			});
			return def.promise();
		},
		save: function(formData){
			//TODO 将formData提交到后台动作上
			return BH_UTILS.doAjax('../modules/xsjsdfmx/NBU_JS_COMPETITION_WIN_INFO_SAVE.do', formData);
		},
		del: function(params){
			//TODO 添加删除动作
			return BH_UTILS.doAjax('../modules/xsjsdfmx/NBU_JS_COMPETITION_WIN_INFO_DELETE.do', {
				NBU_JS_COMPETITION_WIN_INFO_DELETE:JSON.stringify(params)
			});
		},
		exportData: function(obj){
			var params = {
					root: contextPath,
					app : "nbujsdf",
					module : "modules",
					page : 'xsjsdfmx',
					action : 'jsdfmx'
			};
			//选择字段导出
			$('#emapdatatable').emapdatatable('selectColumnsExport', params);	
		},
		//获奖得分计算,单个数据集合和团队人数为参数
        popupGetScore : function(oneVO,number){
        	if(oneVO.JSJX == FIRSTONE || oneVO.JSJX ==FIRSTTWO || oneVO.JSJX ==FIRSTTHREE){
     			if(oneVO.JSJB == LEVEL){
     				if(oneVO.ISLEADER == ISHEAD){
     					if(oneVO.JSLB == TYPE){
     						oneVO.SCORE=3;
     					}else{
     						oneVO.SCORE=1.2;
     					}
     				}else{
     					if(oneVO.JSLB == TYPE){
     						oneVO.SCORE=2/(number-1);
     					}else{
     						oneVO.SCORE=0.8/(number-1);
     					}
     				}
     			}else{
     				if(oneVO.ISLEADER == ISHEAD){
     					if(oneVO.JSLB == TYPE){
     						oneVO.SCORE=1.8;
     					}else{
     						oneVO.SCORE=0.6;
     					}
     				}else{
     					if(oneVO.JSLB == TYPE){
     						oneVO.SCORE=1.2/(number-1);
     					}else{
     						oneVO.SCORE=0.4/(number-1);
     					}
     				}
     			}
     		}else if(oneVO.JSJX ==SECONDONE || oneVO.JSJX ==SECONDTWO){
     			if(oneVO.JSJB == LEVEL){
     				if(oneVO.ISLEADER == ISHEAD){
     					if(oneVO.JSLB == TYPE){
     						oneVO.SCORE=1.8;
     					}else{
     						oneVO.SCORE=0.72;
     					}
     				}else{
     					if(oneVO.JSLB == TYPE){
     						oneVO.SCORE=1.2/(number-1);
     					}else{
     						oneVO.SCORE=0.48/(number-1);
     					}
     				}
     			}else{
     				if(oneVO.ISLEADER == ISHEAD){
     					if(oneVO.JSLB == TYPE){
     						oneVO.SCORE=1.08;
     					}else{
     						oneVO.SCORE=0.36;
     					}
     				}else{
     					if(oneVO.JSLB == TYPE){
     						oneVO.SCORE=0.72/(number-1);
     					}else{
     						oneVO.SCORE=0.24/(number-1);
     					}
     				}
     			}
     		}else if(oneVO.JSJX ==THIRDONE || oneVO.JSJX ==THIRDTWO || oneVO.JSJX ==THIRDTHREE || (oneVO.JSJX.indexOf(THIRDFOUR)!=-1)){
     			if(oneVO.JSJB == LEVEL){
     				if(oneVO.ISLEADER == ISHEAD){
     					if(oneVO.JSLB == TYPE){
     						oneVO.SCORE=1.2;
     					}else{
     						oneVO.SCORE=0.48;
     					}
     				}else{
     					if(oneVO.JSLB == TYPE){
     						oneVO.SCORE=0.8/(number-1);
     					}else{
     						oneVO.SCORE=0.32/(number-1);
     					}
     				}
     			}else{
     				if(oneVO.ISLEADER == ISHEAD){
     					if(oneVO.JSLB == TYPE){
     						oneVO.SCORE=0.72;
     					}else{
     						oneVO.SCORE=0.24;
     					}
     				}else{
     					if(oneVO.JSLB == TYPE){
     						oneVO.SCORE=0.48/(number-1);
     					}else{
     						oneVO.SCORE=0.16/(number-1);
     					}
     				}
     			}
     		}
        	return oneVO;
        }
	};

	return bs;
});