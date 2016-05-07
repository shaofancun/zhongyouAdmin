"use srtict";
$(function(){
	//如果insIds有值，就进行自动勾选
	if(insIds.val()){
		var insId=insIds.val().split(",");
		insId.forEach(function(v,i){
			$('input[value='+v+']').iCheck('check'); 
		})
	}
})
var pordId=$("#prodId").val(),
	insIds=$("#insIds"),
	insModal=$("#insModal"),		//保险选择弹框
	insBox=$("#insBox");		//已经保存的保险
var insArr= new Array();		//保存已经勾选的数组
/*
	勾选icheck添加到insIds
*/
$('.icheck').on('ifChecked', function(){
  var v=$(this).val();
  insArr.push(v);
  insIds.val(insArr);
});
/*
	去掉icheck添加到insIds
*/
$('.icheck').on('ifUnchecked', function(event){
  var v=$(this).val();
  insArr.remove(v);
  insIds.val(insArr);
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
var ins=new Object();
/*
	添加已选择的保险
*/
ins.add=function(){
	if(!insIds.val()){
		alert("请勾选需要的保险");
		return false;
	}
	$.ajax({
		url:"../success.php",
		type:"post",
		dataType:"json",
		data:{
			pordId:pordId,
			insIds:insIds.val()
		}
	}).done(function(data){
		if(data.success){
			insModal.modal("hide").on('hidden.bs.modal', function (e) {
				var str='';
				data.ins.each(function(i,v){
					str+='<div class="col-sm-12"><div class="alert alert-success">';
					str+='<span>'+v.title+' 单价￥'+v.price+'/人 '+v.name+'</span>';
					str+='<a href="javascript:;" style="margin-top:-5px" class="pull-right btn btn-sm red" onclick="ins.del(this,'+v.id+')"><i class="fa fa-times"></i> 删除</a>';
					str+='</div></div>';
				})
				insBox.html($(str).hide().fadeIn(600));
			})
		}
	})
}
/*
	删除保险
*/
ins.del=function(e,id){
	$.ajax({
		url:"../success.php",
		type:"post",
		dataType:"json",
		data:{
			pordId:pordId,
			insId:id
		}
	}).done(function(data){
		if(data.success){
			insArr.remove(id);
  			insIds.val(insArr);
  			$('input[value='+id+']').iCheck('uncheck'); 
			var dome=$(e).parent().parent();
			dome.animate({opacity:0},500,function(){
				dome.remove();
			});
		}
	})
}