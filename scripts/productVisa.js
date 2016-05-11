"use srtict";
$(function(){
	//如果visaIds有值，就进行自动勾选
	if(visaIds.val()){
		var visaId=visaIds.val().split(",");
		visaId.forEach(function(v,i){
			$('input[value='+v+']').iCheck('check'); 
		})
	}
})
var pordId=$("#prodId").val(),
	visaIds=$("#visaIds"),
	visaModal=$("#visaModal"),		//签证选择弹框
	visaBox=$("#visaBox");		//已经保存的签证
var visaArr= new Array();		//保存已经勾选的数组
/*
	勾选icheck添加到visaIds
*/
$('.icheck').on('ifChecked', function(){
  var v=$(this).val();
  visaArr.push(v);
  visaIds.val(visaArr);
});
/*
	去掉icheck添加到visaIds
*/
$('.icheck').on('ifUnchecked', function(event){
  var v=$(this).val();
  visaArr.remove(v);
  visaIds.val(visaArr);
});
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
var visa=new Object();
/*
	添加已选择的签证
*/
visa.add=function(){
	if(!visaIds.val()){
		alert("请勾选需要的签证");
		return false;
	}
	$.ajax({
		url:"../success.php",
		type:"post",
		dataType:"json",
		data:{
			pordId:pordId,
			visaIds:visaIds.val()
		}
	}).done(function(data){
		if(data.success){
			visaModal.modal("hide").on('hidden.bs.modal', function (e) {
				var str='';
				data.visa.each(function(i,v){
					str+='<div class="col-sm-12"><div class="alert alert-success">';
					str+='<span>'+v.name+'</span>';
					str+='<a href="javascript:;" style="margin-top:-5px" class="pull-right btn btn-sm red" onclick="visa.del(this,'+v.id+')"><i class="fa fa-times"></i> 删除</a>';
					str+='</div></div>';
				})
				visaBox.html($(str).hide().fadeIn(600));
			})
		}
	})
}
/*
	删除签证
*/
visa.del=function(e,id){
	$.ajax({
		url:"../success.php",
		type:"post",
		dataType:"json",
		data:{
			pordId:pordId,
			visaId:id
		}
	}).done(function(data){
		if(data.success){
			visaArr.remove(id);
  			visaIds.val(visaArr);
  			$('input[value='+id+']').iCheck('uncheck'); 
			var dome=$(e).parent().parent();
			dome.animate({opacity:0},500,function(){
				dome.remove();
			});
		}
	})
}