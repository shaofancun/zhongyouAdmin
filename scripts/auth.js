"use strict";
var userId=$("#userId").val();		//会员ID
/*
	勾选icheck
*/
$('.icheck').on('ifChecked', function(){
  	var _this=$(this),
  		id=_this.val();
  	$.post("../success.php",{userId:userId,authId:id}).done(function(data){
  		//勾选失败，去掉勾选
	  	// if(!data.success){
	  	// 	_this.iCheck('uncheck');
	  	// }
  	});
});
/*
	去掉icheck添加到conIds
*/
$('.icheck').on('ifUnchecked', function(event){
  	var _this=$(this),
  		id=_this.val();
  	$.post("../success.php",{userId:userId,authId:id}).done(function(data){
	  	//取消失败，重新勾选
	  	// if(!data.success){
	  	// 	_this.iCheck('check');
	  	// }
  	});
});